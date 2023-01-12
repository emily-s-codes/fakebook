import { useState } from "react";
import "./Add.css"

const Add = ({ refresh, setRefresh }) => {
    const [name, setName] = useState('')
    const [last, setLast] = useState('')
    const [dob, setDob] = useState('')
    const [cell, setCell] = useState('')
    const [email, setEmail] = useState('')
    const [job, setJob] = useState('')
    const [salary, setSalary] = useState('')
    const [freelance, setFreelance] = useState(false)
    const [customer, setCustomer] = useState(false)

    const handleFreelancer = (e) => {
        setFreelance(e.target.value)
    }
    const handleCustomer = (e) => {
        setCustomer(e.target.value)
    }

    const submitForm = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)

        fetch('http://localhost:9999/api/fakebook/add', {
            method: 'POST',
            body: form,
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(response => {
                if (response.ok) setRefresh(!refresh)
            })
    }

    return (
        <main className="addMain">
            <form onSubmit={submitForm} >
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
                <input type="submit" value="add" />

            </form>
        </main>
    );
}

export default Add;

