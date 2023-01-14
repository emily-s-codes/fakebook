import { Link } from "react-router-dom";
import "./Nav.css"

const Nav = () => {
    return (<header>
        <Link to="/">
            <h1>Fakebook</h1>
        </Link>
    </header>);
}

export default Nav;