import React from 'react';
import { useHistory } from "react-router-dom";
import Mainchecker from "./mainchecker.js";
import firebase from 'fire.js';
db=firebase.database(); 
 function Critical()
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
  function fetchTime() {
    const time = new Date();
    const day = time.getDate().toString();
    const month = (time.getMonth() + 1).toString();
    const year = time.getFullYear().toString();
    const hours = time.getHours().toString();
    let mint = time.getMinutes();
    if (mint < 10) mint = "0" + mint.toString();
    let sec = time.getSeconds();
    if (sec < 10) sec = "0" + sec.toString();
    return day + month + year + hours + mint + sec;
  }
  function Book(critical)
  {

        var book_time=fetchTime();
        db.ref("/admin").child(Mainchecker.getProfile()).child("16052021182752").set({
            Bookedby:Mainchecker.getProfile(),
            dayte:book_time[0]+""+book_time[1]+"/"+book_time[2]+""+book_time[3]+"/"+book_time[4]+""+book_time[5]+""+book_time[6]+""+book_time[7],
            time:book_time[8]+""+book_time[9]+":"+book_time[10]+""+book_time[11]+":"+book_time[12]+""+book_time[13]  ,
            patientusrnm :critical["basicinfo"].username,
            patientaddr: critical["basicinfo"].address,
            patientcontnm: critical["basicinfo"].ContactNumber
        })

  }
  var critical=db.ref("critical/").get()

  
  return(
      <React.Fragment>
          <button id="logout" onClick={logout}>Logout</button>
      
      for(i=0;i<(Object.keys(critical).length);i++)
      {
         <div class="one">
         <label htmlFor="usrnm">Username</label>
        <input id="usrnm"className="usrnm" value={critical["time"]["spotwo"]}></input>
        <label htmlFor="spotwo">SPO2</label>
        <input id="spotwo"className="spotwo" value={critical[i]["time"]["spotwo"]}></input>
        <label htmlFor="heartrate">HEARTRATE</label>
        <input id="heartrate"className="heartrate" value={critical[i]["time"]["heartrate"]}></input>
        <label htmlFor="time">TIME</label>
        <input id="time" className="time" value={critical[i]["time"]["time"]}></input>
        <button id="book" onclick={Book(critical[i])}>Book</button>
        </div>
      }
      <button id="profile" onClick={profile}>Profile</button>
      </React.Fragment>
  )

}
  
export default Critical;



 

