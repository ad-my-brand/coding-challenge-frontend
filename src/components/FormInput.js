import React from 'react'

const FormInput = ({value, placeholder, onChange, error, errorMsg}) => {
    return (
        <div className="mb-3">
            <input value={value} onChange={e => onChange(e.target.value)}
                type="text"
                placeholder={placeholder}
                className='w-full h-9 rounded-md pl-4 border border-[#B0BEC5]'
            />
            {error && <span className='ml-1 text-xs text-red-600 block' >{errorMsg}</span>}
        </div>
    )
}

export default FormInput