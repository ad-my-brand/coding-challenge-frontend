import React, { useState, useEffect } from "react";

export const PostForm = () => {
    const initialValues = { title: "", body: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const handleChanges = e => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);
    };
    const handleSubmit = e => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
        }
    });
    const validate = values => {
        const errors = {};
        if (!values.title) {
            errors.title = "Title field is required!";
        }
        if (!values.body) {
            errors.body = "Body field is required!";
        }
        return errors;
    };
    return (
        <>
            <div className="py-3 d-flex justify-content-center border border-primary rounded">
                <form onSubmit={handleSubmit}>
                    <label className="my-3 h3">Enter details</label>
                    <div className="form-group my-2">
                        <label for="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            aria-describedby="emailHelp"
                            placeholder="Enter title"
                            value={formValues.title}
                            onChange={handleChanges}
                        />
                    </div>
                    <p className="text-danger">{formErrors.title}</p>
                    <div className="form-group my-2">
                        <label for="body">Body</label>
                        <input
                            type="text"
                            className="form-control"
                            id="body"
                            name="body"
                            placeholder="Enter body"
                            value={formValues.body}
                            onChange={handleChanges}
                        />
                    </div>
                    <p className="text-danger">{formErrors.body}</p>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};
