import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "./Edit.css"

const Edit = ({ refresh, setRefresh }) => {
    const [editSuccess, setEditSuccess] = useState(false)
    const [editPending, setEditPending] = useState(false)
    const [editFailure, setEditFailure] = useState(false)
    const [editContact, setEditContact] = useState([])
    const params = useParams()
    console.log(params)

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
    }, [params.id])

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
        <main className="addMain">
            <section className="mainLeft">
                <form onSubmit={submitUpdate} className={editSuccess ? "success" : ""}>
                    <input type="text" placeholder="first name"
                        name="name" maxLength="20" />
                    <input type="text" placeholder="last name"
                        name="last" maxLength="100" />
                    <input type="text" placeholder="MM-DD-YYYY" name="dob" />
                    <input type="number" placeholder="cell number" name="cell" />
                    <input type="email" placeholder="email address" name="email" />
                    <input type="text" placeholder="job title" name="job" />
                    <div>
                        <input type="number" placeholder="annual salary in euro" name="salary" /><span> €</span>
                    </div>
                    <div>
                        <p>Freelancer?</p>
                        <input type="radio" name="freelance" placeholder="freelance" id="freelanceY" value="true" /><label htmlFor="freelanceY">Yes</label>
                        <input type="radio" name="freelance" placeholder="freelance" id="freelanceN" value="false" defaultChecked /><label htmlFor="freelanceN">No</label>
                    </div>
                    <div>
                        <p>Contact?</p>
                        <input type="radio" name="contact" id="new" value="false" defaultChecked /><label htmlFor="new">New</label>
                        <input type="radio" name="contact" id="existing" value="true" /><label htmlFor="existing">Existing</label>
                    </div>
                    <input type="submit" value="edit" onClick={() => setEditPending(!editPending)} />
                </form>
                {editSuccess &&
                    <section className="editSuccessSection">
                        <p>Thanks for updating your contacts list!</p>
                        <Link to="/" >Home</Link>
                    </section>}
                {editFailure &&
                    <section className="editFailSection">
                        <p>Sorry, something went wrong with your request.</p>
                        <Link to="/" >Home</Link>
                    </section>
                }
            </section>
            <section className="mainRight">
                <h2>Previous Contact Info</h2>
                <p>First Name: {editContact?.name}</p>
                <p>Last Name: {editContact?.last}</p>
                <p>Date of Birth: {editContact?.dob}</p>
                <p>Cell: {editContact?.cell}</p>
                <p>Email: {editContact?.email}</p>
                <p>Job: {editContact?.job}</p>
                <p>Salary: {editContact?.salary}</p>
                {editContact?.freelance ? <p>Employment type: freelancer</p> : <p>Employment type: employee</p>}
                {editContact?.contact ? <p>Existing contact</p> : <p>New contact</p>}
            </section>
        </main>
    );
}

export default Edit;