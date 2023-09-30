import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import VacationList from "../../VacationsArea/VacationList/VacationList";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import VacationListAdmin from "../../VacationsArea/VacationListAdmin/VacationListAdmin";
import UpdateVacation from "../../VacationsArea/UpdateVacation/UpdateVacation";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/vacations" element={<VacationList />} />
            <Route path="/vacations-admin" element={<VacationListAdmin />} />
            <Route path="/vacations/add" element={<AddVacation />} />
            <Route path="/vacations/update/:vacationId" element={<UpdateVacation />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
