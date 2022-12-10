import React from 'react';
import FormControl from './FormControl';
import Location from '../Location';
import { BiMessageAltError } from 'react-icons/bi';
import { createPost } from '../../utils/api';
import { TiTick } from 'react-icons/ti';
import { AiFillCloseCircle } from 'react-icons/ai';
import HashLoader from 'react-spinners/HashLoader';
import { DataContext } from '../../pages';

const INPUTCLASS =
  'border-b border-gray-300 focus:outline-none focus:border-blue-900 focus:border-b-2 p-2 w-full';

const FORMCLASS =
  'w-full h-auto bg-white  border-gray-400 p-8 py-6 flex flex-col items-center gap-y-8 font-sans shadow-md';

const H2CLASS =
  'text-4xl font-sans text-blue-900 w-full text-center pb-2 border-gray-400';

const ERRORCLASS = 'text-red-500 font-sans text-sm';

const Form = () => {
  const users = React.useContext(DataContext);

  const formRef = React.useRef(null);
  const labelTxt = React.useRef('User:');
  const [errors, setErrors] = React.useState({});
  const [userSelected, setUserSelected] = React.useState();
  const [userSelectErrorMsg, setUserSelectErrorMsg] = React.useState();
  const titleRef = React.useRef(null);
  const bodyRef = React.useRef(null);
  const [postCreated, setPostCreated] = React.useState();
  const [showToast, setShowToast] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [color] = React.useState('blue');

  const submitForm = async () => {
    const form = formRef.current;
    let errors = {};
    // const title = form.querySelector('#title').value;
    const title = titleRef.current.value;
    const body = bodyRef.current.value;
    const userSelect = form.querySelector('select');

    // selected user validator
    validationFn(userSelect.value);

    // title and body validator
    function titleAndBodyValidator() {
      // run title and body validation
      if (title.length <= 0) {
        errors.isTitleValid = false;
      } else {
        errors.isTitleValid = true;
      }

      if (body.length <= 0) {
        errors.isBodyValid = false;
      } else {
        errors.isBodyValid = true;
      }
      let isFormValid = true;

      Object.values(errors).map((key) => {
        if (key === false) {
          isFormValid = false;
          return;
        }
      });

      return isFormValid;
    }

    const isFormValid = titleAndBodyValidator();

    if (!isFormValid) {
      setErrors(errors);
    } else {
      // submit the data
      setErrors({});
      console.log('submitting the data');
      const formBody = {
        title,
        body,
        userId: userSelect.value,
      };
      setLoading(true);
      try {
        const res = await createPost(formBody);
        setShowToast(true);

        setPostCreated(true);
      } catch (error) {
        setShowToast(true);
        setPostCreated(false);
      }
      setLoading(false);
      setUserSelected();
    }
  };

  const validationFn = (val) => {
    if (val === 'select user') {
      setUserSelected(null);
      setUserSelectErrorMsg('Please select a User');
    } else {
      setUserSelected(val);
      setUserSelectErrorMsg();
    }
  };
  return (
    <div className='related flex items-center justify-center'>
      {loading ? (
        <div>
          <HashLoader
            color={color}
            loading={loading}
            size={50}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        </div>
      ) : (
        <>
          <form
            ref={formRef}
            className={`${FORMCLASS}  ${showToast && 'hidden'} 
            `}
          >
            <h2 className={H2CLASS}>Postmaker.</h2>

            {/* Form control component */}
            <FormControl
              label={labelTxt.current}
              validationFn={validationFn}
              errorMsg={userSelectErrorMsg}
            />
            <div className='w-full  overflow-hidden location-input'>
              <label htmlFor='location'>Location</label>
              {userSelected ? (
                <Location
                  center={[
                    Number(users[userSelected - 1].address.geo.lat),
                    Number(users[userSelected - 1].address.geo.lng),
                  ]}
                />
              ) : (
                <p className='w-full mt-3 border border-gray-300 font-sans text-xs p-4 flex items-center justify-center'>
                  <span className='text-lg mr-3'>
                    <BiMessageAltError />
                  </span>
                  <span>Please select a user to display the location</span>
                </p>
              )}
            </div>
            <div className='flex flex-col gap-6 w-full input-group'>
              <div className='w-full'>
                <input
                  ref={titleRef}
                  type={'text'}
                  id='title'
                  required
                  placeholder='Title'
                  className={INPUTCLASS}
                />
                {errors && errors.isTitleValid === false && (
                  <p className={ERRORCLASS}>Title is not valid</p>
                )}
              </div>
              <div>
                <input
                  ref={bodyRef}
                  type={'text'}
                  required
                  id='body'
                  placeholder='Body'
                  className={INPUTCLASS}
                />
                {errors && errors.isBodyValid === false && (
                  <p className={ERRORCLASS}>Body is not valid</p>
                )}
              </div>
            </div>

            <div className='w-full'>
              <button
                type='button'
                onClick={submitForm}
                className='bg-blue-900 text-white p-2 w-full'
              >
                Create Post
              </button>
            </div>
          </form>
          {showToast && (
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-96 h-auto p-4 py-8 font-sans z-10  border border-blue-900 border-opacity-50 rounded-md  '>
              <div className='text-blue-900 flex items-center justify-between gap-2 text-xl   border-opacity-30 '>
                <div className='text-3xl flex items-center'>
                  {postCreated === true && (
                    <>
                      <TiTick />
                      <p className='text-xl'>Post created,success! 🎉</p>
                    </>
                  )}
                  {postCreated === false && (
                    <>
                      <TiTick />
                      <p className='text-xl text-red-500'>
                        Post not created,failed! ❌
                      </p>
                    </>
                  )}
                </div>
                <button
                  className='text-2xl'
                  onClick={() => setShowToast(false)}
                >
                  <AiFillCloseCircle />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Form;
