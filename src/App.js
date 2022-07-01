import PostForm from './Components/FormControl';
import Users from './Components/Users';


const  App = ()=> {
  return (
    <>
    <h1>WELCOME USERS......</h1><hr />
      <div className="App">
        <Users />
        <PostForm />
      </div>
    </>
    
  );
}

export default App;