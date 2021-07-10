import React from 'react';
import styled, {css} from 'styled-components';
import theme from '../../utilities/theme';


const Input = styled.input`
    width: calc(100% - 2rem);
    color: ${theme.colors.fontPrimary};
    padding: 1rem 1rem;
    margin-top: 0px !important;
    font-size: 1.2rem;
    ${(props) => props.hasError && css`
        border: 2px solid ${theme.colors.red};
    `}
`;

const Label = styled.label`
    width: 100%;
    color: ${theme.colors.white};
    text-align: start;
    font-size: 1.2rem;
`;

class FormInput extends React.PureComponent {


    checkForSpecialCharacter(word){
        var regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
        return !regex.test(word);
    }

    handleChange = (e) => {
        if(this.props.type == "text") {
            if(e.target.value == "") {
                this.props.setErrorMessage(e.target.name, `${e.target.id} is a required field`);
                this.props.handleChange(e.target.name, e.target.value);
                return;
            }
            
            if(this.checkForSpecialCharacter(e.target.value)) {
                this.props.handleChange(e.target.name, e.target.value);
                this.props.setErrorMessage(e.target.name, 'No special character is allowed');
            } else {
                this.props.removeErrorMessage(e.target.name);
                this.props.handleChange(e.target.name, e.target.value);
            }
        }
    }

    render() {
        const {name, type, value, displayName, placeholder, required, hasError} = this.props;
        return(
            <>
                <Label for={displayName}>{displayName}</Label>
                <Input 
                    type={type} 
                    name={name} 
                    value={value} 
                    id={displayName}
                    placeholder={placeholder} 
                    required={required} 
                    hasError={hasError} 
                    onChange={this.handleChange}
                />
            </>
        )
    }
}

export default FormInput;