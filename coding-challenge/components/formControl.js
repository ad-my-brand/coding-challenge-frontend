import React from 'react';
import styles from "../styles/FormControl.module.css";

function FormControl({ type, value, options, onChange, label, validation }) {

    return (
        <div className={styles.formGroup}>
            {type !== "submit" && <label>{label}</label>}
            {type === "select" &&
                (<select onChange={onChange}>
                    <option value={0}>Select</option>
                    {
                        (options || []).map((option) => {
                            return <option key={option.id} value={option.id}>{option.name}</option>
                        })
                    }
                </select>
                )}
            {type === "text" &&
                (<input className={styles.input} value={value} type="text" onChange={(e) => onChange(e.target.value)} />)
            }
            {
                type == "submit" &&
                (<button className={styles.button} onClick={onChange}>{label}</button>)
            }
            {validation && validation() && <div className="alert">{validation()}</div>}
        </div>
    );
}
export default React.memo(FormControl);