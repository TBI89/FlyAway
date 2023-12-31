import { useEffect, useState } from "react";
import VacationsModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService"; // Corrected import path
import "./VacationListAdmin.css";
import VacationCardAdmin from "../VacationCardAdmin/VacationCardAdmin";
import { AddCircle, BarChart } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import useTitle from "../../../Utils/UseTitle";
import Spinner from "../../SharedArea/Spinner/Spinner";

function VacationListAdmin(): JSX.Element {

    // Tab title:
    useTitle("Fly Away | Vacations - Admin");

    // States for vacation data & page number:
    const [vacations, setVacations] = useState<VacationsModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const vacationsPerPage = 9; // Max number of cards displayed per page.
    const navigate = useNavigate(); // Used to navigate unauthorized users from the component.

    // Go to the backend once:
    useEffect(() => {

        // Check if there's a logged in user:
        const token = authStore.getState().token;
        if (!token) {
            notifyService.error("Please login first.");
            navigate("/login"); // If not, inform + redirect to login page.
            return;
        }

        const role = authStore.getState().user.roleId; // Get the user's role.
        if (role === 2) { // if he isn't an admin, notify him + navigate home.
            navigate("/vacations");
        }
        // else: allow assess.

        const userId = authStore.getState().user.userId;
        vacationsService
            .getAllVacations(userId)
            .then(vacations => setVacations(vacations))
            .catch(err => notifyService.error(err));
    }, []);

    // Calculate the total number of pages:
    const totalPages = Math.ceil(vacations.length / vacationsPerPage);

    // Handling page navigation:
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Divide vacations into pages:
    const indexOfLastVacation = currentPage * vacationsPerPage;
    const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
    const currentVacations = vacations.slice(indexOfFirstVacation, indexOfLastVacation);

    async function removeVacation(idToRemove: number): Promise<void> {
        try {
            await vacationsService.deleteVacation(idToRemove);
            setVacations(prevVacations => prevVacations.filter(v => v.vacationId !== idToRemove));
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="VacationListAdmin">

              {/* Display a spinner until the vacations displayed: */}
              {vacations.length === 0 && <Spinner />}

            <div>
                <NavLink className="AddLink" to={"/vacations/add"}><AddCircle fontSize="large" /></NavLink>
                <NavLink className="BarChartLink" to={"/vacation-reports"}><BarChart fontSize="large" /></NavLink>
            </div>

            {/* Render vacation cards for the current page: */}
            {currentVacations.map(v => (<VacationCardAdmin key={v.vacationId} vacation={v} removeVacation={removeVacation} />))}

            <div className="Pagination">

                {/* Generate pagination buttons */}
                {currentVacations.length > vacationsPerPage
                    ? null
                    : Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`PaginationButton ${currentPage === index + 1 ? "active" : ""}`}
                        >
                            {/* Display the page number on each button */}
                            {index + 1}
                        </button>
                    ))}
            </div>

        </div>
    );
}

export default VacationListAdmin;
