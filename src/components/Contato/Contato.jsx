import React from 'react';
import './Contato.css';
import { WhatsappLogo } from '@phosphor-icons/react'


export default function Footer() {
    return (
        <>
        <div className="contato">
            <p>Wagner</p>
            <p>(44) 9 99153-5404</p>
        </div>
        <div className="contato">
            <p>José Luiz</p>
            <p>(44) 9 99153-5404</p>
        </div>
        <div className="container">
            <WhatsappLogo size={60} color="#fff" weight="duotone" />
        </div>
        </>
    );
}
