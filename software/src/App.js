
import './App.css';
import Header from './components/home.js';
import Signup from './components/signup.js';
import Profileuser from './components/profileuser.js'; 
import React from "react"; 
import {
  BrowserRouter as Router,
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
        </Switch>
      </Router>
    </div>
    </React.Fragment>
    
  );
}

export default App;