/**
 * Created by matthewmicallef on 02/06/2016.
 */

describe('RelativeFrequencies', function() {
    var result;
    
    describe('setAnimationService', function() {
       it('should not throw an error', function() {
           expect(RelativeFrequencies.setAnimationService).not.toThrowError(); 
       });
    });

    describe('runRelativeFrequenciesMapReduce', function() {        
        beforeEach(function() {                
            spyOn(RelativeFrequencies, 'map');
            spyOn(RelativeFrequencies, 'combine');
            spyOn(RelativeFrequencies, 'partition');
            spyOn(RelativeFrequencies, 'shuffleAndSort');
            spyOn(RelativeFrequencies, 'reduce');  
            spyOn(RelativeFrequencies, 'reset');
            spyOn(RelativeFrequencies, 'processInput').and.returnValue('');       
        });
          
        describe('if animationService.isUsingCombiners returns false', function() {
            beforeEach(function() {            
                animationService = {
                    isUsingCombiners: function() { },
                    setJSAVInstances: function() { }
                }                       ;
                spyOn(animationService, 'isUsingCombiners').and.returnValue(false);
                spyOn(animationService, 'setJSAVInstances');
                 
                RelativeFrequencies.runRelativeFrequenciesMapReduce(2, 1, false, 'hello world');                
            });
            
            it('should call RelativeFrequencies.reset', function() {
                expect(RelativeFrequencies.reset).toHaveBeenCalled();
            });
            
            it('should call RelativeFrequencies.map', function() {
                expect(RelativeFrequencies.map).toHaveBeenCalled();
            });
            
            it('should call RelativeFrequencies.partition', function() {
                expect(RelativeFrequencies.partition).toHaveBeenCalled();
            });
            
            it('should call RelativeFrequencies.shuffleAndSort', function() {
                expect(RelativeFrequencies.shuffleAndSort).toHaveBeenCalled();
            });
            
            it('should call RelativeFrequencies.reduce', function() {
                expect(RelativeFrequencies.reduce).toHaveBeenCalled();
            });
        });
        
        describe('if mapperPerLine input is true', function() {
            beforeEach(function() {            
                animationService = {
                    isUsingCombiners: function() { },
                    setJSAVInstances: function() { }
                }                       ;
                spyOn(animationService, 'isUsingCombiners').and.returnValue(false);
                spyOn(animationService, 'setJSAVInstances');
                 
                RelativeFrequencies.runRelativeFrequenciesMapReduce(2, 1, true, 'hello world');                
            });
            
            it('should still call all animation functions', function() {
                expect(RelativeFrequencies.reset).toHaveBeenCalled();
                expect(RelativeFrequencies.map).toHaveBeenCalled();
                expect(RelativeFrequencies.partition).toHaveBeenCalled();
                expect(RelativeFrequencies.shuffleAndSort).toHaveBeenCalled();
                expect(RelativeFrequencies.reduce).toHaveBeenCalled();
            });
        });
        
        describe('if animationService.isUsingCombiners returns true', function() {
            beforeEach(function() {            
                animationService = {
                    isUsingCombiners: function() { },
                    setJSAVInstances: function() { }
                }                       ;
                spyOn(animationService, 'isUsingCombiners').and.returnValue(true);
                spyOn(animationService, 'setJSAVInstances');
                 
                RelativeFrequencies.runRelativeFrequenciesMapReduce(2, 1, false, 'hello world');                
            });
            
            it('should still call all animation functions', function() {
                expect(RelativeFrequencies.reset).toHaveBeenCalled();
                expect(RelativeFrequencies.map).toHaveBeenCalled();
                expect(RelativeFrequencies.partition).toHaveBeenCalled();
                expect(RelativeFrequencies.shuffleAndSort).toHaveBeenCalled();
                expect(RelativeFrequencies.reduce).toHaveBeenCalled();
            });
            
            it('should call RelativeFrequencies.combine', function() {
                expect(RelativeFrequencies.combine).toHaveBeenCalled();
            });
        });
    });

    describe('processInput', function() {
        describe('if input is null', function() {
            it('should return null', function() {
                result = RelativeFrequencies.processInput(null, false, 10);
                expect(result).toBeNull();
            });
        });

        describe('if mapperCount is <= 0', function() {
            it('should return null', function() {
                result = RelativeFrequencies.processInput('test', false, -1);
                expect(result).toBeNull;
            });
        });

        describe('if inputs are acceptable', function() {
            describe('and mapperPerLine is true', function() {                
                it('should return an array split by new lines', function() {
                    result = RelativeFrequencies.processInput(
                        'hello world \n test',
                        true,
                        2  
                    );
                    
                    expect(result).toEqual(['hello world', 'test']);
                });
            });
            
            describe('and mapperPerLine is false', function() {
                it('should assign a mapper id to every entry', function() {
                    result = RelativeFrequencies.processInput(
                        'hello world \n test1 \n test2',
                        false,
                        2
                    );
                    
                    expect(result).toEqual(['hello world',  'test1 \n test2']);
                }); 
            });
            
            describe('and input contains one line', function() {
                it('should assign a mapper id to every entry', function() {
                    result = RelativeFrequencies.processInput(
                        'hello world',
                        false,
                        2
                    );
                    
                    expect(result).toEqual(['hello', 'world']);
                }); 
            });
        });
    });

    describe('getNeighbors', function() {
        describe('if inputs are null', function() {
            it('should return null', function() {
                result = RelativeFrequencies.getNeighbors(null, null);
                expect(result).toBeNull(); 
            });
        });
        
        describe('if inputs are acceptable', function() {
            it('should return all neighbors of the given word', function() {
                var input = 'world hello world';
                result = RelativeFrequencies.getNeighbors(input, 'world');
                expect(result).toEqual(['hello', 'world']);
            });
        });
    });
    
    describe('arrayContainsPair', function() {
        /*
            Note: This function also tests getPartOfKey and getKeyEquality.
        */
        
        describe('if first input is null', function() {
            it('should return null', function() {
                result = RelativeFrequencies.arrayContainsPair(null, 'test');
                expect(result).toBeNull();
            });
        });
        
        describe('if second input is null', function() {
            it('should return null', function() {
                result = RelativeFrequencies.arrayContainsPair('test', null);
                expect(result).toBeNull();
            });
        });
        
        describe('if inputs are acceptable', function() {            
            var input;
            beforeEach(function() {
                input = ['(1, 2)', '(2, 5)'];
            });
            
            describe('if the key is present in the array', function() {
                it('should return the position of the found key in the array', function() {
                    result = RelativeFrequencies.arrayContainsPair(input, '(2, 5)');
                    expect(result).toEqual(1);
                }); 
            });
            
            describe('if the key is not present in the array', function() {
                it('should return -1', function() {
                    result = RelativeFrequencies.arrayContainsPair(input, '(1, 1)');
                    expect(result).toEqual(-1);   
                });
            });
        });        
    });

    describe('reset', function() {
        it('should not throw an error', function() {
            expect(RelativeFrequencies.reset).not.toThrowError();
        });
    });
    
    /*
        Note: The rest of the animation functions (map, reduce, etc...) cannot be tested, 
        since they call a new instance of JSAV (an external lib). Mocking the JSAV library 
        is out of the test scope.
        
        However, all the functions that the animation uses have been tested, ensuring a correct output.
    */
});