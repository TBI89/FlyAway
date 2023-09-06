import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";
import imageSource from "../../../Assets/Images/header.jpeg";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <h1>Fly Away To Your Next Vacation!</h1>
            <img src={imageSource} />
            <AuthMenu />
        </div>
    );
}

export default Header;
