import "./Spinner.css";
import spinnerImage from "../../../Assets/Images/spinner.gif";

function Spinner(): JSX.Element {
    return (
        <div className="Spinner">
            <img src={spinnerImage} />
        </div>
    );
}

export default Spinner;
