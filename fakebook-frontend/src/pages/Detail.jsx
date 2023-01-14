import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Detail.css"

const Detail = ({ refresh, setRefresh }) => {
    const params = useParams()
    const [singleContact, setSingleContact] = useState([])
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const [deleteFailed, setDeleteFailed] = useState(false)
    const [deletePending, setDeletePending] = useState(false)

    const deleteContact = () => {
        console.log('delete')
        setDeletePending(true)
        fetch(`${process.env.REACT_APP_BACKENDURL}/api/fakebook/profile/${params.id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setRefresh(!refresh)
                    setDeleteSuccess(true)
                    setDeletePending(false)

                } else {
                    setDeleteFailed(true)
                    setDeletePending(false)
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKENDURL}/api/fakebook/profile/${params.id}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setSingleContact(data)
            })
            .catch(err => console.log(err))
    }, [params.id])

    return (
        <main className="detailMain">
            <section className={deleteSuccess ? "singleContact singleSuccess" : "singleContact"}>
                <p>{singleContact[0]?.name}</p>
                <p>{singleContact[0]?.last}</p>
                <p>{singleContact[0]?.dob}</p>
                <p>{singleContact[0]?.cell}</p>
                <p>{singleContact[0]?.email}</p>
                <p>{singleContact[0]?.job}</p>
                <p>{singleContact[0]?.salary}</p>
                <p>{singleContact[0]?.freelance ? 'freelancer' : 'employee'}</p>
                <p>{singleContact[0]?.existing ? 'existing contact' : 'potential contact'}</p>
                <section className="detailButtonSection">
                    <button onClick={deleteContact}>delete contact</button>
                    <Link to={`/edit/${params.id}`} className="editContactButton">edit contact</Link>
                </section>
                {deletePending &&
                    <p>Your request is processing. Thanks for your patience with our server!</p>
                }
            </section>
            {deleteSuccess &&
                <section className="deleteSuccessSection">
                    <p>Thanks for updating your contacts list!</p>
                    <Link to="/" >Home</Link>
                </section>}
            {deleteFailed &&
                <section className="deleteFailSection">
                    <p>Sorry, something went wrong with your request.</p>
                    <Link to="/" >Home</Link>
                </section>
            }
        </main>
    );
}

export default Detail;