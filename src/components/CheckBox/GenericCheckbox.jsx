import './GenericCheckbox.css';
export default function GenericCheckbox({
    label,
    options,
}) {
    return (
        <div className="condition">
            <h6 className="generic-label generic-label-checkbox">{label}</h6>
            {options.map((option) => (
                <label
                    key={option.id} // `key` no contêiner pai
                    className="container-checkbox"
                >
                    {option.name}
                    <input
                        type="checkbox"
                        name={`condition-${option.id}`}
                        id={`condition-${option.id}`}
                        value={option.value}
                        checked={option.checked}
                        onChange={option.onChange} // fazer funcão mudança
                        className="checkbox"
                    />
                    <span className="checkmark"></span>
                </label>
            ))}
        </div>
    );
}