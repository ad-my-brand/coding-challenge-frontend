import React from 'react';

const Form = ({ user }) => {
    return (
        <>
            {/* form sect option */}
            <option>{user.name}</option>
        </>
    );
};

export default Form;