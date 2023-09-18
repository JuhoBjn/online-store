const express = require('express')

const app = express()

app.get('/pulsecheck', (req, res) => {
  res.send('Pulsecheck OK')
})

module.exports = app
