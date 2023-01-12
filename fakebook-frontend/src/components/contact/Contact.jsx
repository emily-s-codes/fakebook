import { Link } from "react-router-dom";
import "./Contact.css"

const Contact = ({ contact }) => {

    return (
        <Link to={`/contact/${contact?._id}`}>
            <article className="contactDiv">
                <p>{contact?.name}</p>
                <p>{contact?.last}</p>
                <p>{contact?.job}</p>

            </article>
        </Link>

    );
}

export default Contact;