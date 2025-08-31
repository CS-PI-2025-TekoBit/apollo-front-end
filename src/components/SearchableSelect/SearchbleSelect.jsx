import React, { useState, useRef, useEffect } from "react";
import "./SearchableSelect.css";

export default function SearchableSelect({
    options = [],
    value,
    onChange,
    placeholder = "Selecione uma opção",
    label,
    disabled = false,
    styleContainer = {},
    styleSelect = {},
    styleLabel = {},
    searchPlaceholder = "Digite para buscar...",
    noOptionsText = "Nenhuma opção encontrada",
    maxHeight = "auto"
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOptions, setFilteredOptions] = useState([]);
    const containerRef = useRef(null);
    const searchInputRef = useRef(null);

    // Processar opções (igual ao GenericSelect original)
    const processedOptions = React.useMemo(() => {
        if (!options || !Array.isArray(options)) return [];

        // Se tem estrutura com models
        if (options[0]?.models) {
            return options[0].models.map((model, index) => ({
                id: index,
                name: model,
                value: model
            }));
        }

        // Estrutura normal
        return options.map((option, index) => ({
            id: option.id || index,
            name: option.name || option,
            value: option.name || option
        }));
    }, [options]);

    // Filtrar opções baseado na busca
    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredOptions(processedOptions);
        } else {
            const filtered = processedOptions.filter(option =>
                option.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredOptions(filtered);
        }
    }, [searchTerm, processedOptions]);

    // Fechar dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm("");
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focar no input quando abrir
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
            setSearchTerm("");
        }
    };

    const handleOptionSelect = (option) => {
        const fakeEvent = {
            target: { value: option.value }
        };
        onChange(fakeEvent);
        setIsOpen(false);
        setSearchTerm("");
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
            setSearchTerm("");
        } else if (e.key === 'Enter' && filteredOptions.length === 1) {
            handleOptionSelect(filteredOptions[0]);
        }
    };

    // Encontrar a opção selecionada para exibir
    const selectedOption = processedOptions.find(option => option.value === value);
    const displayValue = selectedOption ? selectedOption.name : "";

    return (
        <div className="searchable-select-container" style={styleContainer} ref={containerRef}>
            {label && (
                <div className="div-label" style={styleLabel}>
                    <label className="select-label">{label}</label>
                </div>
            )}

            <div className={`searchable-select ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`}>
                {/* Campo de exibição/toggle */}
                <div
                    className="searchable-select-display"
                    onClick={handleToggle}
                    style={styleSelect}
                >
                    <span className={`display-text ${!displayValue ? 'placeholder' : ''}`}>
                        {displayValue || placeholder}
                    </span>
                    <i className={`pi ${isOpen ? 'pi-chevron-up' : 'pi-chevron-down'} chevron-icon`}></i>
                </div>

                {/* Dropdown */}
                {isOpen && (
                    <div className="searchable-select-dropdown" style={{ maxHeight }}>
                        {/* Campo de busca */}
                        <div className="search-container">
                            <i className="pi pi-search search-icon"></i>
                            <input
                                ref={searchInputRef}
                                type="text"
                                className="search-input"
                                placeholder={searchPlaceholder}
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                            />
                            {searchTerm && (
                                <i
                                    className="pi pi-times clear-icon"
                                    onClick={() => setSearchTerm("")}
                                ></i>
                            )}
                        </div>

                        {/* Lista de opções */}
                        <div className="options-container">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => (
                                    <div
                                        key={option.id}
                                        className={`option-item ${option.value === value ? 'selected' : ''}`}
                                        onClick={() => handleOptionSelect(option)}
                                    >
                                        {option.name}
                                        {option.value === value && (
                                            <i className="pi pi-check check-icon"></i>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="no-options">
                                    {noOptionsText}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}