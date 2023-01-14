import { Link } from "react-router-dom";
import "./Contact.css"

const Contact = ({ contact }) => {

    return (
        <Link to={`/contact/${contact?._id}`} className="contactDivLink">
            <article className="contactDiv">
                <div className="contactDivLeft">
                    <p>{contact?.name}</p>
                    <p>{contact?.last}</p>
                </div>
                <p className="contactJob">{contact?.job}</p>
            </article>
        </Link>

    );
}

export default Contact;