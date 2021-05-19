import React from 'react';
import { useHistory } from "react-router-dom";
import Mainchecker from "./mainchecker.js";
import firebase from "./fire.js";
var db=firebase.database();
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
  function measured(){
    db.ref("user/").child(Mainchecker.getProfile()).get().then((snapshot)=>
    {
      let content=``;
      var str;
      Object.keys(snapshot.val()).map((data)=>
      (
       str=snapshot.val()[data]
      (str.localeCompare("basicinfo")) ? null 
        : `<div class="one">
        
          <label htmlFor="spotwo">SPO2</label>
          <div>${snapshot.val()[data]["spotwo"]}</div>
      
          <label htmlFor="heartrate">HEARTRATE</label>
          <div>${snapshot.val()[data]["heartrate"]}</div>
          <label htmlFor="time">TIME</label>
          <div>${snapshot.val()[data]["time"]}</div>
          <label htmlFor="time">DATE</label>
          <div>${snapshot.val()[data]["date"]}</div>
        </div>`
        )).forEach((element)=>
        {
          content+=element;
        })
        document.getElementById("measure").innerHTML=content;
    })
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



 


  
  
    
  