import React from 'react';
import { useHistory } from "react-router-dom";
import Mainchecker from "./mainchecker.js";
 
 function Measure()
 {
  let history=useHistory();
  function profile()
  {
    history.push('/profileuser');
  }
  function logout()
  {
      history.push("/");

  }
  return(
      <React.Fragment>
      <div class="one">
        <button id="logout" onClick={logout}>Logout</button>
        <label htmlFor="spotwo">SPO2</label>
        <input id="spotwo"className="spotwo" value={Mainchecker.getProfile()["time"]["spotwo"]}></input>
        <label htmlFor="heartrate">HEARTRATE</label>
        <input id="heartrate"className="heartrate" value={Mainchecker.getProfile()["time"]["heartrate"]}></input>
        <label htmlFor="time">TIME</label>
        <input id="time" className="time" value={Mainchecker.getProfile()["time"]["time"]}></input>
      </div>
      <button id="profile" onClick={profile}>Profile</button>
      </React.Fragment>
  )

}
  
export default Measure;



 


  
  
    
  