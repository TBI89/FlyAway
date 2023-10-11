import "./Home.css";
import homePageMainImage1 from "../../../Assets/Images/home-page-main-image.jpg";
import homePageMainImage2 from "../../../Assets/Images/home-page-main-image-2.jpeg"
import { NavLink } from "react-router-dom";
import useTitle from "../../../Utils/UseTitle";
import { useEffect, useState } from "react";
import Spinner from "../../SharedArea/Spinner/Spinner";
// @ts-ignore
import localVideoPath from "../../../Assets/Videos/home-page-video.mp4";

function Home(): JSX.Element {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        }
    }, []);

    // Tab title:
    useTitle("Fly Away | Home");

    // const imageToShow = Math.floor(Math.random() * 2) + 1;

    return (
        <div className="Home">
            {/* Until the component mounts- display the spinner: */}
            {!isMounted && <Spinner />}

            {/* No need to add a separate link to the Admin's list component - he will automatically be redirected there */}
            {/* Because we are checking the users role on the VacationList component. */}
            <NavLink className="NavLinkInHomePage" to={"/vacations"}>Vacations</NavLink>
            <br /><br />

            <video autoPlay loop muted className="BackgroundVideo">
                <source src={localVideoPath} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

        </div>
    );
}

export default Home;
