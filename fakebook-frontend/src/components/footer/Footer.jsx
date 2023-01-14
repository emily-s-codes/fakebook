import { NavLink } from "react-router-dom";
import "./Footer.css"

const Footer = () => {
    return (
        <footer>
            <ul>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/new"}>Add Contact</NavLink>
            </ul>
        </footer>
    );
}

export default Footer;