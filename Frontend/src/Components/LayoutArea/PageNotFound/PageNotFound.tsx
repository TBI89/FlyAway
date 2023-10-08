import "./PageNotFound.css";
import imageSource from "../../../Assets/Images/page-not-found.png";
import useTitle from "../../../Utils/UseTitle";

function PageNotFound(): JSX.Element {

    // Tab title:
    useTitle("Page Not Found");

    return (
        <div className="PageNotFound">
            <img className="PageNotFoundImage" src={imageSource} />
        </div>
    );
}

export default PageNotFound;
