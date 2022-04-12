import './App.css';
import UserList from './components/UserList';
import PostForm from './components/PostForm';

function App() {
  return (
    <div className="app">
    <div className='container'>
    <h1 className='display-1 text-center'>Welcome!</h1>
    <div className="row">
    <div className="col">
    <PostForm /></div>
    <div className="col">
    <UserList />
    </div>
    </div>
    </div>
    </div>
  );
}

export default App;
