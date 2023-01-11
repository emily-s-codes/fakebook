import { NavLink } from "react-router-dom";
import "./Nav.css"

const Nav = () => {
    return (<header>
        <h1>Fakebook</h1>
        <ul>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/contact/new"}>Add Contact</NavLink>
        </ul>
    </header>);
}

export default Nav;