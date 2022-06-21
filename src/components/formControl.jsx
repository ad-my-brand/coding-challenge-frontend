import React, { Fragment, useEffect, useState } from 'react'
import { doGetAllUsers, doAddUser } from '../common/services/ApiServices';
import { getValidatedData } from '../common/Validation';
import { Form, Label, FormGroup, Input, Button, Card, CardTitle, Row } from 'reactstrap';
import { ErrorModal, FormModal } from '../common/classes/classes'
import MAP from './maps.jsx'

// import Select from "react-select";
const Select = React.lazy(() => import("react-select"));


const FormControl = () => {

    const [users, setUsers] = useState([]);
    const [selectedMulti, setselectedMulti] = useState(null);
    const [formObject, setFormObject] = useState(new FormModal());
    const [userError, setUserError] = useState({
        title: new ErrorModal(),
        body: new ErrorModal(),
        userId: new ErrorModal()
    })

    useEffect(() => {
        getAllUsers();
    },[])

    const getAllUsers = () => {
        doGetAllUsers().then((res) => {
            let allUsers = getValidatedData(res.data, 'array');
            setUsers(allUsers);
        }, (err) => {
            console.log(err)
        })
    }

    function handleMulti(selectedMulti) {
        setselectedMulti(selectedMulti);
        let userData = (new FormModal()).createObj(formObject);
        let userErrorData = {...userError};
        userData.userId = selectedMulti.value;
        userErrorData.userId = new ErrorModal()
        setFormObject(userData)
        setUserError(userErrorData)
      }

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        let userErrorData = {...userError};
        let userData=(new FormModal()).createObj(formObject);
        switch(name){
            case "title":
                userData.title = value;
                userErrorData.title = new ErrorModal()
                break;
            case "desc":
                userData.body = value;
                userErrorData.body = new ErrorModal()
                break;
            default:

        }
            setFormObject(userData);
            setUserError(userErrorData)
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();

        let userErrorData = {...userError};
        let validate = true;
        if(formObject.title !== ""){
          userErrorData.title = new ErrorModal()
        }else{
          validate = false
          userErrorData.title = new ErrorModal(true, true, "Title is required")
        }

        if(formObject.body !== ""){
          userErrorData.body = new ErrorModal()
        }else{
          validate = false
          userErrorData.body = new ErrorModal(true, true, "Description is required")
        }

        if(formObject.userId !== 0){
            userErrorData.userId = new ErrorModal()
          }else{
            validate = false
            userErrorData.userId = new ErrorModal(true, true, "Please Select a user")
          }

          if(validate){
            doAddUser(formObject);
          }

          setUserError(userErrorData)
    }

  return (
    <Fragment>
        <Row className='d-flex'>
        <div className='col-sm-5 my-4 mx-4'>
            <Card body style={{backgroundColor:'thistle'}}>
                <CardTitle tag="h4" className='text-center'>
                    <strong>Frontend Challenge Task</strong>
                </CardTitle>
                <Form inline onSubmit={onHandleSubmit}>
                    <FormGroup >
                    <Label for="users">
                        Username
                    </Label>
                    <Select
                        name="users"
                        value={selectedMulti}
                        isMulti={false}
                         onChange={(e) => {
                            console.log("E :- ",e)
                            handleMulti(e);
                        }}
                        options = {
                            users.map((c) => ({
                                label : c.name,
                                value : c.id
                        }))
                        }
                        classNamePrefix="select2-selection"
                        closeMenuOnSelect={true}
                        placeholder="Select User"
                        menuPortalTarget={document.body}
                    />
                    {
                        (userError.userId.response)?(<>
                          {
                            (userError.userId.status)?(<p className="text-danger">{userError.userId.message}</p>):(<></>)
                          }
                        </>) : (<></>)
                    }
                    </FormGroup>
                    
                    <FormGroup >
                    <Label for="title">
                        Title
                    </Label>
                    <Input
                        id="title"
                        name="title"
                        value={formObject.title}
                        placeholder="Title"
                        type="text"
                        onChange={onHandleChange}
                    />
                    
                    {
                        (userError.title.response)?(<>
                          {
                            (userError.title.status)?(<p className="text-danger">{userError.title.message}</p>):(<></>)
                          }
                        </>) : (<></>)
                    }
                    </FormGroup>
                    
                    {' '}
                    <FormGroup>
                    <Label for="desc">
                        Description
                    </Label>
                    <Input
                        id="desc"
                        name="desc"
                        value={formObject.body}
                        placeholder="Description"
                        type="desc"
                        onChange={onHandleChange}
                    />
                    
                    {
                        (userError.body.response)?(<>
                          {
                            (userError.body.status)?(<p className="text-danger">{userError.body.message}</p>):(<></>)
                          }
                        </>) : (<></>)
                    }
                    </FormGroup>

                    {' '}
                    <Button className='btn btn-light btn-outline-success'>
                    Submit
                    </Button>
                </Form>
            </Card>
        </div>
        <div className='col-sm-5 my-4'>
        <MAP/>
        </div>
        </Row>
    </Fragment>
  )
}

export default FormControl