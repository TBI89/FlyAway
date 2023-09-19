import React, { useEffect, useState } from "react";
import "./VacationList.css";
import VacationsModel from "../../../Models/VacationsModel";
import vacationsService from "../../../Services/VacationsService"; // Corrected import path
import notifyService from "../../../Services/NotifyService";
import VacationCard from "../VacationCard/VacationCard";

function VacationList(): JSX.Element {

    // States for vacation data & tracking page number:
    const [vacations, setVacations] = useState<VacationsModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const vacationsPerPage = 9;

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
        <div className="VacationList">

            {/* Render vacation cards for the current page: */}
            {currentVacations.map(v => (
                <VacationCard key={v.vacationId} vacation={v} />
            ))}

            {/* Pagination section */}
            <div className="pagination">
                {/* Generate pagination buttons */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`PaginationButton ${currentPage === index + 1 ? "active" : ""}`}>
                        {/* Display the page number on each button */}
                        {index + 1}
                    </button>
                ))}
            </div>

        </div>
    );
}

export default VacationList;
