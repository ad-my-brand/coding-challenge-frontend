import React, { useState } from 'react'
import "./customForms.css"
import axios from 'axios'
import FormControl from '../formcontrol/FormControl'
import { enqueueSnackbar } from 'notistack'
import { MoonLoader } from 'react-spinners'






const CustomForms = ({ users, handleSelect, setSelectedUser }) => {


    const [formState, setFormState] = useState({
        userId: '',
        title: '',
        body: ''
    })
    const [validations, setValidations] = useState({
        title: true,
        body: true,
        userId: true
    });
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'userId') {
            handleSelect(event)
        }
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        // Check if all fields are true/valid
        const allValid = Object.values(validations).every(Boolean);
        if (!allValid) {
            enqueueSnackbar("form fields are invalid", { variant: 'error' })
            return;
        }

        setIsLoading(true)

        const postURL = 'https://jsonplaceholder.typicode.com/posts';
        const sendPost = async () => {
            try {
                const response = await axios.post(postURL, formState);

                setFormState({
                    userId: '',
                    title: '',
                    body: ''
                });

                setValidations({
                    title: true,
                    body: true,
                    userId: true
                });
                setIsSubmitted(false);
                setSelectedUser('');
                enqueueSnackbar('Post submitted successfully', { variant: 'success' });
                console.log(response);
            } catch (error) {
                console.error("There was an error!", error);

                let errorMessage = error.message;  // Default to error.message

                // Check if there's a server-provided error message and use that if available
                if (error.response && error.response.data && error.response.data.error) {
                    errorMessage = error.response.data.error;
                }

                enqueueSnackbar(errorMessage, { variant: 'error' });
            }
        }

        sendPost();

        setIsLoading(false)// Calling the sendPost function
    }

    return (
        <div className='customForms'>

            <div className="title">Create Post
                <p>fill the form & create fake posts </p>
            </div>

            <form onSubmit={handleSubmit}>


                <FormControl
                    type="select"
                    label="Select users"
                    name="userId"
                    value={formState.userId}
                    onChange={handleInputChange}
                    options={users.map(user => ({ value: user.id, label: user.name }))}
                    isSubmitted={isSubmitted}
                    validationFunc={(value) => value !== ""}
                    errorMessage={"Please select a user"}
                    onValidation={(fieldName, isValid) => {
                        setValidations(prev => ({ ...prev, [fieldName]: isValid }));
                    }}
                />


                <FormControl
                    type="text"
                    label="Title"
                    name="title"
                    value={formState.title}
                    onChange={handleInputChange}
                    validationFunc={(value) => value.length >= 3}
                    errorMessage={"Title is required"}
                    isSubmitted={isSubmitted}
                    onValidation={(fieldName, isValid) => {
                        setValidations(prev => ({ ...prev, [fieldName]: isValid }));
                    }}
                />

                <FormControl
                    type="text"
                    label="Body"
                    name="body"
                    value={formState.body}
                    onChange={handleInputChange}
                    validationFunc={(value) => value.length >= 3}
                    errorMessage={"Body is required"}
                    isSubmitted={isSubmitted}
                    onValidation={(fieldName, isValid) => {
                        setValidations(prev => ({ ...prev, [fieldName]: isValid }));
                    }}
                />


                {isLoading === true ? (
                    <MoonLoader color={"#0088E1"} size={45} />
                ) :
                    (
                        <button type='submit'>Submit</button>

                    )}
            </form>
        </div>
    )

}

export default CustomForms