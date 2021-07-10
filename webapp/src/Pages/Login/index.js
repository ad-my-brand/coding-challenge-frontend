import axios from "axios";
import React from "react";
import styled, {css} from "styled-components";
import FormInput from "../../Components/FormInput";
import theme from "../../utilities/theme";
import ShowUser from "../../Components/ShowUser";

const Flex = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : "column")};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  flex-wrap: wrap;
`;

const LoginTitle = styled.h1`
  color: ${theme.colors.fontPrimary};
  font-weight: 100 !important;
  letter-spacing: 0.4px;
  padding-bottom: 0.5rem;
  transition-duration: 1000ms;
  cursor: pointer;

  :hover {
    border-bottom: 2px solid ${theme.colors.primary};
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  background-color: ${theme.colors.primary};
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 80vh;
  background-color: ${theme.colors.primary};
`;

const FormContainer = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    background-color: ${theme.colors.secondary};

    * {
        margin: 10px;
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: ${theme.colors.fontPrimary};
    font-size: 1rem;

    ${props => props.disabled && css`
        opacity: 0.7;
    `}

    ${props => !props.disabled && css`
        transition-duration: 1000ms;
        border: 1px solid ${theme.colors.fontPrimary};

        :hover {
            color: ${theme.colors.white};
            background-color: ${theme.colors.fontPrimary};
        }
    `}
`;

const ErrorMessageContainer = styled.div`
    width: 100%;
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.red};
    color: ${theme.colors.white};
    border-radius: 10px;
`;

class Login extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            title: '',
            body: '',
            users: [],
            errors: {
                title: false,
                body: false
            },
            errorMessage: null,
        }
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = () => {
        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value,
        })
    }

    setErrorMessage = (name, message) => {
        this.setState({
            errors: {
                ...this.state.errors,
                [name]: true,
            },
            errorMessage: message
        });
    }

    removeErrorMessage = (name) => {
        this.setState({
            errors: {
                ...this.state.errors,
                [name]: false,
            },
            errorMessage: ''
        });
    }

    submitForm = () => {
        if(this.state.errorMessage != '') {
            this.setState({
                errorMessage: "Invalid data"
            })
            return;
        }
        if(this.state.title == "" && this.state.body == "") {
            this.setState({
                errorMessage: "Both fields are required"
            })
        } else if(this.state.title == "") {
            this.setState({
                errorMessage: "Title is a required field"
            })
        } else if(this.state.body == "") {
            this.setState({
                errorMessage: "Body is a required field"
            })
        } else {
            axios.post("https://jsonplaceholder.typicode.com/users", {
                title: this.state.title,
                body: this.state.body,
                userId: 1
            })
            .then(res => {
                alert(`Title is: ${res.data.title}, Body is: ${res.data.body}
                `);
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.error.message
                })
            })
        }
        this.setState({
            title: '',
            body: '',
            errors:{
                title: false,
                body: false,
            },
            errorMessage: ''
        })
    }

    render() {
        return (
            <>
            <Flex direction="column" justify="flex-start" align="flex-start">
                <LoginTitle>Login page</LoginTitle>
                <Container>
                    <FormContainer>
                        {this.state.errorMessage && 
                            <ErrorMessageContainer>
                                {this.state.errorMessage}
                            </ErrorMessageContainer>
                        }
                        <FormInput 
                            name="title" 
                            displayName="Title" 
                            value={this.state.title} 
                            placeholder="Please select a Title" 
                            type="text" required={true} 
                            hasError={this.state.errors.title} 
                            handleChange={this.handleChange}
                            minLength={3}
                            errorMessage={this.state.errorMessage}
                            setErrorMessage={this.setErrorMessage}
                            removeErrorMessage={this.removeErrorMessage}
                        />
                        <FormInput 
                            name="body" 
                            displayName="Body" 
                            value={this.state.body} 
                            placeholder="Please select a Body" 
                            type="text" 
                            required={true} 
                            hasError={this.state.errors.body} 
                            handleChange={this.handleChange}
                            minLength={3}
                            errorMessage={this.state.errorMessage}
                            setErrorMessage={this.setErrorMessage}
                            removeErrorMessage={this.removeErrorMessage}
                        />
                        <Button type="submit" onClick={this.submitForm}>Submit</Button>
                    </FormContainer>
                </Container>

                <LoginTitle>Users</LoginTitle>
                <UserContainer>
                       {this.state.users && this.state.users.length && this.state.users.map((oneUser) => {
                           return <ShowUser user={oneUser} />
                       })}
                </UserContainer>
            </Flex>
        </>
        );
    }
}

export default Login;
