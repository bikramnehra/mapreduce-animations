/**
 * Created by matthewmicallef on 02/06/2016.
 */

describe('WordCount', function() {
    var result;
    
    describe('setAnimationService', function() {
        it('should not throw an error', function() {
           expect(WordCount.setAnimationService).not.toThrowError(); 
        });
    });
    
    describe('runWordCountMapReduce', function() {        
        beforeEach(function() {                
            spyOn(WordCount, 'map');
            spyOn(WordCount, 'combine');
            spyOn(WordCount, 'partition');
            spyOn(WordCount, 'shuffleAndSort');
            spyOn(WordCount, 'reduce');  
            spyOn(WordCount, 'reset');
            spyOn(WordCount, 'processInput').and.returnValue('');       
        });
          
        describe('if animationService.isUsingCombiners returns false', function() {
            beforeEach(function() {            
                animationService = {
                    isUsingCombiners: function() { },
                    setJSAVInstances: function() { }
                }                       ;
                spyOn(animationService, 'isUsingCombiners').and.returnValue(false);
                spyOn(animationService, 'setJSAVInstances');
                 
                WordCount.runWordCountMapReduce(2, 1, false, 'hello world');                
            });
            
            it('should call WordCount.reset', function() {
                expect(WordCount.reset).toHaveBeenCalled();
            });
            
            it('should call WordCount.map', function() {
                expect(WordCount.map).toHaveBeenCalled();
            });
            
            it('should call WordCount.partition', function() {
                expect(WordCount.partition).toHaveBeenCalled();
            });
            
            it('should call WordCount.shuffleAndSort', function() {
                expect(WordCount.shuffleAndSort).toHaveBeenCalled();
            });
            
            it('should call WordCount.reduce', function() {
                expect(WordCount.reduce).toHaveBeenCalled();
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
                 
                WordCount.runWordCountMapReduce(2, 1, true, 'hello world');                
            });
            
            it('should still call all animation functions', function() {
                expect(WordCount.reset).toHaveBeenCalled();
                expect(WordCount.map).toHaveBeenCalled();
                expect(WordCount.partition).toHaveBeenCalled();
                expect(WordCount.shuffleAndSort).toHaveBeenCalled();
                expect(WordCount.reduce).toHaveBeenCalled();
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
                 
                WordCount.runWordCountMapReduce(2, 1, false, 'hello world');                
            });
            
            it('should still call all animation functions', function() {
                expect(WordCount.reset).toHaveBeenCalled();
                expect(WordCount.map).toHaveBeenCalled();
                expect(WordCount.partition).toHaveBeenCalled();
                expect(WordCount.shuffleAndSort).toHaveBeenCalled();
                expect(WordCount.reduce).toHaveBeenCalled();
            });
            
            it('should call RelativeFrequencies.combine', function() {
                expect(WordCount.combine).toHaveBeenCalled();
            });
        });
    });
    
    describe('processInput', function() {
        describe('if input is null', function() {
            it('should return null', function() {
                result = WordCount.processInput(null, false, 10);
                expect(result).toBeNull();
            });
        });

        describe('if mapperCount is <= 0', function() {
            it('should return null', function() {
                result = WordCount.processInput('test', false, -1);
                expect(result).toBeNull;
            });
        });

        describe('if inputs are acceptable', function() {
            describe('and mapperPerLine is true', function() {                
                it('should return an array split by new lines', function() {
                    result = WordCount.processInput(
                        'hello world \n test',
                        true,
                        2  
                    );
                    
                    expect(result).toEqual(['hello world', 'test']);
                });
            });
            
            describe('and mapperPerLine is false', function() {
                it('should assign a mapper id to every entry', function() {
                    result = WordCount.processInput(
                        'hello world \n test1 \n test2',
                        false,
                        2
                    );
                    
                    expect(result).toEqual(['hello world',  'test1 test2']);
                }); 
            });
            
            describe('and input contains one line', function() {
                it('should assign a mapper id to every entry', function() {
                    result = WordCount.processInput(
                        'hello world',
                        false,
                        2
                    );
                    
                    expect(result).toEqual(['hello', 'world']);
                }); 
            });
        });     
    });
    
    describe('reset', function() {
        it('should not throw an error', function() {
            expect(WordCount.reset).not.toThrowError();
        });
    });
    
    /*
        Note: The rest of the animation functions (map, reduce, etc...) cannot be tested, 
        since they call a new instance of JSAV (an external lib). Mocking the JSAV library 
        is out of the test scope.
        
        However, all the functions that the animation uses have been tested, ensuring a correct output.
    */
});