import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

const FormControl = ({
  onChange,
  onSubmit,
  success,
  error,
  newError,
  postData,
}) => {
  const { title, userId, body } = postData || {};
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => setUsers(res.data))
      .catch((err) => newError("Couldn't fetch data for Users from API"));
    // eslint-disable-next-line
  }, []);

  return (
    <div className='border p-5 rounded bg-secondary'>
      <Form className='d-flex' onSubmit={onSubmit}>
        <div
          className='d-flex flex-column border rounded p-3 bg-light me-3'
          style={{ width: '350px' }}
        >
          <Form.Label>
            <h2 className='text-center'>Select User</h2>
            <hr />
          </Form.Label>
          {users &&
            users.map((user, i) => (
              <Form.Group className='mb-3 ms-4' key={i}>
                <input
                  type='radio'
                  name='userId'
                  value={user.id}
                  checked={parseInt(userId) === user.id}
                  onChange={onChange}
                />
                {` ${user.name}`}
              </Form.Group>
            ))}
        </div>
        <div
          className='d-flex flex-column border rounded py-3 px-4 bg-light'
          style={{ width: '350px' }}
        >
          <h2 className='text-center'>Add Post Data</h2>
          <hr />
          <Form.Group className='my-3'>
            <Form.Label>Post Title</Form.Label>
            <Form.Control
              type='text'
              name='title'
              value={title}
              onChange={onChange}
              placeholder='Enter Post Title'
              data-testid='title'
              required
            />
          </Form.Group>
          <Form.Group className='mb-5'>
            <Form.Label>Post Body</Form.Label>
            <Form.Control
              type='text'
              name='body'
              value={body}
              onChange={onChange}
              placeholder='Enter Post Body'
              data-testid='body'
              required
            />
          </Form.Group>
          <Button
            data-testid='submitBTn'
            className='w-100 mb-3'
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
};

export default FormControl;
