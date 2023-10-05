import "./Home.css";
import homePageMainImage1 from "../../../Assets/Images/home-page-main-image.jpg";
import homePageMainImage2 from "../../../Assets/Images/home-page-main-image-2.jpeg"
import { NavLink } from "react-router-dom";

function Home(): JSX.Element {

    const imageToShow = Math.floor(Math.random() * 2) + 1;

    return (
        <div className="Home">
            {/* No need to add a separate link to the Admin's list component - he will automatically be redirected there */}
            {/* Because we are checking the users role on the VacationList component. */}
            <NavLink className="NavLinkInHomePage" to={"/vacations"}>Vacations</NavLink>
            <br /><br />
            {imageToShow === 1 && <img src={homePageMainImage1} />}
            {imageToShow === 2 && <img src={homePageMainImage2} />}
        </div>
    );
}

export default Home;
