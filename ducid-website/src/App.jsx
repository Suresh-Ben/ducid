import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import About from './pages/About';
import Home from './pages/Home';
import Student from './pages/Student';
import Verifier from './pages/Verifier';
import College from './pages/College';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>

        <Route exact path="/college">
          <College/>
        </Route>
        <Route exact path ="/student">
          <Student/>
        </Route>
        <Route exact path ="/verifier">
          <Verifier/>
        </Route>
        <Route exact path = "/about">
          <About/>
        </Route>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;