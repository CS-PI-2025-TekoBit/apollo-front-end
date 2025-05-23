import React from 'react';
import './BotaoWhatsApp.css';
import { WhatsappLogo } from '@phosphor-icons/react';

export default function BotaoWhatsApp() {
    const abrirWhatsApp = (numero) => {
        const mensagem = encodeURIComponent("Olá, gostaria de mais informações sobre um veículo.");
        window.open(`https://wa.me/${numero}?text=${mensagem}`, '_blank');
    };

    return (
        <div className="whatsapp-fixo">
            <div className="contato" onClick={() => abrirWhatsApp('5544991535404')}>
                <p>Wagner</p>
                <p>(44) 9 99153-5404</p>
            </div>
            <div className="contato" onClick={() => abrirWhatsApp('5544991535404')}>
                <p>José Luiz</p>
                <p>(44) 9 99153-5404</p>
            </div>
            <div className="container">
                <WhatsappLogo size={60} color="#fff" weight="duotone" />
            </div>
        </div>
    );
}
