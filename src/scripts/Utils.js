/**
 * Created by matthewmicallef on 21/02/2016.
 */

var $ = jQuery;
const JSAV_COMPONENT_TEMPLATE =
    "<div id='{{ID}}'>" +
        "<h4>{{NAME}}</h4>" +
        "<div class='jsavcontrols'></div>" +
        "<span class='jsavcounter'></span>" +
        "<p class='jsavoutput jsavline'></p>" +
        "<div class='jsavcanvas'></div>" +
    "</div>";

var currentPairElement;

var Utils = {
    MapReduce: {
        getInputsByChunk: function(input, mapperCount) {
            const SPACE = " ";

            if(input && mapperCount > 0) {
                var chunksArray = [];
                var counter = 0;

                //Assuming only spaces between words
                var inputSplit = input.split(" ");
                var mapperSize = Math.floor(inputSplit.length / mapperCount);

                for(var i = 0; i < inputSplit.length; i++) {
                    if(i !== 0 && ((i % mapperSize) === 0)) {
                        counter++;
                    }

                    if(counter === mapperCount) {
                        counter -= 1;
                    }

                    if (chunksArray[counter] === undefined) {
                        chunksArray[counter] = inputSplit[i];
                    } else {
                        chunksArray[counter] += SPACE + inputSplit[i];
                    }
                }

                return chunksArray;
            }

            return null;
        },
        hashCode: function(value) {
            var hash = 0;

            if (!value || value.length == 0)
                return hash;

            for (var i = 0; i < value.length; i++) {
                var char = value.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32bit integer
            }

            return Math.abs(hash);
        },
        sortByKey: function(array, key) {
            if(array && key) {
                return array.sort(function(a, b) {
                    //Sorts array by key
                    var x = a[key];
                    var y = b[key];

                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            }

            return null;
        },
        lookupArrayByKey: function(array, key) {
            if(array && key) {
                for(var i = 0, len = array.length; i < len; i++) {
                    if(array[i].key === key) {
                        return i; //Returns position of found key.
                    }
                }
            }

            return -1; //Key not found
        },
        trimAllEntries: function(arrayToTrim) {
            if(arrayToTrim) {
                for(var i = 0; i < arrayToTrim.length; i++)
                {
                    //Removing all characters.
                    arrayToTrim[i] = arrayToTrim[i].replace(/[^a-zA-z ]/g, "").replace("  ", " ");
                    //Trimming.
                    arrayToTrim[i] = arrayToTrim[i].trim();
                }

                return arrayToTrim;
            }

            return null;
        },
        getPairValuesTotal: function(values) {
            if(typeof(values) === "number") {
                return values;
            } else if(typeof(values) === "string") {
                var splitValues = values.split(",");
                var valueCount = 0;
                for(var i = 0; i < splitValues.length; i++) {
                    valueCount += Number(splitValues[i]);
                }
                return valueCount;
            }
            
            return -1;
        },
        reset: function() {
            document.getElementById("mapperContainer").innerHTML = "";
            document.getElementById("combinerContainer").innerHTML = "";
            document.getElementById("partitionerContainer").innerHTML = "";
            document.getElementById("sasContainer").innerHTML = "";
            document.getElementById("reducerContainer").innerHTML = "";
        }
    },
    JSAV: {
        createExerciseContainer: function(title) {
            var container = document.getElementById("mapReduceExercise");

            if(container) {
                var h1 = document.createElement("h1");
                h1.innerHTML = title;
                container.appendChild(h1);

                var settingsAnchor = document.createElement("a");
                settingsAnchor.className = "jsavsettings";
                settingsAnchor.href = "#";
                settingsAnchor.innerHTML = "Settings";

                var controls = document.createElement("p");
                controls.align = "center";
                controls.className = "jsavexercisecontrols";

                controls.appendChild(settingsAnchor);
                container.appendChild(controls);

                var score = document.createElement("p");
                score.className = "jsavscore";
                container.appendChild(score);

                var output = document.createElement("p");
                output.className = "jsavoutput jsavline";
                container.appendChild(output);
            }
        },
        createHtmlElement: function(type, count) {
            var container;

            if(type === "Mapper") {
                container = document.getElementById("mapperContainer");
            } else if(type === "Reducer") {
                container = document.getElementById("reducerContainer");
            } else if (type === "ShuffleAndSort") {
                container = document.getElementById("sasContainer");
            } else if (type === "Combiner") {
                container = document.getElementById("combinerContainer");
            } else if (type === "Partitioner") {
                container = document.getElementById("partitionerContainer");
            }

            if(container) {
                var id = type + count;
                var name = type + " " + count;

                var idDiv = document.createElement("div");
                idDiv.id = id;

                var h4 = document.createElement("h4");
                h4.innerHTML = name;
                idDiv.appendChild(h4);

                var settingsAnchor = document.createElement("a");
                settingsAnchor.className = "jsavsettings";
                settingsAnchor.href = "#";
                settingsAnchor.innerHTML = "Settings";
                idDiv.appendChild(settingsAnchor);

                var jsavControlsDiv = document.createElement("div");
                jsavControlsDiv.className = "jsavcontrols";
                idDiv.appendChild(jsavControlsDiv);

                var span = document.createElement("span");
                span.className = "jsavcounter";
                idDiv.appendChild(span);

                var p = document.createElement("p");
                p.className = "jsavoutput jsavline";
                idDiv.appendChild(p);

                var jsavCanvasDiv = document.createElement("div");
                jsavCanvasDiv.className = "jsavcanvas";
                idDiv.appendChild(jsavCanvasDiv);

                container.appendChild(idDiv);
            }

            return id;
        },
        createKeyValuePair: function(av, key, values) {
            var pair = {key: key, values: values};

            return av.ds.keyValuePair(pair);
        }
    },
    Exercise: {
        pairClickHandler: function(element) {
            currentPairElement = element.target;

            var html = Utils.Exercise.getPopupHTML();

            if (element.data.type === 'key') {
                html = html.replace('{{TYPE}}', 'Key');
            } else if (element.data.type === 'values') {
                html = html.replace('{{TYPE}}', 'Values');
            } else if (element.data.type === 'id') {
                html = html.replace('{{TYPE}}', 'ID');
            }

            JSAV.utils.dialog(html, {
                width: '20%',
                dialogClass: 'exerciseDialog',
                closeText: 'Close'
            });

            document.getElementById('pairValueInput').focus();
        },
        pairHighlightClickHandler: function(element) {
            var className = element[0].className;

            if(className.indexOf('incorrect') !== -1) {
                $(element[0]).toggleClass('incorrect');
            }

            if(this.isHighlight()) {
                this.unhighlight();
            } else {
                this.highlight();
            }
        },
        pairDialogClickHandler: function() {
            var inputValue = document.getElementById('pairValueInput').value;

            if(!inputValue) {
                inputValue = '-';
            }

            if(currentPairElement.innerHTML.indexOf('ID') !== -1) {
                Utils.Exercise.changeField(currentPairElement, 'ID', inputValue);
            } else {
                Utils.Exercise.changeField(currentPairElement, 'pair', inputValue);
            }

            exercise.gradeableStep();

            //Closing popup
            document.getElementsByClassName('jsavrow')[0].click();
        },
        changeField: function(currentElement, part, newValue) {
            if(part === 'pair') {
                currentElement.innerHTML = newValue;
            } else if (part === 'ID') {
                currentElement.innerHTML = currentElement.innerHTML.replace('-', newValue);
            }

            exercise.gradeableStep();
        },
        toggleElementCorrectness: function(element, correct) {
            if(correct) {
                if(element.className.indexOf(' incorrect') > -1) {
                    $(element).toggleClass('incorrect');
                    $(element).toggleClass('correct');
                } else if(element.className.indexOf(' incorrect') === -1) {
                    if(element.className.indexOf(' correct') === -1) {
                        $(element).toggleClass('correct');
                    }
                }
            } else if(!correct) {
                if(element.className.indexOf(' correct') > -1) {
                    $(element).toggleClass('correct');
                    $(element).toggleClass('incorrect');
                } else if(element.className.indexOf(' incorrect') === -1) {
                    if(element.className.indexOf(' incorrect') === -1) {
                        $(element).toggleClass('incorrect');
                    }
                }
            }
        },
        reset: function(array) {
            for(var i = 0; i < array.length; i++) {
                $(array[i]).removeClass('incorrect');
                $(array[i]).removeClass('correct');

                if((array[i].className.indexOf('jsav-pair-key') > -1) ||
                    (array[i].className.indexOf('jsav-pair-values') > -1)) {
                    array[i].innerHTML = '-';
                }
            }
        },
        resetByClassName: function(className) {
            var elements = document.getElementsByClassName(className);
            if(elements) {
                Utils.Exercise.reset(elements);
            }
        },
        getPopupHTML: function() {
            return "<div style='text-align: center;'>" +
                "<div style='margin-top: 5px'>Insert {{TYPE}}</div>" +
                "<input id='pairValueInput' type='text' style='margin-top: 5px'>" +
                "<button onclick='Utils.Exercise.pairDialogClickHandler()'>OK</button>" +
                "</div>";
        },
        togglePointerEvents: function(pairType, pointerType) {
            var elements;

            if(pairType === 0) {
                //Pair
                elements = document.getElementsByClassName("jsav-pair");
            } else if (pairType === 1) {
                //Keys
                elements = document.getElementsByClassName("jsav-pair-key");
            } else if (pairType === 2) {
                //Values
                elements = document.getElementsByClassName("jsav-pair-values");
            } else if (pairType === 3) {
                //ID Containers
                elements = document.getElementsByClassName("idContainer");
            }

            if(elements) {
                for(var i = 0; i < elements.length; i++) {
                    elements[i].style.pointerEvents = pointerType;
                }
            }
        },
        toggleModelAnswer: function($timeout, isDisabled) {
            $timeout(function() {
                document.getElementsByName('answer')[0].disabled = isDisabled;
            }, 10);
        }
    }
};