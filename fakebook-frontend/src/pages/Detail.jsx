import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.css"

const Detail = () => {
    const params = useParams()
    const [singleContact, setSingleContact] = useState([])


    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKENDURL}/api/fakebook/profile/${params.id}`)
            .then(res => {
                console.log(res)
                return res.json()
            })
            .then(data => {
                console.log(data)
                setSingleContact(data)
                console.log(data.env)
            })
            .catch(err => console.log(err))
    }, [params.id])

    return (
        <div>
            <p>{singleContact[0]?.name}</p>
            <p>{singleContact[0]?.last}</p>
            <p>{singleContact[0]?.dob}</p>
            <p>{singleContact[0]?.cell}</p>
            <p>{singleContact[0]?.email}</p>
            <p>{singleContact[0]?.job}</p>
            <p>{singleContact[0]?.salary}</p>
            <p>{singleContact[0]?.freelance ? 'freelancer' : 'employee'}</p>
            <p>{singleContact[0]?.existing ? 'existing contact' : 'potential contact'}</p>
        </div>
    );
}

export default Detail;