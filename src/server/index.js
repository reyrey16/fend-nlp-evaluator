var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv').config()
var bodyParser = require('body-parser')
var cors = require('cors')
const fetch = require('node-fetch')

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(`Your API key is ${process.env.API_KEY}`) 

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

app.post('/url', function (req, res) {
    // Preparing the object needed
    let data = {
        key : process.env.API_KEY,
        url : req.body.url,
        lang : "en"
    }
    // Preparing the options needed
    const requestOptions = {
        method: 'POST',
        body: data,
        redirect: 'follow'
    }

    console.log(getMeaningCloud(requestOptions))


})

const getMeaningCloud = async (requestOptions) => {
    const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
    try {
        let results = {
            status: response.status, 
            body: response.json()
        }
        return results
    } catch (error) {
        console.log('MeaningCloud API error:', error)
    }
}

/* Function to GET Meaning Cloud API Data*/
// const postArticle = async (url) => {
//     console.log("post article ran")
    //Getting the weather data and saving it
    // const response = await fetch(baseURL+zip+apiKey)
    // try {
    //   const data = await response.json();
    //   return data;
    // } catch (error) {
    //   console.log(" GET WEATHER ERROR:", error);
    // }
 // }

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
