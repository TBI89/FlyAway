import { useEffect, useState } from "react";
import "./VacationList.css";
import VacationsModel from "../../../Models/VacationsModel";
import vacationsService from "../../../Services/VcationsService";
import notifyService from "../../../Services/NotifyService";
import VacationCard from "../VacationCard/VacationCard";

function VacationList(): JSX.Element {

    // Create state:
    const [vacations, setVacations] = useState<VacationsModel[]>([]);

    // Go to backend once:
    useEffect(() => {
        vacationsService.getAllVacations()
        .then(vacations => setVacations(vacations))
        .catch(err => notifyService.error(err));
    }, []);

    return (
        <div className="VacationList">
           {vacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
        </div>
    );
}

export default VacationList;
