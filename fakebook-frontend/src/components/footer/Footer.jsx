import { NavLink, useNavigate } from "react-router-dom";
import "./Footer.css"
import { GrHomeRounded, GrAdd } from 'react-icons/gr'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const Footer = () => {
    const navigate = useNavigate()

    return (
        <footer>
            <ul className="footerUL">
                <NavLink onClick={() => navigate(-1)}><BsArrowLeft size="20" /></NavLink>
                <NavLink to={"/"}><GrHomeRounded size="20" /></NavLink>
                <NavLink to={"/new"}><GrAdd size="20" /></NavLink>
            </ul>
        </footer >
    );
}

export default Footer;