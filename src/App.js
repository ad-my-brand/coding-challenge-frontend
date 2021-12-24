import React from "react";
import { Route, Switch } from "react-router-dom";
import FormControl from "./FormControl";
import SimpleMap from "./Map";
import Navbar from "./Navbar";
const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/">
          <FormControl />
          <SimpleMap />
        </Route>
        <Route exact path="/map">
          <SimpleMap />
        </Route>
      </Switch>
    </>
  );
};

export default App;
