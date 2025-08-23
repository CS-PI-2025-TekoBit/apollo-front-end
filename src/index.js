import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/public/Home/Home';
import CarDetail from './pages/public/CarDetail/CarDetail';

import './index.css';
import './flag.css'
import './primereact-override.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrivateRoute } from './components/PrivateRoutes/PrivateRoutes';
import Login from './pages/public/Login/Login';
import Register from './pages/public/Register/Register';
import AuthContextProvider from './context/AuthContex';
import { ToastContainer } from 'react-toastify';

import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/mdc-light-indigo/theme.css'


import { AdminLayout } from './components/AdminLayout/AdminLayout';
import AdminRoutes from './components/AdminRoutes/AdminRoutes';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const client = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <BrowserRouter>
        <Provider store={store}>
          <AuthContextProvider>
            <QueryClientProvider client={client}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path='/carros/:id' element={<CarDetail />} />
                <Route element={<PrivateRoute allowedRoles={['ROLE_ADMIN']} />}>
                  <Route path="/admin/*" element={<AdminLayout />}>
                    <Route path="*" element={<AdminRoutes />} />
                  </Route>
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </QueryClientProvider>
            <ToastContainer />
          </AuthContextProvider>
        </Provider>
      </BrowserRouter>
    </PrimeReactProvider>
  </React.StrictMode>
);