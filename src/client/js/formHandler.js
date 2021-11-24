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

    //FIRST: Post url to API to get analysis
    let results = postURL('/url', {url:formText})
    console.log(results)


}

export { handleSubmit }
