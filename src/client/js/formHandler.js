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

    // REGEX test for URL
    // Borrowed from https://www.regextester.com/94502
    const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm

    // validate that the input isn't blank
    if (formText == "") {
        document.getElementById('results').innerHTML = "URL can't be blank, please try again"
        return false
    }
    else if (!pattern.test(formText)) {
      document.getElementById('results').innerHTML = "Invalid URL, please try again"
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
        results = Client.sentenceCreator(data)
      }
      else {
        results = "Invalid URL results, please try again"
      }
      document.getElementById('results').innerHTML = results
    })
    
    // IF IT ERRORS OUT: Catch the error here
    .catch((e) => {
      if (e.message.includes("NetworkError")) {
        document.getElementById('results').innerHTML = "It seems you are not connected to the internet. Please check your internet connection and try again"
      } else {
        document.getElementById('results').innerHTML = e.message
      }
    })
}

export { handleSubmit }
