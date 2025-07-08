import React from 'react';
import { Routes, Route } from 'react-router';
import Cars from '../../pages/private/Cars/Cars';
import PageNotFound from '../PageNotFound/PageNotFound';
import Motors from '../../pages/private/Motors/Motors';
import MotorsRegister from '../../pages/private/Motors/MotorsRegister';
import Colors from '../../pages/private/Colors/Colors';
import ColorsRegister from '../../pages/private/Colors/ColorsRegister';
import Fuel from '../../pages/private/Fuel/Fuel';
import FuelRegister from '../../pages/private/Fuel/FuelRegister';
import Steering from '../../pages/private/Steering/Steering';
import SteeringRegister from '../../pages/private/Steering/SteeringRegister';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="cars" element={<Cars />} />
            <Route path="motors" element={<Motors />} />
            <Route path="motors/register" element={<MotorsRegister />} />
            <Route path="colors" element={<Colors />} />
            <Route path="colors/register" element={<ColorsRegister />} />
            <Route path="fuel" element={<Fuel />} />
            <Route path="fuel/register" element={<FuelRegister />} />
            <Route path="steering" element={<Steering />} />
            <Route path="steering/register" element={<SteeringRegister />} />
            <Route path="*" element={<PageNotFound />} />'
        </Routes>
    );
};

export default AdminRoutes;


        
