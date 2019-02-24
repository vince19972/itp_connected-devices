/*

  init settings

*/

// .env setting module
require('dotenv').config()
const { MAC_ADDRESS, SESSION_KEY } = process.env

// import required modules
const path = require('path')
const https = require('https')
const StringDecoder = require('string_decoder').StringDecoder

// declare root variables
const rootDir = path.dirname(process.mainModule.filename)
const deviceData = require(path.join(rootDir, 'src', 'js', 'sensorReading.js'))
const decoder = new StringDecoder('utf-8')

/*

  helper functions

*/

// getter functions
const get = {
  postData (deviceData) {
    return JSON.stringify({
      'macAddress': MAC_ADDRESS,
      'sessionKey': SESSION_KEY,
      'data': JSON.stringify(deviceData)
    })
  },
  options (postData) {
    return {
      host: 'tigoe.io',
      port: 443,
      path: '/data',
      method: 'POST',
      headers: {
        'User-Agent': 'nodejs',
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    }
  }
}

// setter functions
const set = {
  httpCallback (response) {
    let buffer = ''

    response.on('data', (data) => {
      buffer += decoder.write(data)
    })
    response.on('end', () => {
      buffer += decoder.end()
    })
  },
  sendData () {
    const postData = get.postData(deviceData)
    const request = https.request(get.options(postData), set.httpCallback)
    request.write(postData)
    request.end()
  }
}

/*

  main program

*/

// set interval to send data to server
setInterval(set.sendData, 3000)