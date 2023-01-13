import { getDb } from "../util/db.js"

const COL = 'contacts'

export const allContacts = () => {
    console.log('allContacts called')
    return new Promise((_, reject) => {
        getDb()
            .then(db => db.collection(COL).find())
            .then(pointer => pointer.toArray())
            .then(data => console.log(data))
            .catch(err => reject(err))
    })

}

export const singleContact = (id) => {
    return new Promise((resolve, reject) => {
        getDb()
            .then(db => db.collection(COL).find(id))
            .then(cursor => cursor.toArray())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

export const newContact = (contact) => {
    console.log('newcontact called')
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    return new Promise((resolve, reject) => {
        getDb()
            .then(db => {
                console.log('logging new contact')
                return db.collection(COL).insertOne(contact)
            })
            .then(acknowledge => resolve().status(200).json(acknowledge))
            .catch(err => reject(err))
    })

    // }
}

export const editContact = (id, singleContact) => {
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    return new Promise((resolve, reject) => {
        getDb()
            .then(db => {
                console.log('edit contact called')
                return db.collection(COL)
                    .updateOne(id,
                        { $set: singleContact })
            })
            .then(acknowledge => resolve().status(200).json(acknowledge))
            .catch(err => reject(err))
    })

    // }
}

export const deleteContact = (id) => {
    return new Promise((resolve, reject) => {
        getDb()
            .then(db => db.collection(COL).deleteOne(id))
            .then(data => resolve().status(200).json(data))
            .catch(err => reject(err))
    })
}