import { useState } from "react"
import { Link } from "react-router-dom"
import "./Add.css"

const Add = ({ refresh, setRefresh }) => {
    const [success, setSuccess] = useState(false)
    const [pending, setPending] = useState(false)
    const [failure, setFailure] = useState(false)

    const submitForm = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)

        fetch(`${process.env.REACT_APP_BACKENDURL}/api/fakebook/add`, {
            method: 'POST',
            body: form
        })
            .then(response => {
                if (response.ok) {
                    setRefresh(!refresh)
                    setSuccess(!success)
                    setPending(false)

                } else {
                    setFailure(true)
                    setPending(false)
                }
            })
    }

    const resetForm = () => {
        setSuccess(false)
        setFailure(false)
        setPending(false)
    }

    return (
        <main className="addMain">
            <h2>New Contact</h2>
            <form onSubmit={submitForm} className={success ? "success" : ""}>
                <input type="text" placeholder="first name"
                    name="name" maxLength="20" />
                <input type="text" placeholder="last name"
                    name="last" maxLength="100" />
                <input type="text" placeholder="MM-DD-YYYY" name="dob" />
                <input type="number" placeholder=" number" name="phone" />
                <input type="email" placeholder="email address" name="email" />
                <input type="text" placeholder="job title" name="job" />
                <div>
                    <input type="number" placeholder="annual salary" name="salary" /><span> €</span>
                </div>
                <div className="addRadioDiv">
                    <p>Freelancer?</p>
                    <input type="radio" name="freelance" placeholder="freelance" id="freelanceY" value="true" /><label htmlFor="freelanceY">Yes</label>
                    <input type="radio" name="freelance" placeholder="freelance" id="freelanceN" value="false" defaultChecked /><label htmlFor="freelanceN">No</label>
                </div>
                <div className="addRadioDiv">
                    <p>Contact?</p>
                    <input type="radio" name="contact" id="new" value="false" defaultChecked /><label htmlFor="new">New</label>
                    <input type="radio" name="contact" id="existing" value="true" /><label htmlFor="existing">Existing</label>
                </div>
                <input className="addSubmitInput" type="submit" value="add" onClick={() => setPending(!pending)} />
            </form>
            {success &&
                <section className="successSection">
                    <p>Thanks for updating your contacts list!</p>
                    <Link to="/new" onClick={resetForm}>Add another new contact</Link>
                </section>}
            {failure &&
                <section className="failSection">
                    <p>Sorry, something went wrong with your request.</p>
                    <Link to="/new" onClick={resetForm}>Please try to add your contact again</Link>
                </section>
            }
        </main>
    );
}

export default Add;

