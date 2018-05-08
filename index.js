const { SimpleResponse } = require('dialogflow-fulfillment/node_modules/actions-on-google/dist/service/actionssdk');

const processor = require('./processor')
const express = require('express'),
    bodyParser = require('body-parser')
const { WebhookClient } = require('dialogflow-fulfillment')
const { Card, Suggestion } = require('dialogflow-fulfillment')
const { List, Image } = require('actions-on-google')

const https = require('https')

const PORT = process.env.PORT || 4200


const app = express(bodyParser.json())

app.use(bodyParser.json())

app.get('/', (request, response) => {
    https.get({
        host: '10.137.28.40',
        port: 8443,
        path: '/GoogleAssistant/GetCurrentBalacnce/66932780014',
        method: 'GET',
        rejectUnauthorized: false,
        agent: false,
    }, (res) => {
        let data = ''

        res.on('data', (x) => {data += x})

        res.on('end', () => {
            response.send(JSON.parse(data))
            response.end()
        })
    }).on('error', (e) => {
        console.log(e)
    })
})

app.post('/', (req, res) => {
    console.log("Request Header: " + JSON.stringify(req.headers))
    console.log("Request Body: " + JSON.stringify(req.body))

    req = processor(req)

    const agent = new WebhookClient({request: req, response: res})

    function welcome(agent) {
        agent.add(`สวัสดีครับ มีอะไรให้อุ่นใจช่วยครับ`)
    }

    function fallback(agent) {
        agent.add(`I don't understand`)
        agent.add(`I am sorry. Can you repeat again`)
    }

    function sim2fly(agent) {
        const simImg = [
            'https://store.ais.co.th/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/2/12call_sim2fly_399_b_1.jpg',
            'https://store.ais.co.th/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/2/12call_sim2fly_899_b.jpg',
        ]

        let conv = agent.conv()
        conv.ask(new SimpleResponse({
            speech: '<speak>อุ่นใจแนะนำ Sim<sub alias="ทู">2</sub>Fly ราคาประหยัดครับ</speak>',
            text: 'อุ่นใจแนะนำ Sim2Fly ราคาประหยัดครับ ✈️'
        }))
        agent.add(conv)
    }

    function onTopHandler(agent) {
        agent.add(`<speak>สามารถเลือกแพกเกจเสริมได้ที่แอป My <say-as interpret-as="verbatim">AIS</say-as> ครับ</speak>`)
        agent.add(new Suggestion(`Open MY AIS`))
    }

    function optionsHandlers(agent) {
        
    }

    let intentMap = new Map()

    intentMap.set('Default Welcome Intent', welcome)
    intentMap.set('Default Fallback Intent', fallback)
    intentMap.set('ir:roaming', sim2fly)
    intentMap.set('on-top', onTopHandler)
    agent.handleRequest(intentMap)
})

app.listen(PORT, (error) => {
    if (error) {
        console.log(error)
    }
    else {
        console.log(`listening at port ${PORT}`)
    }
})
