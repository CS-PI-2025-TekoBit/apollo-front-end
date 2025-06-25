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
import BodyWork from '../../pages/private/BodyWork/BodyWork';
import BodyWorkRegister from '../../pages/private/BodyWork/BodyWorkRegister';

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
            <Route path="bodywork" element={<BodyWork />} />
            <Route path="bodywork/register" element={<BodyWorkRegister />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default AdminRoutes;


        
