var path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
var bodyParser = require('body-parser')
var cors = require('cors')
const fetch = require('node-fetch')
var FormData = require('form-data')
const { response } = require('express')

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

// Requests
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

app.post('/url', function (req, res) {
    // Preparing the object needed
    const formdata = new FormData();
    formdata.append("key", process.env.API_KEY);
    formdata.append("url", req.body.url);
    formdata.append("lang", "en"); 

    // Preparing the options needed
    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    }

    // Call the MeaningCloud API
    getMeaningCloud(requestOptions)
    .then((data) => {
        res.send(data)
    })
    
})

const getMeaningCloud = async (requestOptions) => {
    const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
    try {
      const data = await response.json()
      return data
    } catch (error) {
      console.log(" MeaningCloud API Error:", error)
    }
}