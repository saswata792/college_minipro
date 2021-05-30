import React from 'react';
import './measure.css';
import { useHistory } from "react-router-dom";
import Mainchecker from "./mainchecker.js";
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
      console.log("hello");

  }
  function measured(){
      let content=``;
      
      Object.keys(snapshot).map((data)=>
      (
       
       
      (snapshot[data]["username"]===undefined) ?
      
      `<div class="newtwo">

      <table id = "table2">
                
        <tr>
        <th><label htmlFor="spotwo">SPO2 - </label></th>
        <th><label htmlFor="heartrate">HEART RATE - </label> </th>
        <th><label htmlFor="time">TIME - </label> </th>
        <th><label htmlFor="time">DATE - </label> </th>
        </tr>

      <tr>
      <td><div> ${snapshot[data]["spotwo"]}</div></td>
      <td><div>${snapshot[data]["heartrate"]}</div></td>
      <td><div>${snapshot[data]["time"]}</div></td>
      <td><div>${snapshot[data]["date"]}</div></td>
      </tr>
      </br>
      </table>
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

            <div class="header3">
            <h1>YOU HAVE SUCCESSFULLY SIGNED IN</h1>
            </div> 
         <button id="logout" onClick={logout}><div class = "t3"><b>LOGOUT</b></div></button>
         <button id="profile" onClick={profile}><div class = "t3"><b>PROFILE</b></div></button>
         <div class="b61"><button onClick={measured}><div class = "t3"><b>MEASURE</b></div></button></div>
         <div  id="measure"></div>
      
      </React.Fragment>
  )

}
  
export default Measure;



 


  
  
    
  