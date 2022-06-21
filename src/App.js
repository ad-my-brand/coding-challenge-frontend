import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import FormControl from './components/FormControl';
import FetchForm from './components/FetchForm';
import PostForm from './components/PostForm';
import Options from './components/Options';
function App() {
  return (
    <div className="App">
       <Routes>
      <Route path="/" element={<Options />} />
      <Route path="/form" element={<FormControl />} />
      <Route path="/fetchdata" element={<FetchForm />} />
      <Route path="/postdata" element={<PostForm />} />
    </Routes>
    </div>
  );
}

export default App;
