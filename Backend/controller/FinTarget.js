const express = require('express')
const path = require('path')
const fetch = require('node-fetch')
const redis = require('../redis-client')
const rateLimiter = require('../middleware/rateLimiter.js')
async function task(user_id){
    console.log(`${user_id}-task completed at-${Date.now()}`)
    
    }
    
task(123);
const app = express()
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'FinTarget.html'))
})

app.post('./api1',
    rateLimiter({ secWindow: 60, allowedHits: 20 }),
    async (req, res) => {

        return res.json({
            response: 'ok',
            callsInMinutes: req.request,
            expiryTime: req.expiryTime
        })
    })
app.post('./api2',
    rateLimiter({ secWindow: 60, allowedHits: 20 }),
    async (req, res) => {

        return res.json({
            response: 'ok',
            callsInMinutes: req.request,
            expiryTime: req.expiryTime
        })
    })
app.listen(process.env.PUBLIC_PORT)

