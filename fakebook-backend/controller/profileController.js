import { allContacts, deleteContact, editContact, newContact, singleContact } from "../model/ProfileDao.js"
import { ObjectID } from 'bson'

export const getAllContacts = (_, res) => {
    console.log('getallcontacts called')
    allContacts()
        .then(result => res.json(result))
        .catch(err => console.log(err))
}

export const getSingleContact = (req, res) => {
    console.log('getSingleContact called')
    const params = req.params.id
    const searchId = ObjectID(params)
    const id = { "_id": searchId }
    singleContact(id)
        .then(result => res.json(result))
        .catch(err => console.log(err))
}

export const addNewContact = (req, res) => {
    console.log('addnewcontact called')
    newContact(req.body)
        .then(result => res.json(result))
        .catch(err => console.log(err))
}

export const editSingleContact = (req, res) => {
    console.log('edit single contact called')
    const params = req.params.id
    const searchId = ObjectID(params)
    const id = { "_id": searchId }
    const singleContact = req.body
    editContact(id, singleContact)
        .then(result => res.json(result))
        .catch(err => console.log(err))
}

export const deleteSingleContact = (req, res) => {
    console.log('delete single contact called')
    const params = req.params.id
    const searchId = ObjectID(params)
    const id = { "_id": searchId }
    deleteContact(id)
        .then(result => res.json(result))
        .catch(err => console.log(err))
}