import React from 'react';
import { useHistory } from "react-router-dom";
import Mainchecker from "./mainchecker.js";
import firebase from './fire.js';
var db=firebase.database();
var cb=firebase.database();
 function Critical()
 {
   
  let history=useHistory();
  function profile()
  {
    history.push('/profileadmin');
  }
  function logout()
  {
      history.push("/");

  }
  function fetchTime() {
    const time = new Date();
    const day = time.getDate().toString();
    let month = (time.getMonth() + 1).toString();
    if(month < 10) month="0"+ month.toString();
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
        db.ref("user/").child(critical).get().then((snapshot)=>
        {
        
        console.log(snapshot.val()["basicinfo"]["username"]);
        db.ref("admin/").child(Mainchecker.getProfile()).child(book_time).set({
            Bookedby:Mainchecker.getProfile(),
            date:book_time[0]+""+book_time[1]+"/"+book_time[2]+""+book_time[3]+"/"+book_time[4]+""+book_time[5]+""+book_time[6]+""+book_time[7],
            time:book_time[8]+""+book_time[9]+":"+book_time[10]+""+book_time[11]+":"+book_time[12]+""+book_time[13]  ,
            patientusrnm :snapshot.val()["basicinfo"]["username"],
            patientaddr: snapshot.val()["basicinfo"]["Address"],
            patientcontnm: snapshot.val()["basicinfo"]["ContactNumber"]
        }).then(()=>{
          alert("Booked Successfully");
          cb.ref("critical/").child(critical).remove();
        }).catch((error)=>
        {
          alert("error",error)
        })
        
      })
  }
  // async function hari()
  // {
  //   var critical=await db.ref("critical/").get();
  //   //console.log(critical);
  //   return critical["username"];  
  // }
  // var critical=db.ref("critical/").get();
  
  // critical.forEach((data)=>{
  //   console.log(data);
  // })
  function onDemand()
  {
    
      db.ref("crtical/").get().then((snapshot)=>
      {
        // console.log(data.key)
        //   console.log(data.val())
        //   console.log(data.val()["username"])
        //   console.log(data.val().username)
        let val=snapshot.val();
        let content=``;
        
        Object.keys(val).map((data)=>
        (
        cb.ref("user/").child(val[data]["username"]).get().then((snap)=>
        {
            var dat=snap.val()
            `<div class="one">
                <table>
                  <tr><label htmlFor="usrnm">USERNAME</label></tr>
                  <td><div id="usrnm">${val[data]["username"]}</div></td>
                  <tr></tr>
                  <tr><label htmlFor="addr">ADDRESS</label></tr>
                  <td><div id="addr">${dat["basicinfo"]["Address"]}</div></td>
                  <tr></tr>
                  <tr><label htmlFor="contactnm">CONTACTNUMBER</label></tr>
                  <td><div id="contactnm">${dat["basicinfo"]["ContactNumber"]}</div></td>
                  <tr></tr>

                  <tr><label htmlFor="dob">DATE OF BIRTH</label></tr>
                  <td><div id="dob">${dat["basicinfo"]["DateofBirth"]}</div></td>
                  <tr></tr>
                  <tr><label htmlFor="spotwo">SPO2</label></tr>
                  <td><div id="spotwo">${val[data]["spotwo"]}</div></td>
                  <tr></tr>
                  <tr><label htmlFor="heartrate">HEARTRATE</label></tr>
                <td> <div id="heartrate">${val[data]["heartrate"]}</div></td>
                  <tr></tr>
                <tr> <label htmlFor="time">TIME</label></tr>
                <td> <div id="time">${val[data]["time"]}</div></td>
                  <tr></tr>
                <tr> <label htmlFor="date">DATE</label></tr>
                  <td><div id="date">${val[data]["date"]}</div></td>
                  <tr></tr>
                  <button id="${val[data]["username"]}">Book</button>
                
                </table>
                  </div>`
          
          })
          // console.log(childSnap.key)
          // console.log(childSnap.val())
        )).forEach(element=>{
          content += element
          
      })
      document.getElementById("cricpat").innerHTML=content;
      console.log(content)
    
      
      Object.keys(val).forEach((data)=>
      {
        
       
        document.getElementById(val[data]["username"]).addEventListener("click",function(){
          
          console.log(val[data]["username"]);
          Book(val[data]["username"]);
        })
      })
    })

      
        
      
    
}

  // var cricpat=Object.keys(critical).map(critic);
  // function  critic(data)
  // {
  //   return(
 
  //   )
  // }
  
  
  return(
      <React.Fragment>
          <button id="logout" onClick={logout}>Logout</button>
          <button id="profile" onClick={profile}>Profile</button>
          <button onClick={onDemand}>CRITICAL</button>
          <div id="cricpat">
          
          </div>
      
      
         
      </React.Fragment>
  )

}
  //${document.getElementById("book").addEventListener("click",Book(snapshot.val()[data]))}
export default Critical;



 

