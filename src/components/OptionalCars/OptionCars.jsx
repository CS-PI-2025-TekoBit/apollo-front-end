import React from 'react';

const VEHICLE_OPTIONALS = {
    comfort: [
        { name: 'Ar Condicionado' },
        { name: 'Direção Hidráulica' },
        { name: 'Vidro Elétrico' },
        { name: 'Trava Elétrica' },
        { name: 'Banco de Couro' },
        { name: 'Banco com Aquecimento' },
        { name: 'Piloto Automático' },
        { name: 'Computador de Bordo' }
    ],
    safety: [
        { name: 'ABS' },
        { name: 'Airbag' },
        { name: 'Alarme' },
        { name: 'Sensor de Estacionamento' },
        { name: 'Câmera de Ré' },
        { name: 'Controle de Estabilidade' },
        { name: 'Freios ABS' }
    ],
    multimedia: [
        { name: 'Som Original' },
        { name: 'CD Player' },
        { name: 'MP3 Player' },
        { name: 'Bluetooth' },
        { name: 'GPS' },
        { name: 'Tela Multimídia' },
        { name: 'Android Auto/Apple CarPlay' }
    ],
    exterior: [
        { name: 'Rodas de Liga Leve' },
        { name: 'Pneus Novos' },
        { name: 'Teto Solar' },
        { name: 'Faróis de Neblina' },
        { name: 'Faróis Xenon/LED' }
    ]
};

const OptionalSelector = ({ selectedOptionals = [], setSelectedOptionals }) => {
    const safeSelectedOptionals = Array.isArray(selectedOptionals) ? selectedOptionals : [];

    const handleOptionalChange = (optionalName, checked) => {
        let newOptionals;

        if (checked) {

            if (!safeSelectedOptionals.includes(optionalName)) {
                newOptionals = [...safeSelectedOptionals, optionalName];
            } else {
                newOptionals = safeSelectedOptionals;
            }
        } else {

            newOptionals = safeSelectedOptionals.filter(item => item !== optionalName);
        }
        setSelectedOptionals(newOptionals);
    };

    const removeOptional = (optionalName) => {
        const newOptionals = safeSelectedOptionals.filter(item => item !== optionalName);
        setSelectedOptionals(newOptionals);
    };

    const getCategoryColor = (category) => {
        const colors = {
            comfort: '#3B82F6',
            safety: '#EF4444',
            multimedia: '#8B5CF6',
            exterior: '#10B981'
        };
        return colors[category] || '#6B7280';
    };

    return (
        <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label style={{ marginBottom: '1rem', display: 'block', fontWeight: 'bold' }}>
                Opcionais do Veículo
                {safeSelectedOptionals.length > 0 && (
                    <span style={{
                        color: '#10B981',
                        marginLeft: '10px',
                        fontSize: '14px',
                        fontWeight: 'normal'
                    }}>
                        ({safeSelectedOptionals.length} selecionado{safeSelectedOptionals.length > 1 ? 's' : ''})
                    </span>
                )}
            </label>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginTop: '0.5rem'
            }}>
                {Object.entries(VEHICLE_OPTIONALS).map(([category, items]) => (
                    <div key={category} style={{
                        border: '1px solid #e5e7eb',
                        padding: '1rem',
                        borderRadius: '8px',
                        backgroundColor: '#fafafa'
                    }}>
                        <h4 style={{
                            marginBottom: '0.75rem',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: getCategoryColor(category),
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <span style={{
                                width: '12px',
                                height: '12px',
                                backgroundColor: getCategoryColor(category),
                                borderRadius: '50%'
                            }}></span>
                            {category === 'comfort' && 'Conforto'}
                            {category === 'safety' && 'Segurança'}
                            {category === 'multimedia' && 'Multimídia'}
                            {category === 'exterior' && 'Exterior'}
                        </h4>
                        {items.map((optional) => {
                            const isSelected = safeSelectedOptionals.includes(optional.name);

                            return (
                                <div
                                    key={optional.name}
                                    className="flex align-items-center"
                                    style={{
                                        marginBottom: '0.5rem',
                                        padding: '6px 8px',
                                        borderRadius: '4px',
                                        backgroundColor: isSelected ? '#f0f9ff' : 'transparent',
                                        border: isSelected ? '1px solid #0ea5e9' : '1px solid transparent',
                                        transition: 'all 0.2s ease-in-out',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handleOptionalChange(optional.name, !isSelected)}
                                >
                                    <input
                                        type="checkbox"
                                        id={`optional-${optional.name.replace(/\s+/g, '-')}`}
                                        checked={isSelected}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            handleOptionalChange(optional.name, e.target.checked);
                                        }}
                                        style={{
                                            marginRight: '0.5rem',
                                            accentColor: getCategoryColor(category)
                                        }}
                                    />
                                    <label
                                        htmlFor={`optional-${optional.name.replace(/\s+/g, '-')}`}
                                        style={{
                                            fontSize: '13px',
                                            cursor: 'pointer',
                                            color: isSelected ? '#0369a1' : '#374151',
                                            fontWeight: isSelected ? '500' : 'normal',
                                            transition: 'color 0.2s ease-in-out'
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {optional.name}
                                        {isSelected && (
                                            <span style={{
                                                marginLeft: '6px',
                                                color: '#10B981',
                                                fontSize: '12px'
                                            }}>
                                                ✓
                                            </span>
                                        )}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Resumo dos opcionais selecionados */}
            {safeSelectedOptionals.length > 0 && (
                <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #0ea5e9',
                    borderRadius: '8px'
                }}>
                    <h5 style={{
                        margin: '0 0 0.5rem 0',
                        color: '#0369a1',
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }}>
                        Opcionais Selecionados:
                    </h5>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                    }}>
                        {safeSelectedOptionals.map((optional, index) => (
                            <span
                                key={index}
                                style={{
                                    backgroundColor: '#10B981',
                                    color: 'white',
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                {optional}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeOptional(optional);
                                    }}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'white',
                                        cursor: 'pointer',
                                        padding: '0',
                                        marginLeft: '4px',
                                        fontSize: '14px',
                                        fontWeight: 'bold'
                                    }}
                                    title="Remover opcional"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OptionalSelector;