import React from 'react';
import { Routes, Route } from 'react-router';
import Cars from '../../pages/private/Cars/Cars';
import PageNotFound from '../PageNotFound/PageNotFound';
import Motors from '../../pages/private/Motors/Motors';
import MotorsRegister from '../../pages/private/Motors/MotorsRegister';
const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="cars" element={<Cars />} />
            <Route path="motors" element={<Motors />} />
            <Route path="motors/register" element={<MotorsRegister />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default AdminRoutes;