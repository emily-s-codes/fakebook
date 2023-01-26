import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Detail.css"

const Detail = ({ refresh, setRefresh, loading }) => {
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
            {loading && <section>
                <p>Your contact is loading ...</p>
            </section>}
            <section className={deleteSuccess ? "singleContact singleSuccess" : "singleContact"}>
                <section className="contactDetails">
                    <div className="contactName">
                        <p>{singleContact[0]?.name}</p>
                        <p>{singleContact[0]?.last}</p>
                    </div>
                    <div className="contactRight">
                        <p>{singleContact[0]?.dob}</p>
                        <p>{singleContact[0]?.phone}</p>
                        <p>{singleContact[0]?.email}</p>
                        <p>{singleContact[0]?.job}, {singleContact[0]?.salary} € per annum</p>
                        <p>{singleContact[0]?.freelance ? 'freelancer' : 'employee'}</p>
                        <p>{singleContact[0]?.existing ? 'existing contact' : 'potential contact'}</p>
                    </div>
                </section>
                <section className="detailButtonSection">
                    <button onClick={deleteContact} className="editContactButton">delete</button>
                    <Link to={`/edit/${params.id}`} className="editContactButton">edit</Link>
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