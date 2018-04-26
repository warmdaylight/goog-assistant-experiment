const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')

const app = express()

app.get('/', (req, res) => res.send({"msg": "Hello world!"}))

app.listen(4200, () => console.log("Example application is running on port 4200"))