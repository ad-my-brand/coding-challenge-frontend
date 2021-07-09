import { Card, Button, Form, Alert } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import {
  getUsers,
  addPost,
  setError,
  setCurrent,
  successMsg,
} from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import Map from './Map';
function Control() {
  const users = useSelector((state) => state.users);
  const error = useSelector((state) => state.error);
  const postSuccess = useSelector((state) => state.postSuccess);
  const [inputData, setInputData] = useState({
    title: '',
    body: '',
    userId: '',
  });
  const dispatch = useDispatch();
  const { title, body, userId } = inputData;
  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (e.target.name === 'userId') {
      setInputData({ ...inputData, [e.target.name]: parseInt(e.target.value) });
      dispatch(setCurrent(e.target.value));
    } else if (e.target.value.trim() !== '') {
      setInputData({ ...inputData, [e.target.name]: e.target.value });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputData.userId) {
      dispatch(setError('Please Select a User'));
    } else {
      dispatch(successMsg('Post Data Successfull. Please check your console.'));
      dispatch(addPost(inputData));
    }
  };
  return (
    <Card className='m-5 border border-primary border-5 rounded'>
      <Card.Body className='d-flex align-items-center justify-content-around'>
        <Form onSubmit={onSubmit}>
          <Form.Label>
            <h2 className='text-warning'>Select Username:</h2>
          </Form.Label>
          {error && <Alert variant='danger'>{error}</Alert>}
          {users &&
            users.map((user, idx) => (
              <Form.Group className='mb-3' key={idx}>
                <input
                  type='radio'
                  name='userId'
                  value={user.id}
                  lat={user.address.geo.lat}
                  lng={user.address.geo.lng}
                  checked={parseInt(userId) === user.id}
                  onChange={onChange}
                />
                {user.name}
              </Form.Group>
            ))}

          <hr />
          {postSuccess && <Alert variant='success'>{postSuccess}</Alert>}

          <Form.Group className='mb-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              name='title'
              value={title}
              type='text'
              placeholder='Add Post Title here...'
              required
              onChange={onChange}
              data-testid='title'
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Body</Form.Label>
            <Form.Control
              type='text'
              name='body'
              value={body}
              onChange={onChange}
              placeholder='Add Post Body here...'
              required
              data-testid='body'
            />
          </Form.Group>
          <Button variant='primary' type='submit' data-testid='submit-btn'>
            Submit
          </Button>
        </Form>{' '}
        <Map />
      </Card.Body>
    </Card>
  );
}

export default Control;
