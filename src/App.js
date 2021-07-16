import { useCallback, useEffect, useState } from 'react';
import classes from './App.module.css';
import FormControl from './components/FormControl/FormControl';
import Map from './components/Map/Map';

const initialState = {
  title: '',
  body: '',
  userId: '',
};

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [inputValues, setInputValues] = useState(initialState);
  const { title, body, userId } = inputValues;
  const userIdNum = Number.parseInt(userId);

  const [isUserSelected, setIsUserSelected] = useState(false);
  const [selectedUserLocation, setSelectedUserLocation] = useState({});

  const [inputError, setInputError] = useState({
    titleError: null,
    bodyError: null,
  });

  const [httpError, setHttpError] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getApiResponse = async (isGet = true, headers = {}) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/${isGet ? 'users' : 'posts'}`,
      headers
    );
    if (!response.ok) {
      throw new Error(
        `Something went wrong while ${isGet ? 'fetching' : 'posting'} user data`
      );
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  };

  const fetchUserData = useCallback(() => {
    setIsLoading(true);
    getApiResponse()
      .then((jsonResponse) => {
        setIsLoading(false);
        setUsers(jsonResponse);
      })
      .catch((responseError) => {
        setHttpError(responseError.message);
      });
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleValueChange = (event) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });

    if (event.target.name === 'title') {
      setInputError({
        ...inputError,
        titleError: event.target.value ? null : 'Title cannot be empty',
      });
    }

    if (event.target.name === 'body') {
      setInputError({
        ...inputError,
        bodyError: event.target.value ? null : 'Body cannot be empty',
      });
    }

    if (event.target.type === 'radio') {
      setIsUserSelected(true);
      const selectedUser = users.find(
        (user) => user.id === Number.parseInt(event.target.value)
      );
      setSelectedUserLocation({
        lat: Number.parseFloat(selectedUser?.address.geo.lat),
        lng: Number.parseFloat(selectedUser?.address.geo.lng),
      });
    }
  };

  const postData = async (data) => {
    setIsSubmitting(true);
    getApiResponse(false, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((jsonResponse) => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        console.log(jsonResponse);
      })
      .catch((responseError) => {
        setIsSubmitted(false);
        setHttpError(responseError.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputError({
      titleError: title ? null : 'Title cannot be empty',
      bodyError: body ? null : 'Body cannot be empty',
    });
    if (!title || !body || !userIdNum) return;
    postData({ ...inputValues, userId: userIdNum });
    setInputValues(initialState);
  };

  let userSelectError;

  if (users.length) {
    if (!isUserSelected) {
      userSelectError = <p className="error-text">Please select a user</p>;
    } else {
      userSelectError = null;
    }
  }

  let postError;
  if (users.length) {
    if (httpError) {
      postError = <p className="error-text">{httpError}</p>;
    }
  }

  return (
    <div className={classes.App}>
      <form onSubmit={handleSubmit}>
        <>{isLoading && !httpError && <p>Users are Loading...</p>}</>
        <div className={classes.users}>
          {users.length ? (
            <p className={classes['users-title']}>Users List:</p>
          ) : null}
          <div className={classes['users-list']}>
            {users.length ? (
              users.map((user) => {
                return (
                  <FormControl
                    key={user.id}
                    name="userId"
                    label={user.name}
                    id={user.id}
                    type="radio"
                    value={user.id}
                    onChange={handleValueChange}
                  />
                );
              })
            ) : (
              <p className="error-text">{httpError}</p>
            )}
          </div>
        </div>
        <div className={classes['text-inputs']}>
          <FormControl
            name="title"
            label="Title"
            onChange={handleValueChange}
            value={title}
            error={inputError.titleError}
          />
          <FormControl
            name="body"
            label="Body"
            onChange={handleValueChange}
            value={body}
            error={inputError.bodyError}
          />
        </div>
        <button data-testid='submit-btn'>Submit</button>
        <>
          {isSubmitting && !httpError && (
            <p>Your request is being submitted...</p>
          )}
        </>
        <>{isSubmitted && <p>Successfully submitted!</p>}</>
        {postError}
      </form>
      {isUserSelected ? (
        <Map className={classes.Map} center={selectedUserLocation} />
      ) : (
        userSelectError
      )}
    </div>
  );
}

export default App;
