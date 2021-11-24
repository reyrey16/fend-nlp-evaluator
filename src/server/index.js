var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv').config()
var bodyParser = require('body-parser')
var cors = require('cors')

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(__dirname)
console.log(`Your API key is ${process.env.API_KEY}`) 

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// // API call to Meaning Cloud
// const formdata = new FormData();
// formdata.append("key", process.env.API_KEY)
// formdata.append("lang", "en")
// formdata.append("txt", "YOUR TEXT HERE")

// const requestOptions = {
//   method: 'POST',
//   body: formdata,
//   redirect: 'follow'
// };

// const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
//   .then(response => ({
//     status: response.status, 
//     body: response.json()
//   }))
//   .then(({ status, body }) => console.log(status, body))
//   .catch(error => console.log('error', error));
