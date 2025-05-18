import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrivateRoute } from './components/PrivateRoutes/PrivateRoutes';
import AuthContextProvider from './context/AuthContex';
import { ToastContainer } from 'react-toastify';

import Login from './pages/public/Login/Login';
import Cars from './pages/private/Cars/Cars';
import Home from './pages/public/Home/Home';
import CarDetail from './pages/public/CarDetail/CarDetail';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const client = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <QueryClientProvider client={client}>
          <Routes>
            {/* <Route path="/" element={<Home />} />
           */}
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path='/carros/:id' element={<CarDetail />} />
            <Route element={<PrivateRoute allowedRoles={['ROLE_ADMIN']} />}>
              <Route path="/cars" element={<Cars />} />
            </Route>
          </Routes>
        </QueryClientProvider>
        <ToastContainer />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);