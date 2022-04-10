import React, { useState, useEffect } from "react";
import axios from "axios";
export const PostForm = ({ userId }) => {
    const initialValues = { title: "", body: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState();
    const [apiError, setApiError] = useState();
    const handleChanges = e => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const postdata = async () => {
        const data = {
            title: formValues.title,
            body: formValues.body,
            userId: userId,
        };
        const url = "https://jsonplaceholder.typicode.com/posts";
        await axios
            .post(url, data)
            .then(res => {
                console.log(res);
                setSuccessMsg("Post sent successfully! ✔");
                setTimeout(() => {
                    setSuccessMsg("");
                }, 2000);
            })
            .then(error => {
                setApiError(error);
            });
    };
    const handleSubmit = e => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        if (formValues.title && formValues.body) {
            postdata();
        }
    };

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
                    <p className="text-success">{successMsg}</p>
                    <p className="text-danger">{apiError}</p>
                    <div className="form-group my-2 item-left">
                        <label for="title" className="my-2">
                            Title
                        </label>
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
                    <div className="form-group my-2 item-left">
                        <label for="body" className="my-2">
                            Body
                        </label>
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
