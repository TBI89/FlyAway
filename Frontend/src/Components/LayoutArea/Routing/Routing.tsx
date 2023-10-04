import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../../AuthArea/Login/Login';
import Register from '../../AuthArea/Register/Register';
import Home from '../../HomeArea/Home/Home';
import AddVacation from '../../VacationsArea/AddVacation/AddVacation';
import UpdateVacation from '../../VacationsArea/UpdateVacation/UpdateVacation';
import VacationList from '../../VacationsArea/VacationList/VacationList';
import VacationListAdmin from '../../VacationsArea/VacationListAdmin/VacationListAdmin';
import PageNotFound from '../PageNotFound/PageNotFound';
import VacationReports from '../../VacationsArea/VacationReports/VacationReports';

function Routing(): JSX.Element {

    return (

        <Routes>

            {/* Shard routes: */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />

            {/* User only route: */}
            <Route path="/vacations" element={<VacationList />} />

            {/* Admin only routes: */}
            <Route path="/vacations-admin" element={<VacationListAdmin />} />
            <Route path="/vacations/add" element={<AddVacation />} />
            <Route path="/vacations/update/:vacationId" element={<UpdateVacation />} />
            <Route path="/vacation-reports" element={<VacationReports />} />

        </Routes>
    );
}

export default Routing;
