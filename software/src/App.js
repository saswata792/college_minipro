
import './App.css';
import Header from './components/home.js';
import Signup from './components/signup.js';
import Profileuser from './components/profileuser.js'; 
import Profileadmin from './components/profileadmin.js';
import Measure from './components/measure.js';
import Critical from './components/critical.js'; 
import Book from './components/book.js';
import React from "react"; 
import {
  HashRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";


function App() {
  return (
    <React.Fragment>
    <div>
    
    
      <Router>
        
        <Switch>
            <Route exact path="/">
              <Header/>
            
              
            </Route>
            <Route exact path="/signup">
              <Signup/>
            
            </Route>
            <Route exact path="/profileuser">
              <Profileuser/>
            </Route>
            <Route exact path="/profileadmin">
              <Profileadmin/>
            </Route>
            <Route exact path="/measure">
              <Measure/>
            </Route>
            <Route exact path="/critical">
              <Critical/>
            </Route>
            <Route exact path="/book">
              <Book/>
            </Route>
            
        </Switch>
      </Router>
    </div>
    </React.Fragment>
    
  );
}

export default App;
