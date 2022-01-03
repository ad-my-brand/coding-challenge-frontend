import React from 'react';
import styled from 'styled-components';
import { makePost } from '../../actionCreators';
import { connect } from 'react-redux';
import Input, { ErrorMessage } from '../FormInput';
import UserList from '../UserList';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    padding: 48px 16px;
    border-radius: 8px;
    gap: 16px;
    max-width: 500px;
    margin: 50px auto;
`;

const Button = styled.button`
    background: #42C0FB;
    border: none;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    padding: 12px 32px;
    color: white;
    font-size: 16px;
    font-weight: 500;

    &:hover {
        background: #33A1DE;
    }
`;

const Form = ({post, makePost}) => {
    const [title, setTitle] = React.useState({value: '', error: false});
    const [body, setBody] = React.useState({value: '', error: false});
    const [user, setUser] = React.useState({value: '0', error: false});
    const [error, setError] = React.useState(false);

    const OnTitleChange = (v) => {
        if(!!v && v !== "") {
            setTitle({
                value: v,
                error: false
            });
        } else {
            setTitle({
                value: '',
                error: true
            });
        }
    };

    const OnBodyChange = (v) => {
        if(!!v && v !== "") {
            setBody({
                value: v,
                error: false
            });
        } else {
            setBody({
                value: '',
                error: true
            });
        }
    };

    const onUserChange = (v) => {
        if(!!v && v !== '0') {
            setUser({
                value: v,
                error: false
            });
        } else {
            setUser({
                value: v,
                error: true
            });
        }
    };

    const handlePost = () => {
        if(!title.error && !user.error && !body.error){
            if(!(title.value === '' || body.value === '' || user.value === '0')){
                setError(false);
                makePost({
                    title: title.value,
                    body: body.value,
                    userId: user.value
                });
                setTitle({value: '', error: false});
                setBody({value: '', error: false});
                setUser({value: '0', error: false})
            } else {
                setError(true);
            }
        }
    }

    return (
        <StyledForm onSubmit={(e) => e.preventDefault()}>
            <Input handleChange={(e) => OnTitleChange(e.target.value)} label="Title" value={title.value} err={title.error} />
            <Input handleChange={(e) => OnBodyChange(e.target.value)} label="Body" value={body.value} err={body.error} />
            <UserList handleChange={(e) => onUserChange(e.target.value)} value={user.value} err={user.error} />
            {error && <ErrorMessage>Please fill all the fields!</ErrorMessage>}
            <Button onClick={handlePost}>POST</Button>
        </StyledForm>
    )
}

const mapStateToProps = (state) => {
    return { post: state.post }
}

export default connect(mapStateToProps, { makePost })(Form);