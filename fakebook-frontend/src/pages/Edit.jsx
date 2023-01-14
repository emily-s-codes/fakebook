import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Button from "../components/button/Button"
import "./Edit.css"

const Edit = ({ contacts, refresh, setRefresh }) => {
    const params = useParams()
    const [editSuccess, setEditSuccess] = useState(false)
    const [editPending, setEditPending] = useState(false)
    const [editFailure, setEditFailure] = useState(false)
    const [editContact, setEditContact] = useState([])
    const [currentContactState, setCurrentContactState] = useState("")

    console.log(currentContactState?.existing)

    useEffect(() => {
        const currentContact = contacts.filter(contact => contact._id === params.id)[0]
        console.log(currentContact)
        setCurrentContactState(currentContact)
    }, [contacts])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKENDURL}/api/fakebook/profile/${params.id}`)
            .then(res => {
                console.log(res)
                return res.json()
            })
            .then(data => {
                setEditContact(data[0])
            })
            .catch(err => console.log(err))
    }, [refresh])

    const editAgain = () => {

    }

    const submitUpdate = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)

        fetch(`${process.env.REACT_APP_BACKENDURL}/api/fakebook/profile/${params.id}`, {
            method: 'PUT',
            body: form
        })
            .then(response => {
                if (response.ok) {
                    setRefresh(!refresh)
                    setEditSuccess(!editSuccess)
                    setEditPending(false)

                } else {
                    setEditFailure(true)
                    setEditPending(false)
                }
            })
    }

    return (
        <main className="editMain">
            <section className="mainForm">
                <form onSubmit={submitUpdate} className={editSuccess ? "success" : ""}>
                    <input type="text" placeholder="first name"
                        name="name" maxLength="20" defaultValue={currentContactState?.name} />
                    <input type="text" placeholder="last name"
                        name="last" maxLength="100" defaultValue={currentContactState?.last} />
                    <input type="text" placeholder="MM-DD-YYYY" name="dob" defaultValue={currentContactState?.dob} />
                    <input type="number" placeholder="cell number" name="cell" defaultValue={currentContactState?.cell} />
                    <input type="email" placeholder="email address" name="email" defaultValue={currentContactState?.email} />
                    <input type="text" placeholder="job title" name="job" defaultValue={currentContactState?.job} />
                    <div>
                        <input type="number" placeholder="annual salary in euro" name="salary" defaultValue={currentContactState?.salary} /><span> €</span>
                    </div>
                    <div>
                        <p>Freelancer?</p>
                        <input type="radio" name="freelance" placeholder="freelance" id="freelanceY" value="true" defaultChecked={currentContactState?.freelance ? true : false} /><label htmlFor="freelanceY">Yes</label>
                        <input type="radio" name="freelance" placeholder="freelance" id="freelanceN" value="false" defaultChecked={currentContactState?.freelance ? false : true} /><label htmlFor="freelanceN">No</label>
                    </div>
                    <div>
                        <p>Contact?</p>
                        <input type="radio" name="contact" id="new" value="false" defaultChecked={(currentContactState?.existing === true) ? false : true} /><label htmlFor="new">New</label>
                        <input type="radio" name="contact" id="existing" value="true" defaultChecked={(currentContactState?.existing === true) ? true : false} /><label htmlFor="existing">Existing</label>
                    </div>
                    <input type="submit" value="edit" onClick={() => setEditPending(!editPending)} />
                </form>
                {editSuccess &&
                    <section className="editSuccessSection">
                        <p>Thanks for updating your contacts list!</p>
                        <Link to="/" >Home</Link>
                        <p onClick={() => window.location.reload()}>Edit Again</p>
                    </section>}
                {editFailure &&
                    <section className="editFailSection">
                        <p>Sorry, something went wrong with your request.</p>
                        <Link to="/" >Home</Link>
                    </section>
                }
            </section>
            {editSuccess &&
                <section className="newContactInfo">
                    <h2>Updated Contact Info</h2>
                    <p>First Name: {editContact?.name}</p>
                    <p>Last Name: {editContact?.last}</p>
                    <p>Date of Birth: {editContact?.dob}</p>
                    <p>Cell: {editContact?.cell}</p>
                    <p>Email: {editContact?.email}</p>
                    <p>Job: {editContact?.job}</p>
                    <p>Salary: {editContact?.salary}</p>
                    {editContact?.freelance ? <p>Employment type: freelancer</p> : <p>Employment type: employee</p>}
                    {editContact?.contact ? <p>Existing contact</p> : <p>New contact</p>}
                </section>}
        </main>
    );
}

export default Edit;