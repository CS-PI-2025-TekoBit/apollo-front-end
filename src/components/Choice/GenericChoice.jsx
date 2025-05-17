import './GenericChoice.css';

export default function GenericChoice({ label, onChange, value }) {
    return (
        <div className="choice">
            <h6 className="generic-label">{label}</h6>
            <div className="container-buttons">

                <button className={value === true ? "button-true" : "button_default"} onClick={() => onChange(true)}>
                    Sim
                </button>

                <button className={value === false ? "button-false" : "button_default"} onClick={() => onChange(false)}>
                    Não
                </button>

            </div>
        </div>
    );
}