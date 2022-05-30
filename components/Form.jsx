import { useCallback, useState, useContext } from 'react';
import { URL_POST } from '../config';
import Button from './Button';
import FormControl from './FormControl';
import ErrorContext from '../context/errors';
import UserContext from '../context/user';
import InputContext from '../context/input';
import useHttp from '../hooks/use-http';
import Spinner from './UI/Spinner';
import Notification from './UI/Notification';

const Form = ({ className, users }) => {
  const { isLoading, error, success, sendRequest: post } = useHttp();

  const { errors, setUserError, setTitleError, setBodyError } =
    useContext(ErrorContext);

  const { inputValues, setTitle, setBody } = useContext(InputContext);

  const {
    selectUser: { user },
  } = useContext(UserContext);

  const [submitResponse, setSubmitResponse] = useState({
    isSubmitted: false,
    formIsValid: false,
  });

  const userValidate = useCallback(value => value !== null, []);
  const titleValidate = useCallback(value => value.trim() !== '', []);
  const bodyValidate = useCallback(value => value.trim() !== '', []);

  const reset = () => {
    setBody('');
    setTitle('');
    setTitleError(true);
    setBodyError(true);
    setSubmitResponse({
      isSubmitted: false,
      formIsValid: false,
    });
  };

  const formSubmitHandler = e => {
    e.preventDefault();

    const formIsValid = !errors.body && !errors.title && (user ? true : false);

    setSubmitResponse({
      isSubmitted: true,
      formIsValid,
    });

    if (!formIsValid) {
      return;
    }

    const checkResponse = res => {
      if (res.status >= 200 && res.status < 300) {
        reset();
        return true;
      }
      return false;
    };

    // Sending posts to the server
    post(
      URL_POST,
      {
        title: inputValues.title,
        body: inputValues.body,
        userId: user.id,
      },
      checkResponse
    );
  };

  const userErrMsg = 'Please select a user!';
  const titleErrMsg = 'Please enter a valid title!';
  const bodyErrMsg = 'Please enter a valid body message!';

  return (
    <form onSubmit={formSubmitHandler} className={className}>
      {isLoading && <Spinner />}
      {error && <Notification fail={true} msg={error.message} />}
      {success && <Notification msg="Data sent successfully!" />}
      <FormControl
        users={users}
        type="select"
        value={user}
        error={errors.user}
        errMsg={userErrMsg}
        setError={setUserError}
        submit={submitResponse}
        validate={userValidate}
      />

      <FormControl
        label="title"
        value={inputValues.title}
        onChange={setTitle}
        error={errors.title}
        errMsg={titleErrMsg}
        setError={setTitleError}
        submit={submitResponse}
        validate={titleValidate}
      />

      <FormControl
        label="body"
        value={inputValues.body}
        onChange={setBody}
        error={errors.body}
        errMsg={bodyErrMsg}
        type="textarea"
        setError={setBodyError}
        validate={bodyValidate}
        submit={submitResponse}
      />

      <Button type="submit" className="rect">
        Submit
      </Button>
    </form>
  );
};

export default Form;
