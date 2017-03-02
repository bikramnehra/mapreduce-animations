/**
 * Created by matthewmicallef on 02/06/2016.
 */

describe('Mean', function() {
    var result;
    
    describe('setAnimationService', function() {
       it('should not throw an error', function() {
           expect(Mean.setAnimationService).not.toThrowError(); 
       });
    });

    describe('runMeanMapReduce', function() {        
        beforeEach(function() {                
            spyOn(Mean, 'map');
            spyOn(Mean, 'combine');
            spyOn(Mean, 'partition');
            spyOn(Mean, 'shuffleAndSort');
            spyOn(Mean, 'reduce');  
            spyOn(Mean, 'reset');             
        });
          
        describe('if animationService.isUsingCombiners returns false', function() {
            beforeEach(function() {            
                animationService = {
                    isUsingCombiners: function() { },
                    setJSAVInstances: function() { }
                }                       ;
                spyOn(animationService, 'isUsingCombiners').and.returnValue(false);
                spyOn(animationService, 'setJSAVInstances');
                 
                Mean.runMeanMapReduce(2, 1, false, 'hello world');                
            });
            
            it('should call Mean.reset', function() {
                expect(Mean.reset).toHaveBeenCalled();
            });
            
            it('should call Mean.map', function() {
                expect(Mean.map).toHaveBeenCalled();
            });
            
            it('should call Mean.partition', function() {
                expect(Mean.partition).toHaveBeenCalled();
            });
            
            it('should call Mean.shuffleAndSort', function() {
                expect(Mean.shuffleAndSort).toHaveBeenCalled();
            });
            
            it('should call Mean.reduce', function() {
                expect(Mean.reduce).toHaveBeenCalled();
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
                 
                Mean.runMeanMapReduce(2, 1, false, 'hello world');                
            });
            
            it('should still call all animation functions', function() {
                expect(Mean.reset).toHaveBeenCalled();
                expect(Mean.map).toHaveBeenCalled();
                expect(Mean.partition).toHaveBeenCalled();
                expect(Mean.shuffleAndSort).toHaveBeenCalled();
                expect(Mean.reduce).toHaveBeenCalled();
            });
            
            it('should call Mean.combine', function() {
                expect(Mean.combine).toHaveBeenCalled();
            });
        });
    });

    describe('processInput', function() {
        describe('if input is null', function() {
            it('should return null', function() {
                result = Mean.processInput(null, 10);
                expect(result).toBeNull();
            });
        });

        describe('if mapperCount is <= 0', function() {
            it('should return null', function() {
                result = Mean.processInput('test', -1);
                expect(result).toBeNull;
            });
        });

        describe('if inputs are acceptable', function() {
            it('return add a mapper Id field to every object in the array', function() {;
                result = Mean.processInput([{
                    key: "test",
                    values: "2"
                },
                {
                    key: "test",
                    values: "2"
                },
                {
                    key: "test",
                    values: "2"
                }], 2);

                expect(result[0].mapperId).toEqual(1);
                expect(result[1].mapperId).toEqual(2);
                expect(result[2].mapperId).toEqual(2);
            });
        });
    });

    describe('getPairValuesAverage', function() {
        //Covers getSumFromPair and getCountFromPair since this function calls them both.

        describe('if input is null', function() {
            it('should return null', function() {
                result = Mean.getPairValuesAverage(null);
                expect(result).toBeNull();
            });
        });

        describe('if input is not null', function() {
            it('should return an array containing the sum, count and average of the given pairs', function() {
                result = Mean.getPairValuesAverage('p(1, 2), p(3, 1), p(2, 2)')
                expect(result).toEqual([6, 5, '1.20']);
            });
        });
    });

    describe('reset', function() {
        it('should not throw an error', function() {
            expect(Mean.reset).not.toThrowError();
        });
    });
    
    /*
        Note: The rest of the animation functions (map, reduce, etc...) cannot be tested, 
        since they call a new instance of JSAV (an external lib). Mocking the JSAV library 
        is out of the test scope.
        
        However, all the functions that the animation uses have been tested, ensuring a correct output.
    */
});