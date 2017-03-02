/**
 * Created by matthewmicallef on 02/06/2016.
 */

describe('Utils', function() {
    var result;

    describe('MapReduce', function() {
        describe('getInputsByChunk', function() {
            describe('if input is empty', function() {
               it('should return null', function() {
                   var result = Utils.MapReduce.getInputsByChunk('', 1);
                   expect(result).toBeNull();
               });
            });

            describe('if mapperCount is 0', function() {
                it('should return null', function() {
                    var result = Utils.MapReduce.getInputsByChunk('hello', 0);
                    expect(result).toBeNull();
                });
            });

            describe('if inputs are acceptable', function() {
                it('should return input in chunks depending on mapperCount size', function() {
                    var result = Utils.MapReduce.getInputsByChunk('hello world how are you', 2);
                    expect(result).toEqual(['hello world', 'how are you']);
                });
            });
        });

        describe('hashCode', function() {
            describe('if value is null', function() {
                it('should return null', function() {
                    result = Utils.MapReduce.hashCode(null);
                    expect(result).toEqual(0);
                });
            });

            describe('if value is not null and of length 0', function() {
                it('should return 0', function() {
                    result = Utils.MapReduce.hashCode('');
                    expect(result).toEqual(0);
                });
            });

            describe('if value is not null', function() {
                it('should return a hash code', function() {
                    result = Utils.MapReduce.hashCode('test');
                    expect(result).not.toBeNull();
                });
            });
        });

        describe('sortByKey', function() {
            describe('if array is null', function() {
                it('should return null', function() {
                    result = Utils.MapReduce.sortByKey(null, 'test');
                    expect(result).toBeNull();
                });
            });

            describe('if key is null', function() {
                it('should return null', function() {
                    result = Utils.MapReduce.sortByKey('test', null);
                    expect(result).toBeNull();
                });
            });

            describe('if inputs are acceptable', function() {
                it('should return an array sorted by the given key', function() {
                    var array = [
                        {
                            id: 0,
                            value: 'Hey'
                        },
                        {
                            id: 2,
                            value: 'world'
                        },
                        {
                            id: 2,
                            value: '!'
                        },
                        {
                            id: 1,
                            value: 'hello'
                        }
                    ];
                    var result = Utils.MapReduce.sortByKey(array, 'id');
                    expect(result[0].id).toEqual(0);
                    expect(result[1].id).toEqual(1);
                    expect(result[2].id).toEqual(2);
                    expect(result[3].id).toEqual(2);
                });
            });
        });

        describe('lookupArrayByKey', function() {
            describe('if array is null', function() {
               it('should return -1', function() {
                   result = Utils.MapReduce.lookupArrayByKey(null, -1);
                   expect(result).toEqual(-1);
               });
            });

            describe('if key is null', function() {
                it('should return -1', function() {
                    result = Utils.MapReduce.lookupArrayByKey(-1, null);
                    expect(result).toEqual(-1);
                });
            });

            describe('if inputs are acceptable', function() {
                describe('and key is in array', function() {
                   it('should return the position of key in array', function() {
                       var array = [ { key: 1 }, { key: 2 }];
                       result = Utils.MapReduce.lookupArrayByKey(array, 2);
                       expect(result).toEqual(1);
                   });
                });
            });
        });

        describe('trimAllEntries', function() {
            describe('input is null', function() {
                it('should return null', function() {
                    result = Utils.MapReduce.trimAllEntries(null);
                    expect(result).toBeNull();
                });
            });

            describe('if input is acceptable', function() {
                it('should trim all entries in array', function() {
                    var array = ['test ', 'world'];
                    result = Utils.MapReduce.trimAllEntries(array);
                    expect(result).toEqual(['test', 'world']);
                });
            });
        });

        describe('getPairValuesTotal', function() {
            describe('if input is null', function() {
                it('should return -1', function() {
                    result = Utils.MapReduce.getPairValuesTotal(null);
                    expect(result).toEqual(-1);
                });
            });
            
            describe('if input is a number', function() {
                it('should return the same value', function() {
                    result = Utils.MapReduce.getPairValuesTotal(2);
                    expect(result).toEqual(2);
                });
            });
            
            describe('if input is a string', function() {
                it('should return the total of the comma separated values', function() {
                    result = Utils.MapReduce.getPairValuesTotal("2, 2, 2");
                    expect(result).toEqual(6);
                });
            });
        });

        describe('reset', function() {
            var element;
            
            beforeEach(function() {
               element = document.createElement('div');
               element.innerHTML = 'test';
               
               spyOn(document, 'getElementById').and.returnValue(element);
            });
            
            it('should reset the element innerHTML to an empty string', function() {
               Utils.MapReduce.reset();
               expect(document.getElementById).toHaveBeenCalled();
               expect(element.innerHTML).toEqual(''); 
            });
        });
    });
    
    describe('JSAV', function() {
        describe('createExerciseContainer', function() {
            var container;

            beforeEach(function() {
                container = document.createElement('div');
                spyOn(document, 'getElementById').and.returnValue(container);
            });

            it('should create an exercise container', function() {
                Utils.JSAV.createExerciseContainer('Exercise');
                expect(container.innerHTML).toContain('Exercise');
                expect(container.innerHTML).toContain('Settings');
                expect(container.innerHTML).toContain('jsavexercisecontrols');
                expect(container.innerHTML).toContain('jsavscore');
                expect(container.innerHTML).toContain('jsavoutput');
            });
        });

        describe('createHtmlElement', function() {
            var container;
            
            beforeEach(function() {
                container = document.createElement('div');
            });
            
            describe('if type is Mapper', function() {
                beforeEach(function() {
                    container.id = 'mapperContainer';     
                    spyOn(document, 'getElementById').and.returnValue(container);
                }); 
                
                it('should append a new child to the container', function() {
                    Utils.JSAV.createHtmlElement('Mapper', 1);
                    expect(container.innerHTML).toContain('Mapper1');
                    expect(container.innerHTML).toContain('settings');
                    expect(container.innerHTML).toContain('jsavcontrols');
                    expect(container.innerHTML).toContain('jsavcounter');
                    expect(container.innerHTML).toContain('jsavoutput');
                    expect(container.innerHTML).toContain('jsavcanvas');
                });
                
                it('should return the id of the new container', function() {
                    result = Utils.JSAV.createHtmlElement('Mapper', 1);
                    expect(result).toEqual('Mapper1');
                });
            });
            
            describe('if type is Reducer', function() {
                beforeEach(function() {
                    container.id = 'reducerContainer';     
                    spyOn(document, 'getElementById').and.returnValue(container);
                }); 
                
                it('should return append a new child to the container', function() {
                    Utils.JSAV.createHtmlElement('Reducer', 1);
                    expect(container.innerHTML).toContain("Reducer1");
                    expect(container.innerHTML).toContain("settings");
                    expect(container.innerHTML).toContain("jsavcontrols");
                    expect(container.innerHTML).toContain("jsavcounter");
                    expect(container.innerHTML).toContain("jsavoutput");
                    expect(container.innerHTML).toContain("jsavcanvas");
                });
                
                it('should return the id of the new container', function() {
                    result = Utils.JSAV.createHtmlElement('Reducer', 1);
                    expect(result).toEqual('Reducer1');
                });
            });
            
            describe('if type is ShuffleAndSort', function() {
                beforeEach(function() {
                    container.id = 'sasContainer';     
                    spyOn(document, 'getElementById').and.returnValue(container);
                }); 
                
                it('should return append a new child to the container', function() {
                    Utils.JSAV.createHtmlElement('ShuffleAndSort', 1);
                    expect(container.innerHTML).toContain("ShuffleAndSort1");
                    expect(container.innerHTML).toContain("settings");
                    expect(container.innerHTML).toContain("jsavcontrols");
                    expect(container.innerHTML).toContain("jsavcounter");
                    expect(container.innerHTML).toContain("jsavoutput");
                    expect(container.innerHTML).toContain("jsavcanvas");
                });
                
                it('should return the id of the new container', function() {
                    result = Utils.JSAV.createHtmlElement('ShuffleAndSort', 1);
                    expect(result).toEqual('ShuffleAndSort1');
                });
            });
            
            describe('if type is Combiner', function() {
                beforeEach(function() {
                    container.id = 'combinerContainer';     
                    spyOn(document, 'getElementById').and.returnValue(container);
                }); 
                
                it('should return append a new child to the container', function() {
                    Utils.JSAV.createHtmlElement('Combiner', 1);
                    expect(container.innerHTML).toContain("Combiner1");
                    expect(container.innerHTML).toContain("settings");
                    expect(container.innerHTML).toContain("jsavcontrols");
                    expect(container.innerHTML).toContain("jsavcounter");
                    expect(container.innerHTML).toContain("jsavoutput");
                    expect(container.innerHTML).toContain("jsavcanvas");
                });
                
                it('should return the id of the new container', function() {
                    result = Utils.JSAV.createHtmlElement('Combiner', 1);
                    expect(result).toEqual('Combiner1');
                });
            });
            
            describe('if type is Partitioner', function() {
                beforeEach(function() {
                    container.id = 'partitionerContainer';     
                    spyOn(document, 'getElementById').and.returnValue(container);
                }); 
                
                it('should return append a new child to the container', function() {
                    Utils.JSAV.createHtmlElement('Partitioner', 1);
                    expect(container.innerHTML).toContain("Partitioner1");
                    expect(container.innerHTML).toContain("settings");
                    expect(container.innerHTML).toContain("jsavcontrols");
                    expect(container.innerHTML).toContain("jsavcounter");
                    expect(container.innerHTML).toContain("jsavoutput");
                    expect(container.innerHTML).toContain("jsavcanvas");
                });
                
                it('should return the id of the new container', function() {
                    result = Utils.JSAV.createHtmlElement('Partitioner', 1);
                    expect(result).toEqual('Partitioner1');
                });
            });
        });
    });

    describe('Exercise', function() {
        describe('toggleElementCorrectness', function() {
            var element;

            beforeEach(function() {
                element = document.createElement('div');
            });

            describe('if state is correct', function() {
                describe('if element has class incorrect', function() {
                    beforeEach(function() {
                        element.className = ' incorrect';
                        Utils.Exercise.toggleElementCorrectness(element, true);
                    });

                    it('should change the class of the element to correct', function() {
                        expect(element.className).toContain('correct');
                    });
                });

                describe('if element does not have class incorrect', function() {
                    beforeEach(function() {
                        Utils.Exercise.toggleElementCorrectness(element, true);
                    });

                    it('should change the class of the element to correct', function() {
                        expect(element.className).toContain('correct');
                    });
                });
            });

            describe('if state is incorrect', function() {
                describe('if element has class correct', function() {
                    beforeEach(function() {
                        element.className = ' correct';
                        Utils.Exercise.toggleElementCorrectness(element, false);
                    });

                    it('should change the class of the element to correct', function() {
                        expect(element.className).toContain('incorrect');
                    });
                });

                describe('if element does not have class correct', function() {
                    beforeEach(function() {
                        Utils.Exercise.toggleElementCorrectness(element, false);
                    });

                    it('should change the class of the element to correct', function() {
                        expect(element.className).toContain('incorrect');
                    });
                });
            });
        });

        describe('getPopupHTML', function() {
            it('should return the html of the popup', function() {
                expect(Utils.Exercise.getPopupHTML).not.toThrowError();
            });
        });
    });
});