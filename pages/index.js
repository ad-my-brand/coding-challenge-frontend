import styles from "../styles/Home.module.css";
import Input from "./components/Input";
import Dropdown from "./components/Dropdown";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import MapChart from "./MapChart";
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Home({ data }) {
  const [id, setId] = useState(-1);
  const onSubmit = (data) => {
    
  };
  

  const bodyF = (input, message) => input.length > 10;  //validation functions
  const titleF = (input, message) => input.length > 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  


const postData = (da)=>{                                          // post data function
  axios.post('https://jsonplaceholder.typicode.com/posts/', {
    title: da.title,
    body: da.body,
    userId : id+1

  })
  .then(function (response) {
  
    let timerInterval
    Swal.fire({
      title: 'Uploaded Successfully',
      html: 'The data is successfully posted to the server',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {                                             //sweet alert timed alert
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          if(b!=null)
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  })
  .catch(function (error) {
    let timerInterval
    Swal.fire({
      title: 'Post data failed',
      html: 'check your internet connection',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          if(b!=null)
           b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
     
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  });
}

  return (
    <div className={styles.container}>

      <form
        className="form-control d-flex-column"
        onSubmit={handleSubmit((da) =>
          id == -1
            ? !da.body && !da.title
              ? alert("select  a user")
              : null
            : postData(da)
        )}
      >
        <div>
          {" "}
          <div className="form-group  col-md-offset-6">
            <Dropdown
              label="user"                               //form control of dropdown type
              set={setId}
              options={[...data.map((m) => m)]}
            ></Dropdown>
          </div>
          <div className="form-group">
            <Input
              label="title"
              valF={titleF}
              message={"dont leave me empty"}                   //form control component of input type
              reg={register}                        //label , validating function , message , validation register
            ></Input>
            <p className="form-text text-danger">
              {" "}
              {errors != null && errors.title != null
                ? errors.title.message
                : null}
            </p>
          </div>
          <div>
            <Input
              label="body"
              valF={bodyF}
              message={"at least 10characters are needed"}
              reg={register}
            ></Input>
            <p className="form-text text-danger">
              {" "}
              {errors != null && errors.body != null
                ? errors.body.message
                : null}{" "}
            </p>
          </div>
          <button
            className="form-control w-50  p-15 m-10"
            onClick={() => {
              if (id == -1) alert("please select a user");
            }}
            type="submit"
          >
            POST
          </button>
        </div>{" "}
      </form>
      <div>{id == -1 ? null : <MapChart geo={data[id]}></MapChart>}</div>     
    </div>
  );
}

export async function getServerSideProps() {
  
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);  //populating data
  const data = await res.json();


  return { props: { data } };
}
