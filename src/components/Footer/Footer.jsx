import React from 'react';
import './Footer.css';
import { Link } from 'react-router';

export default function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-links">
                    <Link to='/home' className='links'>
                        <span>HOME</span>  |
                    </Link>
                    <Link to='/estoque' className='links'>
                        <span>ESTOQUE</span>  |
                    </Link>
                    <Link to='/contato' className='links'>
                        <span>CONTATO</span>
                    </Link>
                </div>
                <div className="footer-address">
                    <p>Rod. Heitor de Alencar Furtado</p>
                    <p>Paranavaí, Paraná</p>
                </div>
                <div className="footer-copyright">
                    <p>Copyright <b>Apollo Veículos</b> cnpj: 04.772.700/0001-55 <b>&copy;2025</b>, sistema licenciado por Onixx Group</p>
                </div>
            </div>
        </footer>
    );
}