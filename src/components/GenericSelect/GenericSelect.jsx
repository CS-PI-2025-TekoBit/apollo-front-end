import React from "react";
import "./GenericSelect.css";

export default function GenericSelect({
    options,
    value,
    onChange,
    placeholder,
    label,
    disabled = false,
}) {
    return (
        <div className="select-container">
            
            <div className="div-label">
                <label htmlFor="select-mark" className="select-label">{label} </label>
            </div>
            <select
                className="select"
                value={value}
                onChange={onChange}
                name="select-mark"
                disabled={disabled}
            >
                <option value="" disabled className="option-placeholder">
                    {placeholder}
                </option>
                {options && Array.isArray(options) && !options[0]?.models ? (
                    options.map((option) => (
                        <option key={option.id} value={option.name} className="option">
                            {option.name}
                        </option>
                    ))
                ) : (
                    options && options[0] && options[0].models ? (
                        options[0].models.map((model, index) => (
                            <option key={index} value={model} className="option">
                                {model}
                            </option>
                        ))
                    ) : (
                        <option disabled>Sem opções disponíveis</option>
                    )
                )}
            </select>
        </div>
    );
};