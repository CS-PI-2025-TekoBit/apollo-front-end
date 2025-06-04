import React from 'react';
import './Maps.css';
export default function Maps() {
    return (
        <div className='maps-container'>
            <h1>Onde nos encontrar</h1>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d917.5540140685126!2d-52.462521858018235!3d-23.089185434187797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94929663e9f1d6a3%3A0x940a9d50687a81a!2sLocadora%20Apollo%20Ve%C3%ADculos!5e0!3m2!1spt-BR!2sbr!4v1745767964104!5m2!1spt-BR!2sbr"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa da Locadora Apollo Veículos"
            ></iframe>
        </div>
    );
}