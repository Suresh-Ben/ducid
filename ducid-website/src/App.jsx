import React from 'react';
import {BrowserRouter as Router, Route, Switch, useParams} from 'react-router-dom';

import './App.css';
import About from './pages/About';
import Home from './pages/Home';
import Student from './pages/Student';
import Verifier from './pages/Verifier';
import College from './pages/College';
import Auth from './pages/Auth/Auth';
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
        <Route exact path = "/auth">
          <Auth/>
        </Route>
        <Route path = "/api/isStudent/:id" element={<IsStudent />} />
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </Router>
  );
}

function IsStudent() {
  const params = useParams();
  console.log(params);
}

export default App;