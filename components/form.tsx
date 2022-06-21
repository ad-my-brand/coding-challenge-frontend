import React, { useState, useEffect } from 'react';
import type { FetchInterface, PostInterface } from '../pages/api/types';
import { postData } from '../pages/api/fetchAndPostJson';

/**
 * This is a select component for users for listing the recieved data in the select element
 * It also shows the validate error message.
 */
function Users(props: {
                userData: FetchInterface[] | null,
                setUserId: React.Dispatch<React.SetStateAction<number>>,
                label: string,
                validateUser: string,
                userId: number
}) {
    
    if (props.userData === null) {
        return (
            <React.Fragment>
                <label htmlFor="users">{ props.label }</label>
                <select id="users">
                    <option selected value="0">Select User</option>
                </select>
            </React.Fragment>
        );
    }
    else {
        return (
            <React.Fragment>
                <label htmlFor="users">{ props.label }</label>
                <select id="users" required={ true } value={ `${ props.userId! }` } onChange={e => props.setUserId(parseInt(e.target.value))} >
                    <option value="0">Select User</option>
                    {
                        props.userData.map((user, i) => <option value={ user.id } key={i}>{ user.name }</option>)
                    }
                </select>
                <p className="error-message">{ props.validateUser }</p>
            </React.Fragment>
        );
    }
}

/**
 *  Input component for title and body inputs
 */

function Input(props: {
    label: string,
    hook: string,
    setHook: React.Dispatch<React.SetStateAction<string>>,
    validateMessage: string
}) {
    return (
        <React.Fragment>
            <div>
                <label htmlFor={ props.label }>{ props.label }</label>
                <input type='text' id={ props.label } width={ 200 } value={ props.hook } onChange={ e => props.setHook(e.target.value) } />
                <p className='error-message'>{ props.validateMessage }</p>
            </div>
        </React.Fragment>
    );
}

export default function Form(
    props: {
    userData: FetchInterface[] | null,
    userId: number,
    title: string,
    body: string,
    setUserData: React.Dispatch<React.SetStateAction<FetchInterface[] | null>>
    setBody: React.Dispatch<React.SetStateAction<string>>
    setTitle: React.Dispatch<React.SetStateAction<string>>
    setUserId: React.Dispatch<React.SetStateAction<number>>
    }) {

    const [ validateUser, setValidateUser ] = useState<string>('');
    const [ validateTitle, setValidateTitle ] = useState<string>('');
    const [ validateBody, setValidateBody ] = useState<string>('');
    const [ postStatus, setPostStatus ] = useState<{str: string, success: boolean}>({str: '', success: false})

    let resetValues = () => {
        props.setUserId(0);
        props.setTitle('');
        props.setBody('');
    }

    let validateForm = () => {
        setPostStatus({ str: '', success: false });
        if (props.userId === 0) {
            setValidateUser('Select a User');
            resetValues();
        }
        else if (props.title === '' || props.title.length < 6) {
            setValidateTitle('Enter a title with atleast 5 characters');
            resetValues();
        }
        else if (props.body === '' || props.body.length < 20) {
            setValidateBody('Enter a body with atleast 20 characters')
            resetValues();
        }
        else {
            postData({
                id: props.userId,
                title: props.title,
                body: props.body
            }).then(e => {
                setPostStatus({ str: `status: ${ e.status }   statusText: ${ e.statusText }`, success: true });
                resetValues();
            })
            .catch(err => {
                setPostStatus({ str: `status: ${ err.status }  statusText: ${ err.statusText }`, success: false});
                resetValues();
            });
        }
    }

    return (
        <React.Fragment>
            <form onSubmit={ e => e.preventDefault() }>
                <Users userData={ props.userData } userId={ props.userId } setUserId={ props.setUserId } label={ "Select Users" } validateUser={ validateUser }/>
                <Input label="title" validateMessage={ validateTitle } hook={ props.title } setHook={ props.setTitle } />
                <Input label="body" validateMessage={ validateBody } hook={ props.body } setHook={ props.setBody } />
                <input type="submit" className='submit-btn' value="submit" onClick={ validateForm } />
            </form>
            <p className={ (postStatus.success) ? 'status success-message' : 'status error-message'}>{ postStatus.str }</p>
        </React.Fragment>
    );
}