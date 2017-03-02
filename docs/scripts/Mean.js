/**
 * Created by matthewmicallef on 17/04/2016.
 */

var animationService;
var mapJSAVPairs = [];
var combinerJSAVPairs = [];
var partitionJSAVPairs = [];
var sasJSAVPairs = [];
var reduceJSAVPairs = [];
var jsavInstances = [];

var Mean = {
    setAnimationService: function(service) {
        animationService = service;
    },
    runMeanMapReduce: function(
        mapperCount,
        reducerCount,
        mapperPerLine,
        userInput
    ) {

        Mean.reset();

        console.log("Starting Mean MapReduce");

        //Get Mapper Input by splitting number of pairs among number of mappers.
        var mapperInput = Mean.processInput(userInput, Number(mapperCount));

        //Map
        Mean.map(mapperInput, Number(mapperCount));

        //Combine
        if(animationService.isUsingCombiners()) {
            Mean.combine(mapJSAVPairs);
        }

        //Partition
        if(animationService.isUsingCombiners()) {
            Mean.partition(combinerJSAVPairs, Number(mapperCount), Number(reducerCount));
        } else {
            Mean.partition(mapJSAVPairs, Number(mapperCount), Number(reducerCount));
        }

        //Shuffle and Sort
        Mean.shuffleAndSort(partitionJSAVPairs);

        //Reduce
        Mean.reduce(sasJSAVPairs, Number(reducerCount));

        //Update animationService with all JSAV instances.
        if(jsavInstances) {
            animationService.setJSAVInstances(jsavInstances);
        }
    },
    processInput: function(input, mapperCount) {
        if(input && mapperCount >= -1) {
            var mapperShare = Math.floor(input.length / mapperCount),
            mapperId = 0,
            mapperInput = input;

            for (var i = 0; i < input.length; i++) {
                if((i % mapperShare) === 0) {
                    mapperId++;
                }

                if(mapperId > mapperCount) {
                    mapperId = mapperCount;
                }

                mapperInput[i].mapperId = mapperId;
            }

            return mapperInput;   
        }
        
        return null;
    },
    map: function(input, mapperCount) {
        var arrCounter = 0,
            mapperId,
            av,
            arr,
            arrCounter,
            jsavArr,
            code;

        for(var i = 0; i < mapperCount; i++) {
            mapperId = Utils.JSAV.createHtmlElement("Mapper", i + 1);
            av = new JSAV(mapperId);
            av.label("Mapper Input:");
            arr = [];
            arrCounter = 0;
            for (var j = 0; j < input.length; j++) {
                if(input[j].mapperId === i + 1) {
                    arr[arrCounter] = "K: " + input[j].key + " V: " + input[j].values;
                    arrCounter++;
                }
            }
            jsavArr = av.ds.array(arr);

            //Step 1
            av.label("This mapper runs on a single node.");
            jsavArr.layout();
            av.displayInit();
            av.step();

            //Step 2
            av.label("For every input, a new key-value pair is created.");
            code = av.code([
                "Emit(term t, pair(r, 1)"
            ]);

            av.label("Mapper Output:");
            arrCounter = 0;
            for(var j = 0; j < input.length; j++) {
                if(input[j].mapperId === i + 1) {
                    if(arrCounter > 0) {
                        jsavArr.unhighlight(arrCounter - 1);
                    }

                    jsavArr.highlight(arrCounter);
                    arrCounter++;
                    var key = input[j].key;
                    var values = input[j].values;
                    var pair = Utils.JSAV.createKeyValuePair(av, key, "pair(" + values + ", 1)");
                    pair.mapperId = input[j].mapperId;
                    pair.addIDContainer("Mapper", pair.mapperId);
                    mapJSAVPairs.push(pair);
                    pair.layout();

                    //Code highlighting
                    code.setCurrentLine(1);
                    av.step();
                }
            }

            jsavInstances.push(av);
            av.recorded();
        }
    },
    combine: function(input) {
        var mapperCount = jsavInstances.length,
            combinerId,
            av,
            processedKeys,
            pairs,
            filteredInput,
            code;

        for(var i = 0; i < mapperCount; i++) {
            combinerId = Utils.JSAV.createHtmlElement("Combiner", i + 1);
            av = new JSAV(combinerId);
            processedKeys = [];
            pairs = [];

            //Step 1
            filteredInput = input.filter(function(mapJSAVPairs) {
                return mapJSAVPairs.mapperId == (i + 1);
            });

            code = av.code ([
                "for all pair (s,c) in pairs [(s1,c1), (s2,c2), ...] do",
                " sum = sum + s",
                " count = count + c",
                "for all pair (s,c) in combined pairs [(s1,c1), ...] do",
                " Emit (string t, pair (s, c))"
            ]);

            //Step 2
            av.label("Combiner first aggregates sum and count of values of pairs with the same key," +
                "and places them in a new pair.");

            for (var j = 0; j < filteredInput.length; j++) {
                code.setCurrentLine(1);
                av.step();

                umsg = "Key = " + filteredInput[j]._pairData.key +
                       "<br> Sum = ";
                var tempUmsg = "<br> Count = ";
                var tempSum;
                var tempCount;

                if((processedKeys.length > 0) && (processedKeys.indexOf(filteredInput[j]._pairData.key) > -1)) {
                    for(var k = 0; k < pairs.length; k++) {
                        if(pairs[k].key === filteredInput[j]._pairData.key) {
                            var pairSum = Number(Mean.getSumFromPair(pairs[k].values));
                            var pairCount = Number(Mean.getCountFromPair(pairs[k].values));

                            //Updating umsg and currently highlighted code.
                            tempSum += " + " + String(pairSum);
                            av.umsg(umsg + tempSum);
                            code.setCurrentLine(2);
                            av.step();

                            tempCount += " + " + String(pairCount);
                            av.umsg(umsg + tempSum + tempUmsg + tempCount);
                            code.setCurrentLine(3);
                            av.step();

                            pairSum += Number(Mean.getSumFromPair(filteredInput[j]._pairData.values));
                            pairCount += Number(Mean.getCountFromPair(filteredInput[j]._pairData.values));
                            pairs[k].values = "pair(" + pairSum + ", " + pairCount + ")";
                        }
                    }
                } else {
                    processedKeys.push(filteredInput[j]._pairData.key);
                    pairs.push({
                        key: filteredInput[j]._pairData.key,
                        values: filteredInput[j]._pairData.values,
                        mapperId: (i + 1)
                    });

                    //Updating umsg and currently highlighted code.
                    tempSum = Mean.getSumFromPair(filteredInput[j]._pairData.values);
                    av.umsg(umsg + tempSum);
                    code.setCurrentLine(2);
                    av.step();

                    tempCount = Mean.getCountFromPair(filteredInput[j]._pairData.values);
                    av.umsg(umsg + tempSum + tempUmsg + tempCount);
                    code.setCurrentLine(3);
                    av.step();
                }
            }

            //Step 3
            for (var j = 0; j < pairs.length; j++) {
                code.setCurrentLine(4);
                av.step();

                var pair = Utils.JSAV.createKeyValuePair(av, pairs[j].key, pairs[j].values);
                pair.mapperId = pairs[j].mapperId;
                pair.combinerId = (i + 1);
                pair.addIDContainer("Mapper", pair.mapperId);
                combinerJSAVPairs.push(pair);
                pair.layout();

                //Updating highlighted code.
                code.setCurrentLine(5);
                av.step();
            }

            jsavInstances.push(av);
            av.recorded();
        }
    },
    partition: function(input, numberOfMappers, numberOfReducers) {
        /*
         The number of partitions (not partitioners) is equal to the number of reducers.
         Hash value of the key, module the number of reducers
         */

        partitionJSAVPairs = input;
        var key = "",
            hashedString = "",
            reducerId = -1,
            partitionerId,
            av;

        for(var i = 0; i < partitionJSAVPairs.length; i++) {
            key = partitionJSAVPairs[i]._pairData.key;
            hashedString = Utils.MapReduce.hashCode(key);
            reducerId = Math.abs(hashedString % numberOfReducers) + 1;
            partitionJSAVPairs[i].reducerId = reducerId;
        }

        for(var i = 0; i < numberOfMappers; i++) {
            partitionerId = Utils.JSAV.createHtmlElement("Partitioner", i + 1);
            av = new JSAV(partitionerId);

            //Step 1
            if(!animationService.isUsingCombiners()) {
                av.label("Every partitioner receives data from every mapper, since combiners are not being used. " +
                    "This partitioner receives data from Mapper " + (i + 1));
            } else {
                av.label("Every partitioner receives data from every combiner." +
                    "This partitioner receives data from Combiner " + (i + 1));
            }

            av.step();

            av.label("Every key is hashed and the reducer identity of each pair obtained. " +
                "The hash function ensures that pairs with the same key are assigned the same reducer.");

            for(var j = 0; j < partitionJSAVPairs.length; j++) {
                if(partitionJSAVPairs[j].mapperId === (i + 1)) {
                    var pair = Utils.JSAV.createKeyValuePair(av, partitionJSAVPairs[j]._pairData.key, partitionJSAVPairs[j]._pairData.values);
                    pair.addIDContainer("Reducer", partitionJSAVPairs[j].reducerId);
                    pair.addIDContainer("Mapper", partitionJSAVPairs[j].mapperId);
                    pair.layout();
                    av.step();
                }
            }

            if(animationService.isShowingPartitioners()) {
                jsavInstances.push(av);
                av.recorded();
            }
        }
    },
    shuffleAndSort: function(input) {
        var sasArray = [],
            key,
            values,
            keyPos;

        for(var i = 0; i < input.length; i++) {
            key = input[i]._pairData.key;
            values = input[i]._pairData.values;
            keyPos = Utils.MapReduce.lookupArrayByKey(sasArray, key);

            if(keyPos > -1) {
                sasArray[keyPos].values += ", " + values;
            } else {
                sasArray.push({
                    key: key,
                    values: values,
                    mapperId: input[i].mapperId,
                    reducerId: input[i].reducerId
                });
            }
        }

        sasArray = Utils.MapReduce.sortByKey(sasArray, "key");

        var sasId = Utils.JSAV.createHtmlElement("ShuffleAndSort", "");
        var av = new JSAV(sasId);

        //Step 1
        av.label("The shuffle and sort gathers all partitioner outputs.");
        av.step();

        //Step 2
        av.label("The values from all pairs across all nodes are all sorted and combined together in one pair, " +
            "before they are sent to the reducers.");

        for(var i = 0; i < sasArray.length; i++) {
            var pair = Utils.JSAV.createKeyValuePair(av, sasArray[i].key, sasArray[i].values);
            pair.mapperId = sasArray[i].mapperId;
            pair.reducerId = sasArray[i].reducerId;
            pair.addIDContainer("Reducer", sasArray[i].reducerId);
            sasJSAVPairs.push(pair);
            pair.layout();
            av.step();
        }

        jsavInstances.push(av);
        av.recorded();
    },
    reduce: function(input, numberOfReducers) {
        var pairCount = input.length,
            reducerId,
            av,
            result,
            valuesSum,
            valuesCount,
            valuesAverage,
            pair,
            code,
            umsg;

        for(var i = 0; i < numberOfReducers; i++) {
            reducerId = Utils.JSAV.createHtmlElement("Reducer", (i + 1));
            av = new JSAV(reducerId);
            code = av.code ([
                "for all pair (s,c) in pairs [(s1,c1), (s2,c2), ...] do",
                " sum = sum + s",
                " count = count + c",
                "avg = sum / count",
                " Emit (string t, pair (s, c))"
            ]);

            //Step 1
            av.label("Reducer receives its assigned data and divides the sums by the counts of each pair," +
                " to obtain a mean for that particular key.");
            av.step();

            for(j = 0; j < pairCount; j++) {
                if(input[j].reducerId === (i + 1)) {
                    //Code highlighting
                    umsg = "Key = " + input[j]._pairData.key;
                    av.umsg(umsg);
                    code.setCurrentLine(1);
                    av.step();

                    result = Mean.getPairValuesAverage(input[j]._pairData.values);
                    valuesSum = result[0];
                    valuesCount = result[1];
                    valuesAverage = result[2];

                    //Code highlighting
                    umsg += "<br> Sum = " + valuesSum;
                    av.umsg(umsg);
                    code.setCurrentLine(2);
                    av.step();

                    umsg += " Count = " + valuesCount;
                    av.umsg(umsg);
                    code.setCurrentLine(3);
                    av.step();

                    umsg += "<br> Average = " + valuesSum + " / " + valuesCount;
                    av.umsg(umsg);
                    code.setCurrentLine(4);
                    av.step();

                    pair = Utils.JSAV.createKeyValuePair(
                        av,
                        input[j]._pairData.key,
                        valuesSum + "/" + valuesCount + " => " + valuesAverage
                    );
                    pair.addIDContainer("Reducer", input[j].reducerId);
                    reduceJSAVPairs.push(pair);
                    pair.layout();

                    //Updating currently highlighted code
                    code.setCurrentLine(5);
                    av.step();
                }
            }

            jsavInstances.push(av);
            av.recorded();
        }
    },
    getSumFromPair: function(pair) {
        //Input: pair(2, 1)
        var content = pair.split('(');
        content = content[1].split(',');
        return content[0].trim();
    },
    getCountFromPair: function(pair) {
        //Input: pair(2, 1)
        var content = pair.split('(');
        content = content[1].split(',');
        return content[1].trim().substr(0, 1);
    },
    getPairValuesAverage: function(values) {
        if(values) {
            var valuesSplit = values.split(', p');
            var sum = 0;
            var count = 0;

            for(var i = 0; i < valuesSplit.length; i++) {
                sum += Number(Mean.getSumFromPair(valuesSplit[i]));
                count += Number(Mean.getCountFromPair(valuesSplit[i]));
            }

            var average = (sum / count).toFixed(2);
            return [sum, count, average];
        }
        
        return null;
    },
    reset: function() {
        mapJSAVPairs = [];
        combinerJSAVPairs = [];
        partitionJSAVPairs = [];
        sasJSAVPairs = [];
        reduceJSAVPairs = [];
        jsavInstances = [];
    }
};