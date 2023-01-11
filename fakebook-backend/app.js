import express from 'express'
import cors from 'cors'
import './config/config.js'
import { getDb } from './utils/db.js'
import morgan from 'morgan'
import { ObjectID } from 'bson'

const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

const fakebookPath = '/api/fakebook'
const profilePath = '/api/fakebook/:id'

app.get(fakebookPath, (req, res) => {
    getDb()
        .then(db => db.collection('contacts').find())
        .then(pointer => pointer.toArray())
        .then(array => res.status(200).json(array))
})

app.get(profilePath, (req, res) => {
    const params = req.params.id
    const searchId = ObjectID(params)

    getDb()
        .then(db => db.collection('contacts').find({ "_id": searchId }))
        .then(cursor => cursor.toArray())
        .then(data => res.status(200).json(data))
})

app.post(fakebookPath, (req, res) => {
    const contact = req.body
    getDb()
        .then(db => db.collection('contacts').insertOne(contact))
        .then(acknowledge => res.status(200).json(acknowledge))
})

app.listen(PORT, () => console.log('running on', PORT))