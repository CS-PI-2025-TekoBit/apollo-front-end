import React from 'react';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import './LoadingCar.css';

const LoadingCar = ({ visible, text = "Carregando..." }) => {
    return (
        <Dialog
            visible={visible}
            modal
            closable={false}
            showHeader={false}
            style={{ width: '500px', height: '200px', borderRadius: '12px' }}
            className="loading-dialog"
            contentStyle={{

                textAlign: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                border: 'none'
            }}
            maskStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(5px)'
            }}
        >
            <div className="loading-content">
                <div className="loading-animation">
                    <ProgressSpinner
                        style={{
                            width: '60px',
                            height: '60px',
                            marginBottom: '1.5rem'
                        }}
                        strokeWidth="3"
                        fill="transparent"
                        animationDuration="1s"
                    />
                </div>

                <div className="loading-text">
                    <h3 style={{
                        color: 'white',
                        margin: '0 0 0.5rem 0',
                        fontSize: '1.2rem',
                        fontWeight: '600'
                    }}>
                        {text}
                    </h3>
                    <p style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        margin: 0,
                        fontSize: '0.9rem'
                    }}>
                        Por favor, aguarde...
                    </p>
                </div>

                {/* Animação decorativa */}
                <div className="loading-dots">
                    <div className="dot dot1"></div>
                    <div className="dot dot2"></div>
                    <div className="dot dot3"></div>
                </div>
            </div>
        </Dialog>
    );
};

export default LoadingCar;