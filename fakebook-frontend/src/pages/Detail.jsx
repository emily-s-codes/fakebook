import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.css"

const Detail = () => {
    const params = useParams()
    const [singleContact, setSingleContact] = useState([])
    const contact = singleContact[0]

    useEffect(() => {
        fetch(`http://localhost:9999/api/fakebook/${params.id}`)
            .then(res => {
                console.log(res)
                return res.json()
            })
            .then(data => {
                console.log(data)
                setSingleContact(data)
            })
            .catch(err => console.log(err))
    }, [params.id])

    return (
        <div>
            <p>{contact?.name}</p>
            <p>{contact?.last}</p>
            <p>{contact?.dob}</p>
            <p>{contact?.cell}</p>
            <p>{contact?.email}</p>
            <p>{contact?.job}</p>
            <p>{contact?.salary}</p>

            <p>{contact?.freelance ? 'freelancer' : 'employee'}</p>
            <p>{contact?.existing ? 'existing contact' : 'potential contact'}</p>
        </div>
    );
}

export default Detail;