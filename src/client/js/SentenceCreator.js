/**
* @description Creates a sentence based on the input data
* @param {JSON} data
* @returns {string} A string created using various keys from the data JSON
*/
function sentenceCreator(data){
    // 1. confidence, represents the confidence associated with the sentiment analysis 
    //    performed on the text. Its value is an integer number in the 0-100 range.
    let sentence = `With ${data.confidence}% confidence, `
    
    // 2. score_tag, polarity of the overall text
    switch(data.score_tag) {
      case "P+":
        sentence += "the article is overall very positive, "
        break;
      case "P":
        sentence += "the article is overall positive, "
        break;
      case "NEU":
        sentence += "the article is neutral, "
        break;
      case "N":
        sentence += "the article is negative, "
        break;
      case "N+":
        sentence += "the article is very negative, "
        break;
      case "NONE":
        sentence += "the article is neutral, "
        break;
    } 
  
    // 3. subjectivity, either OBJECTIVE or SUBJECTIVE
    sentence += data.subjectivity.toLowerCase() + ", "
  
    // 4. irony, either NONIRONIC or IRONIC
    sentence += "and last but not least, it's " + data.irony.toLowerCase() + "."
  
    return sentence
  }

  export { sentenceCreator }