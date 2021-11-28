/* POST data to the server side */
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

/**
* @description Handles the submit event and updates the webpage dynamically
* @param {event} event
* @returns {boolean} false if invalid URL, other then that, it should dynamically
*                    update the webpage with the returned data
*/
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
    // Add default text while the API is gathering the data
    document.getElementById('results').innerHTML = "PROCESSING ARTICLE, PLEASE WAIT..."
    document.getElementById('resultsSection').style.display = "block"
    document.getElementById('url').value = ""

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
