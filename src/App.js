import './App.css';
import { useEffect } from 'react';

import Home from './screens/Home';
import Alert from './components/Alert';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { fetchUser } from './store/actions/user';

function App() {
  useEffect(() => {
    store.dispatch(fetchUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
