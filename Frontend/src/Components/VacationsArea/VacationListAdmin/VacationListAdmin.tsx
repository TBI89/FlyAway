import { useEffect, useState } from "react";
import VacationsModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService"; // Corrected import path
import "./VacationListAdmin.css";
import VacationCardAdmin from "../VacationCardAdmin/VacationCardAdmin";
import { AddCircle } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

function VacationListAdmin(): JSX.Element {

    // States for vacation data & page number:
    const [vacations, setVacations] = useState<VacationsModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const vacationsPerPage = 9; // Max number of cards displayed per page.

    // Go to the backend once:
    useEffect(() => {
        vacationsService
            .getAllVacations()
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

    return (
        <div className="VacationListAdmin">

            <NavLink className="AddLink" to={"/vacations/add"}><AddCircle fontSize="large" /></NavLink>

            {/* Render vacation cards for the current page: */}
            {currentVacations.map(v => (<VacationCardAdmin key={v.vacationId} vacation={v} />))}

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
