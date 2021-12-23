export default function signupValidate(values) {
    let errors = {};

    if (!values.title) {
        errors.title = "Please Provide a Title";
    } else if (values.title.length > 20) {
        errors.title = "Must be 20 characters or less";
    }

    if (!values.body) {
        errors.body = "Please Provide a Body";
    } else if (values.body.length < 10) {
        errors.body = "Must be 10 characters or greater";
    }

    return errors;
};