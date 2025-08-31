import './GenericCheckbox.css';
export default function GenericCheckbox({
    label,
    options,
    onChange,
    checkedValues
}) {
    return (
        <div className="condition">
            <h6 className="generic-label generic-label-checkbox">{label}</h6>
            {options.map((option) => (
                <label
                    key={option.id}
                    className="container-checkbox"
                >
                    <span className="checkbox-name">{option.name}</span>
                    <input
                        type="checkbox"
                        name={`condition-${option.id}`}
                        id={`condition-${option.id}`}
                        value={option.value}
                        checked={checkedValues?.includes(option.name) || false}
                        onChange={() => onChange(label, option.name)}
                        className="checkbox"
                    />
                    <span className="checkmark"></span>
                </label>
            ))}
        </div>
    );
}