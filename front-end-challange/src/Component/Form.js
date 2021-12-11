import React from 'react';

const Form = ({ user }) => {
    return (
        <>
            <option>{user.name}</option>
        </>
    );
};

export default Form;