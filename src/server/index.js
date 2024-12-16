var path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();


const app = express()

const cors = require('cors');
const { url } = require('inspector');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('dist'))



console.log(__dirname)

//define url and api key
const meaning_cloud = process.env.Meaining_API_KEY
const meaning_cloud_URL = 'https://api.meaningcloud.com/sentiment-2.1?'
app.get('/', function (req, res) {
     res.sendFile('dist/index.html')
    
})



app.post('/api', async function(req, res) {
    url = req.body.url
   
    const apiURL = `${meaning_cloud_URL}'key=${meaning_cloud}&url=${url}&lang=en`
    const response = await fetch(apiURL)
    const meaningDataCloud = await response.json()
    console.log(meaningDataCloud)
    res.send(meaningDataCloud)
    
    
})




app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})


