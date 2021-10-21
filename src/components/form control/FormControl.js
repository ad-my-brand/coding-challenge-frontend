import React from 'react'
import styles from './FormControl.module.css'

const FormControl = ({label, list, value, setValue, errorMsg}) => {
    return (
        <div className={styles.selectInput}>
            <div>
                <h2 className={styles.selectInputLabel}>{label}</h2>
                <select value={value} onChange={e => setValue(e.target.value)} className={styles.select}>
                    <option value={0}>Select User</option>
                    {list.map(e => <option value={e.id} key={e.id}>{e.name}</option>)}
                </select>
            </div>
        </div>
    )
}

export default FormControl
