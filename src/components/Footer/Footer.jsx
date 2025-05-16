import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-links">
                    <a href="#">HOME</a> |
                    <a href="#">ESTOQUE</a> |
                    <a href="#">CONTATO</a>
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