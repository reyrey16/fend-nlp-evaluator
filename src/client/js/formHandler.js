function handleSubmit(event) {
    console.log("I RAN")
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url').value

    if (formText == "") {
        document.getElementById('results').innerHTML = "Please enter a valid URL"
        return false
    }

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8080/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}

export { handleSubmit }
