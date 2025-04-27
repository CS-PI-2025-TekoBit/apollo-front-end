import React from 'react'
import './Header.css'
import logo from '../../assets/imgs/logomarca.png'
import { Clock, MagnifyingGlass, Phone, WhatsappLogo } from '@phosphor-icons/react'
export default function Header() {
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

                    {/* fazer o resto */}
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
