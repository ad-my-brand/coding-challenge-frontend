import React, { useState, useEffect, useCallback } from 'react';
import ListPopulate from './ListPopulate';
import Emap from './Emap';


const dummy_data = [
  {
    title: 'dummytitle',
    body: 'ab'
  },
  {
    title: 'dummytitle2',
    body: 'abc'
  },
  {
    title: 'dummytitle3',
    body: 'aop'
  }

]

const FormControl = (props) => {


// json object data states_and_properties


const [jsony, setjsony] = useState(dummy_data);

const addjsonHandler = (jsony) => {
  setjsony((prevjsony) => {
    return [jsony, ...prevjsony];
  });
};

// ***********



  // fetch api states

  const [error, setError] = useState(null);
  const [json, setjson] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // **


  const [enteredName, setEnteredName] = useState('');
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredBodyTouched, setEnteredBodyTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== '';
  const enteredBodyIsValid = enteredBody.trim() !== '';
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  const BodyInputIsInvalid = !enteredBodyIsValid && enteredBodyTouched;

// fetch fetch ****************************************************************




 

 




  function addMovieHandler(movie) {
    console.log(movie);
  }

  let content = <p></p>;

  if (json.length > 0) {
    // content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }





// ************************************************************************************************


  let formIsValid = false;

  if (enteredNameIsValid && enteredBodyIsValid) { 
    formIsValid = true;
  }

  const enteredObject = {
    title : enteredName,
    body : enteredBody
  }

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  
  };
  const BodyInputChangeHandler = (event) => {
    setEnteredBody(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  const BodyInputBlurHandler = (event) => {
    setEnteredBodyTouched(true);
  };



  //form submission function

  const formSubmissionHandler = (event) => {
    event.preventDefault();
  
    setEnteredNameTouched(true);
    setEnteredBodyTouched(true);

    if (!(enteredNameIsValid && enteredBodyIsValid)) {
      return;
    }

    // handling errors in fetch with faulty parameters

    console.log(enteredName);

    // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM
    setEnteredName('');
    setEnteredBody('');
    setEnteredNameTouched(false);
    setEnteredBodyTouched(false);


// fetch api json placeholder error free










    console.log(enteredObject)
  };

  //fetxh api function




const[data,setData] = useState('');
async function FetchEntity() {
setError(null)
try {
  const Response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: enteredObject.title,
      body: enteredObject.body,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
const data = await Response.json();
setData(data)
console.log(data)
}catch(error){
  setError(error.message);
  console.log("something went wrong")

}





}


















  const nameInputClasses = nameInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';


    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    // .then(response => response.json())
    // .then(json => console.log(json))


   


  return ( <>
   <div style={{display: 'flex',justifyContent: 'space-between'}}>
 <div>
 <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Title</label>
        <input
          type='text'
          id='name'
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className='error-text'>Title must not be empty.</p>
        )}
      </div>

      <div className={nameInputClasses}>
        <label htmlFor='name'>Body</label>
        <input
          type='text'
          id='name'
          onChange={BodyInputChangeHandler}
          onBlur={BodyInputBlurHandler}
          value={enteredBody}
        />
        {BodyInputIsInvalid && (
          <p className='error-text'>Body must not be empty.</p>
        )}
      </div>


      <div className='form-actions' style={{borderBottom: '2px solid green',
marginTop: '-15%',
display: 'inline-block',
transform: 'translateY(39px)'}}>
        <button disabled={!formIsValid} style={{marginBottom: '18%',
paddingTop: '0em',
marginRight: '26%'}} onClick={FetchEntity} >Submit</button>
      </div>
    </form>
 </div>
<div>
<p style={{fontSize: '18px',fontWeight: 'bold',fontFamily:'monospace',backgroundColor:'#ededed'}}>{content}</p>

</div>
   </div>
    <div style={{marginLeft:'13%',display:'flex',justifyContent: 'space-around',paddingTop: '3em'}}>
<ListPopulate 
prop={enteredObject}
items={jsony}
fetch={data.title}
onAddExpense={addjsonHandler}
></ListPopulate>
<Emap></Emap>
</div>

    </>
  );
};

export default FormControl;
