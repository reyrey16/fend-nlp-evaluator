import 'regenerator-runtime/runtime'
import { sentenceCreator } from "../src/client/js/SentenceCreator"

describe("Testing the sentenceCreator functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the sentenceCreator() function", () => {
           // Define the input for the function, if any, in the form of variables/array
           // Define the expected output, if any, in the form of variables/array
           // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
           // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
           expect(sentenceCreator({confidence:100,  
                                   score_tag: "P+",
                                   subjectivity: "SUBJECTIVE",
                                   irony: "IRONIC"
                                })).toBe("With 100% confidence, the article is overall very positive, subjective, and last but not least, it's ironic.");

            expect(sentenceCreator({confidence:90,  
                                    score_tag: "P",
                                    subjectivity: "SUBJECTIVE",
                                    irony: "NONIRONIC"
                                 })).toBe("With 90% confidence, the article is overall positive, subjective, and last but not least, it's nonironic.");
    })
});