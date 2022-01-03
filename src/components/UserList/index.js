import React from 'react';
import styled from 'styled-components';
import { fetchData } from '../../actionCreators';
import { connect } from 'react-redux';
import { ErrorMessage } from '../FormInput';


const Label = styled.label`
    position: absolute;
    top: -10px;
    left: 8px;
    padding: 0px 6px;
    font-size: 18px;
    background-color: white;
    color: #333333;
`;

const Select = styled.select`
    width: 250px;
    padding: 14px;
    border: 1px solid #33333382;
    border-radius: 2px;
    font-size: 16px;
`;

const UserList = ({users, fetchData, err, value, handleChange}) => {

    React.useEffect(() => {
        fetchData();
    },[]);

    return (
        <div>
        {!users.error &&
        <div style={{ position: 'relative'}}>
            <Label>Select User</Label>
            <Select onChange={handleChange} value={value}>
                <option value={'0'}>Select a user</option>
                {users.data?.map((user) => {
                    return <option key={user.id} value={user.id}>{user.name}</option>
                })}
            </Select>
        </div>}
        {users.error ? <ErrorMessage>Unable to fetch users. Please refresh and try again.</ErrorMessage> : err && <ErrorMessage>Please Select a user</ErrorMessage>}
        </div>
    )
};

const mapStateToProps = (state) => {
    return { users: state.users }
}

export default connect(mapStateToProps, { fetchData })(UserList);