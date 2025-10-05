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
import Steering from '../../pages/private/Steering/Steering';
import SteeringRegister from '../../pages/private/Steering/SteeringRegister';
import Transmission from '../../pages/private/Transmissions/Transmissions';
import TransmissionRegister from '../../pages/private/Transmissions/TransmissionRegister';
import CarRegister from '../../pages/private/Cars/CarsRegister';
import Dashboard from '../../pages/private/Dashboard/Dashboard';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="cars" element={<Cars />} />
            <Route path="motors" element={<Motors />} />
            <Route path="motors/register" element={<MotorsRegister />} />
            <Route path="colors" element={<Colors />} />
            <Route path="colors/register" element={<ColorsRegister />} />
            <Route path="fuel" element={<Fuel />} />
            <Route path="fuel/register" element={<FuelRegister />} />
            <Route path="bodywork" element={<BodyWork />} />
            <Route path="bodywork/register" element={<BodyWorkRegister />} />
            <Route path="transmission" element={<Transmission />} />
            <Route path="transmission/register" element={<TransmissionRegister />} />
            <Route path="steering" element={<Steering />} />
            <Route path="steering/register" element={<SteeringRegister />} />
            <Route path="/cars/register" element={<CarRegister />} />
            <Route path="/cars/edit/:id" element={<CarRegister />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default AdminRoutes;



