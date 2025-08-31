import React from 'react'
import './Header.css'
import logo from '../../assets/imgs/logomarca.png'
import { Clock, MagnifyingGlass, Phone, UserCircle, UserCircleGear, WhatsappLogo, Star, Chat } from '@phosphor-icons/react'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router'
import Swal from 'sweetalert2'
export default function Header() {
    const { user, logout } = useAuth()
    const ViewportHeight = window.innerHeight;

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
        <>
            <header>
                <img src={logo} alt="Logo da loja apollo veículos" className='img-logo-marca' />
                <section className="info">
                    <ul className="numeros">
                        <li className='li-telefone'>
                            <Phone size={30} color="#fff" weight="regular" />
                            <p>(44) 3423-1214</p>
                        </li>
                        <li className='li-telefone hover' onClick={() => window.open('https://wa.me/5544991535404?text=Olá, gostaria de mais informações sobre um veículo.', '_blank')}>
                            <WhatsappLogo size={30} color="#fff" weight="regular" />
                            <p>(44) 9 99153-5404</p>
                        </li>
                        <li className='li-telefone hover' onClick={() => window.open('https://wa.me/55449999202840?text=Olá, gostaria de mais informações sobre um veículo.', '_blank')}>
                            <WhatsappLogo size={30} color="#fff" weight="regular" />
                            <p>(44) 9 9920-2840</p>
                        </li>
                    </ul>
                    <div className='li-horarios'>
                        <Clock size={30} weight="regular" color='#fff' />
                        <p>
                            Seg. a Sex., 8h30 às 18h30 | Sáb., 8h30 às 13h
                        </p>
                    </div>
                </section>
                <div className="input-container-header">
                    <MagnifyingGlass size={20} color="#000" weight="regular" className="search-icon" />
                    <input
                        type="text"
                        placeholder="Pesquisar...."
                        className="input-pesquisa"
                    />
                </div>
                <div className="buttons-right">
                    <Link to='/' className='btn-favorito-mensagem ' >
                        <Star size={32} weight="regular" />
                        <p>Favoritos</p>
                    </Link>
                    <Link to='/' className='btn-favorito-mensagem '>
                        <Chat size={32} weight="regular" />
                        <p>Mensagens</p>
                    </Link>

                    {
                        user ? (
                            <div className='dropdowns'>
                                <span className="dropdown-texto">
                                    <UserCircleGear size={32} weight="duotone" />
                                    <p>{user.name}</p>
                                </span>
                                <div className="dropdown-conteudo">
                                    <Link to={'/myAccount'} className='dropdown-item'>Minha conta</Link>
                                    {ViewportHeight < 800 && (
                                        <>
                                            <Link to={'/'} className='dropdown-item'>Favoritos</Link>
                                            <Link to={'/'} className='dropdown-item'>Mensagens</Link>
                                        </>
                                    )}
                                    <button onClick={handleLogout}>Sair</button>
                                </div>
                            </div>
                        ) : (
                            <Link to='/' className='btn-login'>
                                <UserCircle size={32} weight="duotone" />
                                <p>Login</p>
                            </Link>
                        )
                    }
                </div>
            </header>
            <div className="footer-header">
                <button className='btn-veiculos'>
                    <p>Ver estoque de venda</p>
                </button>
                <button className='btn-veiculos'>
                    <p>Ver estoque de aluguel</p>
                </button>
                <button className='btn-veiculos'>
                    <p>Sobre nós</p>
                </button>

            </div>
        </>
    )
}
