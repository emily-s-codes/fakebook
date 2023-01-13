import express from 'express'
import cors from 'cors'
import './config/config.js'
import morgan from 'morgan'
import multer from 'multer'
import { body, validationResult } from 'express-validator'
import { addNewContact, deleteContact, editContact, getAllContacts, getSingleContact } from './model/ProfileDao.js'


const PORT = process.env.PORT
const app = express()

const formReader = multer()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

const fakebookPath = '/api/fakebook'
const profilePath = '/api/fakebook/profile/:id'
const addPath = '/api/fakebook/add'

app.get(fakebookPath, getAllContacts)

app.get(profilePath, getSingleContact)

app.post(addPath, formReader.none(),
    // body('email').isEmail(),
    // body('name').isLength({ min: 1, max: 50 }),
    // body('last').isLength({ min: 1, max: 50 }),
    addNewContact
)

app.put(profilePath, formReader.none(), // body('email').isEmail(),
    // body('name').isLength({ min: 1, max: 50 }),
    // body('last').isLength({ min: 1, max: 50 }),
    editContact)

app.delete(profilePath, deleteContact)

app.listen(PORT, () => console.log('running on', PORT))