import { useState } from "react";

const api = "https://jsonplaceholder.typicode.com/posts";

const useForm = validate => {
    const [values, setValues] = useState({
        userId: "",
        id: "",
        title: "",
        body: ""
    });
    const requestMetadata = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    };
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const userId = () => {
        const date = new Date();
        return date.getDate();
    }

    const id = () => {
        const date = new Date();
        return date.getHours() + date.getMinutes() + date.getSeconds();
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            userId: userId(),
            id: id(),
            [name]: value

        });
    };


    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmit(true);
        console.log(values);

        fetch(api, requestMetadata)
        .then(res =>{
            console.log(res)
            setErrors({global: "Success"})
            setTimeout(() => {
                setErrors({global: ""})
            }, 4000);
            
        })
        .catch(err => {
            console.log(err)
            setErrors({global: "Error"})
            setTimeout(() => {
                setErrors({global: ""})
            }, 4000);
        });
    };


    return {values, handleChange, handleSubmit, errors}
};

export default useForm;