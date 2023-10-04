import { NavLink } from "react-router-dom";
import imageSource from "../../../Assets/Images/home-icon.jpeg";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {

    return (
        <div className="Header">
            <h1>Fly Away To Your Next Vacation!</h1>
            <NavLink to={"/home"}>< img width={75} src={imageSource} /></NavLink>
            <br /><br />
            <AuthMenu />
            <br />
        </div>
    );
}

export default Header;
