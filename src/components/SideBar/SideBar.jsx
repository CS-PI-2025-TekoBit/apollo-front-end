import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import logo from '../../assets/imgs/logomarca.png';
import Swal from 'sweetalert2';
import './SideBar.css';

import { Car, Gear, CaretDoubleRight, CaretDoubleLeft, SignOut, SteeringWheel, CarProfile, Palette, Engine, Speedometer } from '@phosphor-icons/react';
import { ListBullets } from '@phosphor-icons/react/dist/ssr';
import { Fuel } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
export default function AppSidebar({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const { user, logout } = useAuth()
    const location = useLocation();
    const navigateTo = useNavigate()
    const navigate = (path) => {
        navigateTo(`/admin${path}`)
    };

    const isActive = (path) => location.pathname.includes(path);

    const menuItems = [
        { label: collapsed ? '' : `Olá, ${user?.name.split(' ')[0]}`, icon: <Speedometer weight='fill' size={collapsed ? 27 : 25} color={isActive('/admin/dashboard') ? "#155633" : "white"} />, className: 'text-white', command: () => navigate('/dashboard') },
        { label: collapsed ? '' : 'Carros', icon: <CarProfile weight='fill' size={collapsed ? 27 : 25} color={isActive('/admin/cars') ? "#155633" : "white"} />, className: 'text-white', command: () => navigate('/cars') },
        { label: collapsed ? '' : 'Cores', icon: <Palette weight='fill' size={collapsed ? 25 : 25} color={isActive('/admin/colors') ? "#155633" : "white"} />, className: 'text-white', command: () => navigate('/colors') },
        { label: collapsed ? '' : 'Motores', icon: <Engine weight='fill' size={collapsed ? 25 : 25} color={isActive('/admin/motors') ? "#155633" : "white"} />, className: 'text-white', command: () => navigate('/motors') },
        { label: collapsed ? '' : 'Combustíveis', icon: <Fuel weight='fill' size={collapsed ? 25 : 25} color={isActive('/admin/fuel') ? "#155633" : "white"} />, className: 'text-white', command: () => navigate('/fuel') },
        { label: collapsed ? '' : 'Carrocerias', icon: <Car weight='fill' size={collapsed ? 25 : 25} color={isActive('/admin/bodywork') ? "#155633" : "white"} />, className: 'text-white', command: () => navigate('/bodywork') },
        { label: collapsed ? '' : 'Transmissões', icon: <Gear weight='fill' size={collapsed ? 25 : 25} color={isActive('/admin/transmission') ? "#155633" : "white"} />, className: 'text-white', command: () => navigate('/transmission') },
        { label: collapsed ? '' : 'Direções', icon: <SteeringWheel weight='fill' size={collapsed ? 25 : 25} color={isActive('/admin/steering') ? "#155633" : "white"} />, className: 'text-white', command: () => navigate('/steering') },
    ];
    const handleLogout = () => {
        Swal.fire({
            title: 'Sair da conta',
            text: 'Tem certeza que deseja sair?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sair',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                logout()
            }
        })
    }
    return (
        <div >
            <Sidebar
                showCloseIcon={false}
                visible={true}
                onHide={() => { }}
                className='main-content'
                style={{
                    width: collapsed ? '60px' : '15rem',
                    transition: 'width 0.3s',
                    zIndex: 1,
                    pointerEvents: 'auto',
                }}
            >
                <div className="content-sidebar">
                    <div className="header-sidebar">
                        <img src={logo} alt="Logomarca Apolo" className={`img-logo-side-bar ${collapsed ? 'hidden' : ''}`} />
                        <Button
                            icon={collapsed ? <CaretDoubleRight size={20} /> : <CaretDoubleLeft size={20} />}
                            onClick={() => setCollapsed(!collapsed)}
                            className="toggle-button"
                            style={{ color: '#ffffff' }}
                        />
                        <Button
                            icon={<ListBullets size={20} />}
                            iconPos="center"
                            label={collapsed ? "" : 'Ver estoque'}
                            onClick={() => setCollapsed(!collapsed)}
                            className={`text-white button-header ${collapsed ? 'w-full' : 'w-10rem'}`}
                            style={{ backgroundColor: 'transparent', padding: '0.5rem' }}
                        />
                    </div>

                    <div className="overflow-y-auto flex-1 menu-container">
                        <Menu
                            model={menuItems}
                            className="w-full border-none bg-transparent"
                            style={{ backgroundColor: 'transparent' }}
                        />
                    </div>

                    <div className="footer-sidebar">
                        <Button
                            label={collapsed ? '' : 'Sair'}
                            icon={<SignOut size={25} />}
                            iconPos="left"
                            onClick={() => handleLogout()}
                            className="p-button-text w-full text-white logout-button"
                            style={{ backgroundColor: 'transparent', padding: '0.5rem' }}
                        />
                        {/* <div className="settings-icon" style={{ textAlign: 'center', padding: '0.5rem' }}>
                            <Gear size={20} style={{ color: '#ffffff' }} />
                        </div> */}
                    </div>
                </div>
            </Sidebar>
            <div
                className="main-content"
                style={{
                    marginLeft: collapsed ? '60px' : '15rem',
                    transition: 'margin-left 0.3s',
                    width: `auto`,

                }}
            >
                {children}
            </div>
        </div>
    );
}