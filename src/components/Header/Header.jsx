import React from 'react'
import './Header.css'
import logo from '../../assets/imgs/logomarca.png'
import { MagnifyingGlass, Phone, UserCircle, UserCircleGear, WhatsappLogo, Star, Clock } from '@phosphor-icons/react'
import { useAuth } from '../../hooks/useAuth'
import { Link, NavLink } from 'react-router'
import Swal from 'sweetalert2'

export default function Header() {
    const { user, logout } = useAuth()

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
            if (result.isConfirmed) logout()
        })
    }

    return (
        <>
            <div className="h-topbar">
                <div className="h-topbar-contacts">
                    <a className="h-topbar-item" href="tel:4434231214">
                        <Phone size={14} weight="regular" />
                        (44) 3423-1214
                    </a>
                    <span className="h-topbar-sep" />
                    <a
                        className="h-topbar-item h-topbar-item--whats"
                        href="https://wa.me/5544991535404?text=Olá, gostaria de mais informações sobre um veículo."
                        target="_blank"
                        rel="noreferrer"
                    >
                        <WhatsappLogo size={14} weight="fill" />
                        (44) 9 99153-5404
                    </a>
                    <a
                        className="h-topbar-item h-topbar-item--whats"
                        href="https://wa.me/55449999202840?text=Olá, gostaria de mais informações sobre um veículo."
                        target="_blank"
                        rel="noreferrer"
                    >
                        <WhatsappLogo size={14} weight="fill" />
                        (44) 9 9920-2840
                    </a>
                </div>
                <div className="h-topbar-hours">
                    <Clock size={13} weight="regular" />
                    Seg. a Sex., 8h30 às 18h30 &nbsp;|&nbsp; Sáb., 8h30 às 13h
                </div>
            </div>

            <header className="h-main">
                <NavLink to="/home" className="h-logo">
                    <img src={logo} alt="Apollo Veículos" className="h-logo-img" />
                </NavLink>

                <div className="h-search">
                    <MagnifyingGlass size={16} className="h-search-icon" weight="regular" />
                    <input
                        type="text"
                        placeholder="Buscar por marca, modelo, ano..."
                        className="h-search-input"
                    />
                </div>

                <div className="h-actions">
                    <Link to="/favoritos" className="h-action-btn">
                        <Star size={20} weight="regular" />
                        <span>Favoritos</span>
                    </Link>

                    {user ? (
                        <div className="h-dropdown">
                            <div className="h-dropdown-trigger">
                                <UserCircleGear size={20} weight="duotone" />
                                <span>{user.name}</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
                            </div>
                            <div className="h-dropdown-menu">
                                <Link to="/user/myAccount" className="h-dropdown-item">Minha conta</Link>
                                <Link to="/favoritos" className="h-dropdown-item">Favoritos</Link>
                                <button onClick={handleLogout} className="h-dropdown-item h-dropdown-item--danger">Sair da conta</button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/" className="h-login-btn">
                            <UserCircle size={18} weight="duotone" />
                            Entrar
                        </Link>
                    )}
                </div>
            </header>

            <nav className="h-nav">
                <div className="h-nav-links">
                    <NavLink to="/home" className={({ isActive }) => `h-nav-link${isActive ? ' h-nav-link--active' : ''}`}>
                        Ver estoque de venda
                    </NavLink>
                    <NavLink to="/rent" className={({ isActive }) => `h-nav-link${isActive ? ' h-nav-link--active' : ''}`}>
                        Ver estoque de aluguel
                    </NavLink>
                    <NavLink to="/About" className={({ isActive }) => `h-nav-link${isActive ? ' h-nav-link--active' : ''}`}>
                        Sobre nós
                    </NavLink>
                </div>

                <a
                    href="https://wa.me/5544991535404?text=Olá, gostaria de mais informações sobre um veículo."
                    target="_blank"
                    rel="noreferrer"
                    className="h-nav-whatsapp"
                >
                    <WhatsappLogo size={16} weight="fill" />
                    Falar no WhatsApp
                </a>
            </nav>
        </>
    )
}