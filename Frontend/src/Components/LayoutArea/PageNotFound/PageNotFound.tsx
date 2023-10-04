import "./PageNotFound.css";
import imageSource from "../../../Assets/Images/page-not-found.png";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <img className="PageNotFoundImage" src={imageSource} />
        </div>
    );
}

export default PageNotFound;
