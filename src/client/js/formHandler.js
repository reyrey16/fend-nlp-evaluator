/* Function to POST data */
const postURL = async (url = '', data = {}) => {
  //Sending the data to the server side
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("POST ERROR:", error);
  }
}

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

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url').value

    // validate that the input isn't blank
    if (formText == "") {
        document.getElementById('results').innerHTML = "Please enter a valid URL"
        return false
    }

    console.log("::: Form Submitted :::")
    document.getElementById('results').innerHTML = "PROCESSING ARTICLE, PLEASE WAIT..."
    document.getElementById('resultsSection').style.display = "block"

    //FIRST: Post url to API to get analysis
    postURL('/url', {url:formText})

    // SECOND: Update view with the returned data from the API
    .then((data) => {
      console.log(data)
      let results = ""
      // If API call is successfull
      if (data.status.code === "0") {
        results = sentenceCreator(data)
      }
      else {
        results = "Invalid URL, please try again"
      }
      document.getElementById('results').innerHTML = results
    }) 



}

export { handleSubmit }
