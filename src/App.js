import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users,setUsers]=useState()
  const [notification,setNotification]=useState(false)
  const [errors,setErrors]=useState()
  const initialvalues={
    title:'',
    body:'',
    userId:''
  }
  const[values,setValues]=useState(initialvalues)
  useEffect(()=>{
setTimeout(() => {
  fetch('https://jsonplaceholder.typicode.com/users').then(e=>e.json())
  .then(data=>{
    console.log(data)
    setUsers(data)})


}, 4000);
  },[])
  const validate=(fieldValues=values)=>{
    console.log(fieldValues,'rajeshuyttrwe')
    let temp = { ...errors }
    if ('userId' in fieldValues)
        temp.fullName = fieldValues?.userId ? "" : "This field is required."
    if ('title' in fieldValues)
        temp.title = fieldValues.title.length>0 ? "" : "Title cannot be empty."
    if ('body' in fieldValues)
        temp.body = fieldValues.body.length > 0? "" : "Body cannot be empty."
    setErrors({
        ...temp
    })
    console.log(temp)
    if (fieldValues == values)
        return Object.values(temp).every(x => x == "")
}
 
const handlechange=(e)=>{
  console.log('tyui',e.target.value,e.target.name)
  var name=e.target.name
   var value=e.target.value
   console.log(value,'goat')
   if(name==='userId'){
    var a=users.find((u)=>u.username===value)
    console.log(a,'googly')
    setValues({...values,[name]:a})
   }
   else{
   setValues({...values,[name]:value})
   }
validate ({[name]:value,values,errors,setErrors})
}
const handlesubmit=(e)=>{
e.preventDefault()
if(validate()){
  console.log('ok bro')
  var obj={userId:values.userId.id,body:values.body,title:values.title}
  var data=JSON.stringify(obj);
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: "post", headers: {'Content-Type': 'application/json'}, 
    body:data,
})
setValues(initialvalues)
}
else{
  alert('fill all the fields')
  console.log('sorry bro')
}
setNotification(true)
setTimeout(() => {
 setNotification(false) 
}, 2000);
}
  return (
    <>
   <div className='app'>
  <form  onSubmit={handlesubmit} className='form'>
    <label for='user'>choose the user
    </label>
    <select name='userId' id='userId' className='select' value={values?.userId&&values.userId} onChange={handlechange}>
    <option value={values?.username?values.username:'choose the user'}>{values?.userId.username?values.userId.username:'choose the user'}</option>
      {users?.map((a)=><>

        <option  key = {a.id} value={a.username}>{a.username}</option>
      </>)}
    </select>
    <h5 className='error'>{errors?.username&&errors.username}</h5>
    <label for='title'>title
    </label>
    <input type='text' alt='' name='title' className='inputtext' value={values?.title&&values.title} onChange={handlechange}/>
    <h5 className='error'>{errors?.title&&errors.title}</h5> 
    <label for='body'>body
    </label>
    <input type='text' alt='' name='body' className='inputtext' value={values?.body&&values.body} onChange={handlechange}/>
    <h5 className='error'>{errors?.body&&errors.body}</h5>
    <input type='submit' className='submitbtn'/>
    <h5 className='error'>{notification&&'Posted successfully'}</h5>
    </form>
   </div>
      </>
  );
}

export default App;
