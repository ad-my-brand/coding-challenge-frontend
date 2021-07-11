import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

const FormPage = ({ ...props }) => {
  const { onChange, onSubmit, success, error, postData } = props

  const { title, body } = postData || {};
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    setUsers(response?.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='border p-5 rounded bg-primary'>
      <Form onSubmit={onSubmit}>
        <div
          className='d-flex flex-column rounded p-3 bg-light me-3'
          style={{ width: '500px' }}
        >
          <Form.Label>
            <h2 className='text-left'>User Selection Section</h2>
          </Form.Label>
          <Form.Group className='mb-3 ms-4'>
            <Form.Control as="select" name="userId" onChange={onChange}>
              {React.Children.toArray(
                users?.map((user) => {
                  return <option value={user.id}>{user.name}</option>;
                })
              )}
            </Form.Control>
          </Form.Group>
        </div>
        <br />
        <div
          className='d-flex flex-column border rounded py-3 px-4 bg-light'
          style={{ width: '500px' }}
        >
          <h2 className='text-left'>Add Data Section</h2>
          <hr />
          <Form.Group className='my-4'>
            <Form.Label>Title:-</Form.Label>
            <Form.Control
              type='text'
              name='title'
              value={title}
              onChange={onChange}
              placeholder='Enter Title'
              required
            />
          </Form.Group>
          <Form.Group className='mb-5'>
            <Form.Label>Body:-</Form.Label>
            <Form.Control
              type='text'
              name='body'
              value={body}
              onChange={onChange}
              placeholder='Enter Body'
              required
            />
          </Form.Group>
          <Button
            variant='primary'
            type='submit'
          >
            SUBMIT
          </Button>
          {error && <Alert variant='danger'>{error}</Alert>}
          {success && <Alert variant='success'>{success}</Alert>}
        </div>
      </Form>
    </div>
  );
}

export default FormPage;