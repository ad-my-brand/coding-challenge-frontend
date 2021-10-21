import React from 'react'
import styles from './FormControl.module.css'

const TextArea = ({label, setValue, value}) => {
    return (
        <div className={styles.textArea}>
            <label>{label}</label>
            <textarea id={label} onChange={e => setValue(e.target.value)} value={value}/>
        </div>
    )
}

export default TextArea
