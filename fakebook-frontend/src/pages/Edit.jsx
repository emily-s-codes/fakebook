import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "./Edit.css"

const Edit = ({ contacts, refresh, setRefresh }) => {
    const params = useParams()
    const [editSuccess, setEditSuccess] = useState(false)
    const [editPending, setEditPending] = useState(false)
    const [editFailure, setEditFailure] = useState(false)
    const [editContact, setEditContact] = useState([])
    const [currentContactState, setCurrentContactState] = useState("")

    console.log(currentContactState)

    useEffect(() => {
        const currentContact = contacts.filter(contact => contact._id === params.id)[0]
        console.log(currentContact)
        setCurrentContactState(currentContact)
    }, [contacts, params.id])

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
    }, [refresh, params.id])

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
            <h2>Edit Contact</h2>
            <section className="mainForm">
                <form onSubmit={submitUpdate} className={editSuccess ? "success" : ""}>
                    <input type="text" placeholder="first name"
                        name="name" maxLength="20" defaultValue={currentContactState?.name} />
                    <input type="text" placeholder="last name"
                        name="last" maxLength="100" defaultValue={currentContactState?.last} />
                    <input type="text" placeholder="MM-DD-YYYY" name="dob" defaultValue={currentContactState?.dob} />
                    <input type="number" placeholder="phone number" name="phone" defaultValue={currentContactState?.phone} />
                    <input type="email" placeholder="email address" name="email" defaultValue={currentContactState?.email} />
                    <input type="text" placeholder="job title" name="job" defaultValue={currentContactState?.job} />
                    <div>
                        <input type="text" placeholder="annual salary" name="salary" defaultValue={currentContactState?.salary} /><span> €</span>
                    </div>
                    <div className="editRadioDiv">
                        <p>Freelancer?</p>
                        <input type="radio" name="freelance" placeholder="freelance" id="freelanceY" value="true" defaultChecked={currentContactState?.freelance ? true : false} /><label htmlFor="freelanceY">Yes</label>
                        <input type="radio" name="freelance" placeholder="freelance" id="freelanceN" value="false" defaultChecked={currentContactState?.freelance ? false : true} /><label htmlFor="freelanceN">No</label>
                    </div>
                    <div className="editRadioDiv">
                        <p>Contact?</p>
                        <input type="radio" name="contact" id="new" value="false" defaultChecked={(currentContactState?.existing === true) ? false : true} /><label htmlFor="new">New</label>
                        <input type="radio" name="contact" id="existing" value="true" defaultChecked={(currentContactState?.existing === true) ? true : false} /><label htmlFor="existing">Existing</label>
                    </div>
                    <input type="submit" value="submit" onClick={() => setEditPending(!editPending)} />
                </form>
                {editSuccess &&
                    <section className="editSuccessSection">
                        <p>Thanks for updating your contacts list!</p>
                        <Link to="/" className="editSubmitInput" >Home</Link>
                    </section>}
                {editFailure &&
                    <section className="editFailSection">
                        <p>Sorry, something went wrong with your request.</p>
                        <Link to="/" className="editSubmitInput">Home</Link>
                    </section>
                }
            </section>
            {editSuccess &&
                <section className="newContactInfo">
                    <h3>Updated Contact Info</h3>
                    <p>First Name: {editContact?.name}</p>
                    <p>Last Name: {editContact?.last}</p>
                    <p>Date of Birth: {editContact?.dob}</p>
                    <p>Phone: {editContact?.phone}</p>
                    <p>Email: {editContact?.email}</p>
                    <p>Job: {editContact?.job}</p>
                    <p>Salary: {editContact?.salary}</p>
                    {editContact?.freelance ? <p>Employment type: freelancer</p> : <p>Employment type: employee</p>}
                    {editContact?.contact ? <p>Existing contact</p> : <p>New contact</p>}
                    <p onClick={() => window.location.reload()} className="editSubmitInput">Edit Again</p>
                </section>}
        </main>
    );
}

export default Edit;