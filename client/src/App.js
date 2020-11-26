import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Blogs from './components/pages/Blogs';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Subscribe from './components/pages/Subscribe';




function App() {
 
  return (
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/blogs"  component={Blogs} />
        <Route path="/about"  component={About} />
        <Route path="/contact"  component={Contact} />
        <Route path="/subscribe"  component={Subscribe} />
        
      </Switch>
    </Router>
    </>
  );
}

export default App;
