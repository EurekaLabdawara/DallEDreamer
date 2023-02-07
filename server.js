// access dotenv var
import * as dotenv from 'dotenv'
dotenv.config()

import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI
})

const openai = new OpenAIApi(configuration)

// minimal backend that could be implementing middleware
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/dream', async(req,res)=>{
    try {
        const prompt = req.body.prompt
        const aiResponse = await openai.createImage({
            prompt,
            // number of image
            n:1,
            // resolution
            size:'1024x1024'
        })
        const image = aiResponse.data.data[0].url
        res.send({image})
    } catch (error) {
        console.error(error)
        res.status(500).send(error?.response.data.error.message || 'Uh oh.. Something went wrong')
    }
})

app.listen(8080, () => console.log('lets dream with DallE on http://localhost:8080/dream'))