import { getDb } from "../util/db.js"
import { ObjectID } from 'bson'

export const getAllContacts = (req, res) => {
    // return new Promise((resolve, reject) => {

    // })
    getDb()
        .then(db => db.collection('contacts').find())
        .then(pointer => pointer.toArray())
        .then(array => res.status(200).json(array))
}

export const getSingleContact = (req, res) => {
    const params = req.params.id
    const searchId = ObjectID(params)

    getDb()
        .then(db => db.collection('contacts').find({ "_id": searchId }))
        .then(cursor => cursor.toArray())
        .then(data => res.status(200).json(data))
}

export const addNewContact = (req, res) => {
    const contact = req.body
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    getDb()
        .then(db => {
            console.log('logging new contact', contact)
            return db.collection('contacts').insertOne(contact)
        })
        .then(acknowledge => res.status(200).json(acknowledge))
    // }
}

export const editContact = (req, res) => {
    const params = req.params.id
    const searchId = ObjectID(params)
    const contact = req.body
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    getDb()
        .then(db => {
            console.log('logging updated contact', contact)
            return db.collection('contacts')
                .updateOne({ "_id": searchId },
                    { $set: contact })
        })
        .then(acknowledge => res.status(200).json(acknowledge))
    // }
}

export const deleteContact = (req, res) => {
    const params = req.params.id
    const searchId = ObjectID(params)

    getDb()
        .then(db => db.collection('contacts').deleteOne({ "_id": searchId }))
        .then(data => res.status(200).json(data))

}