import React from 'react';
import { useHistory } from "react-router-dom";
import Mainchecker from "./mainchecker.js";
//import firebase from "./fire.js";
//var db=firebase.database();
 function Measure()
 {
  let history=useHistory();
  let snapshot=Mainchecker.getProfile();
  function profile()
  {
    history.push('/profileuser');
  }
  function logout()
  {
      history.push("/");

  }
  function measured(){
    // db.ref("user/").child(Mainchecker.getProfile()).get().then((snapshot)=>
    // {
      let content=``;
      
      Object.keys(snapshot).map((data)=>
      (
       
       
      (snapshot[data]["username"]===undefined) ?`<div class="one">
        
      <label htmlFor="spotwo">SPO2</label>
      <div>${snapshot[data]["spotwo"]}</div>
  
      <label htmlFor="heartrate">HEARTRATE</label>
      <div>${snapshot[data]["heartrate"]}</div>
      <label htmlFor="time">TIME</label>
      <div>${snapshot[data]["time"]}</div>
      <label htmlFor="time">DATE</label>
      <div>${snapshot[data]["date"]}</div>
    </div>`: `` 
        
        )).forEach((element)=>
        {
          content+=element;
        })
        document.getElementById("measure").innerHTML=content;
   // })
  }
  return(
      <React.Fragment>
         <button id="logout" onClick={logout}>Logout</button>
         <button id="profile" onClick={profile}>Profile</button>
         <button onClick={measured}>Measure</button>
         <div  id="measure"></div>
      
      </React.Fragment>
  )

}
  
export default Measure;



 


  
  
    
  