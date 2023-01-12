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
                } else setFailure(true)
            })
    }

    const resetPage = () => {
        setSuccess(false)
        setFailure(false)
        setPending(false)
    }

    return (
        <main className="addMain">
            <form onSubmit={submitForm} className={success ? "success" : ""}>
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
                    <input type="radio" name="freelance" placeholder="freelance" id="freelanceY" value="true" /><label for="freelanceY">Yes</label>
                    <input type="radio" name="freelance" placeholder="freelance" id="freelanceN" value="false" defaultChecked /><label for="freelanceN">No</label>
                </div>
                <div>
                    <p>Contact?</p>
                    <input type="radio" name="contact" id="new" value="false" defaultChecked /><label for="new">New</label>
                    <input type="radio" name="contact" id="existing" value="true" /><label for="existing">Existing</label>
                </div>
                <input type="submit" value="add" onClick={() => setPending(!pending)} />
            </form>
            {success &&
                <section className="successSection">
                    <p>Thanks for updating your contacts list!</p>
                    <Link to="/new" onClick={resetPage}>Add another new contact</Link>
                </section>}
            {failure &&
                <section className="successSection">
                    <p>Sorry, something went wrong with your request.</p>
                    <Link to="/new" onClick={resetPage}>Please try to add your contact again</Link>
                </section>
            }
        </main>
    );
}

export default Add;

