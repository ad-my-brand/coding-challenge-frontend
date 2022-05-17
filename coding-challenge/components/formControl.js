import React from 'react';
import styles from "../styles/FormControl.module.css";

function FormControl({ type, value, options, onChange, label, validation }) {

    return (
        <div className={styles.formGroup}>
            {type !== "submit" && <label htmlFor={label}>{label}</label>}
            {type === "select" &&
                (<select data-testid="select" id={label} onChange={onChange}>
                    <option data-testid="select-option" key={0} value={0}>Select</option>
                    {
                        (options || []).map((option) => {
                            return <option data-testid="select-option" key={option.id} value={option.id}>{option.name}</option>
                        })
                    }
                </select>
                )}
            {type === "text" &&
                (<input id={label} className={styles.input} value={value} type="text" onChange={(e) => onChange(e.target.value)} />)
            }
            {
                type == "submit" &&
                (<button id={label} className={styles.button} onClick={(e) => { e.preventDefault(); onChange(); }}>{label}</button>)
            }
            {validation && validation() && <div className="alert">{validation()}</div>}
        </div>
    );
}
export default React.memo(FormControl);