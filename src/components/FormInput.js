import {ErrorMessage, Field, useField} from 'formik';

const FormInput = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <>
            <div>
                <label htmlFor={props.name} className='text-lg'>{label}</label>
                <Field autoComplete='off' {...field} {...props}
                       className={`${meta.touched && meta.error && `is-invalid`}
                       w-full text-gray-700 border border-gray-200 rounded py-2 px-4 
                       focus:outline-none focus:bg-white focus:border-gray-500
                       `}
                />
            </div>

            <div className='text-red-500 text-sm italic'>
                <ErrorMessage name={field.name}/>
            </div>
        </>
    );
};

export default FormInput;
