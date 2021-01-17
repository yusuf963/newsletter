const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/weather', (req, res) => {
  const cityName = req.body.cityName
  https.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5cff77681bc5df9617cb2d7bdb97efc8&units=metric`, (response) => {
    response.on('data', (data) => {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const humidity = weatherData.main.humidity
      // const icon = weatherData.weather[0].icon
      // const imageUrl = "https://openweathermap.org/img/wn/04n@2x.png"
      // res.write('<img src=`${imageUrl}`/>')
      // res.write('<img src= ' + imageUrl + '/>')
      res.write('the Temperature in ' + cityName + ' is ' + temp + ' and the humidity is ' + humidity)

      res.send()

    })
  })
})

app.post('/', (req, res) => {
  const arr = []
  const firstName = req.body.input1
  console.log(req.body)
  arr.push(req.body.input3)
  res.send(`Hi ${firstName}, thanks for submitting form`)
  console.log(arr)
})

app.post('/bmi', (req, res) => {
  const weight = parseFloat(req.body.weight)
  const height = parseFloat(req.body.height)
  const bmi = weight / (height * height)
  res.send(`Your Body Mass index is ${bmi}`)
})

app.listen(port, () => {
  console.log('server up and running on ' + port + '.')
})