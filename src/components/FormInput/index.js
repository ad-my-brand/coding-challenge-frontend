import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    padding: 14px;
    width: 220px;
    border: 1px solid #33333382;
    border-radius: 2px;
    font-size: 18px;
`;

const StyledLabel = styled.label`
    position: absolute;
    top: -10px;
    left: 8px;
    padding: 0px 6px;
    font-size: 18px;
    background-color: white;
    color: #333333;
`;

const Wrapper = styled.div`
    position: relative;
`;

export const ErrorMessage = styled.p`
    margin: 0px;
    color: #FF3232;
`;

const Input = ({value, label, handleChange, err, name}) => {

    return (
        <div>
            <Wrapper>
                <StyledLabel>{label}</StyledLabel>
                <StyledInput aria-label={name} onChange={handleChange} value={value} name={name} />
            </Wrapper>
            {err && <ErrorMessage>Please fill the above field</ErrorMessage>}
        </div>
    )
}

export default Input;