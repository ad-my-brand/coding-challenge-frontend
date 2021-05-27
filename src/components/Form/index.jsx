import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Control from '../Control';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Form_() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedUserError, setSelectedUserError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [bodyError, setBodyError] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('primary');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const onChangeUser = (event) => {
    setSelectedUserId(event.target.value);
    setSelectedUserError(null);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    setTitleError(null);
  };

  const onChangeBody = (event) => {
    setBody(event.target.value);
    setBodyError(null);
  };

  const onClickSubmit = (event) => {
    event.preventDefault();
    let isValid = true;
    if (selectedUserId === '') {
      setSelectedUserError('Please select a user');
      isValid = false;
    }
    if (title === '') {
      setTitleError('Please type a title');
      isValid = false;
    }
    if (body === '') {
      setBodyError('Please type a body');
      isValid = false;
    }
    if (isValid) {
      setIsSubmitting(true);
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, userId: +selectedUserId })
      })
        .then((response) => [
          response.json(),
          response.status,
          response.statusText,
          response.ok
        ])
        .then(([data, status, statusText, ok]) => {
          setIsSubmitting(false);
          setAlertMessage(statusText);
          setIsAlertVisible(true);
          if (ok) {
            setAlertVariant('success');
          } else {
            setAlertVariant('danger');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setIsSubmitting(false);
          setAlertMessage(error.toString());
          setIsAlertVisible(true);
          setAlertVariant('danger');
        });
    }
  };

  return (
    <Container as="main" style={{ marginTop: '3rem' }}>
      <h1 style={{ marginBottom: '3rem' }}>Form</h1>
      <Form noValidate onSubmit={onClickSubmit}>
        {isAlertVisible && (
          <Alert
            variant={alertVariant}
            dismissible
            onClose={() => {
              setIsAlertVisible(false);
            }}
          >
            <Alert.Heading>{alertMessage}</Alert.Heading>
          </Alert>
        )}
        <Control
          options={users}
          optionNameKey={'name'}
          optionValueKey={'id'}
          label={'User'}
          onChange={onChangeUser}
          value={selectedUserId}
          errorMessage={selectedUserError}
        />
        <Form.Group controlId="title" hasValidation>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={onChangeTitle}
            required
            isInvalid={titleError}
          />
          <Form.Control.Feedback type="invalid">
            {titleError}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="body" hasValidation>
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            name="body"
            value={body}
            onChange={onChangeBody}
            required
            isInvalid={bodyError}
          />
          <Form.Control.Feedback type="invalid">
            {bodyError}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" disabled={isSubmitting} variant="dark">
          {isSubmitting && (
            <span className="spinner-container">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </span>
          )}
          Submit
          <span className="sr-only">Submitting</span>
        </Button>
      </Form>
    </Container>
  );
}
