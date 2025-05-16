import React from 'react'
import './Header.css'
import logo from '../../assets/imgs/logomarca.png'
import { Clock, MagnifyingGlass, Phone, UserCircle, UserCircleGear, WhatsappLogo, Star, Chat } from '@phosphor-icons/react'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router'
export default function Header() {
    const { user, logout } = useAuth()
    return (
        <>
            <header>
                <img src={logo} alt="Logo da loja apollo veículos" className='img-logo-marca' />
                <section className="info">
                    <ul className="numeros">
                        <li className='li-telefone'>
                            <Phone size={30} color="#fff" weight="regular" />
                            <p>(11) 99999-9999</p>
                        </li>
                        <li className='li-telefone'>
                            <WhatsappLogo size={30} color="#fff" weight="regular" />
                            <p>(11) 99999-9999</p>
                        </li>
                        <li className='li-telefone'>
                            <WhatsappLogo size={30} color="#fff" weight="regular" />
                            <p>(11) 99999-9999</p>
                        </li>
                    </ul>
                    <div className='li-horarios'>
                        <Clock size={30} weight="regular" color='#fff' />
                        <p>
                            Seg. a Sex., 8h30 às 18h30 | Sáb., 8h30 às 13h
                        </p>
                    </div>
                </section>
                <div className="input-container">
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
                            <div className='dropdown'>
                                <span className="dropdown-texto">
                                    <UserCircleGear size={32} weight="duotone" />
                                    <p>{user.name}</p>
                                </span>
                                <div className="dropdown-conteudo">
                                    <Link to={'/user'} className='dropdown-item'>Minha conta</Link>
                                    <button onClick={logout}>Sair</button>
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
