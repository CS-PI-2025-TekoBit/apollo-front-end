import { Routes, Route } from 'react-router';
import PageNotFound from '../PageNotFound/PageNotFound';
import Editar from '../../pages/private/Editar/Editar';

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/myAccount" element={<Editar />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default UserRoutes;



