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
         
         var  nm=Mainchecker.getProfile()["basicinfo"]["username"]
        
        db.ref("admin/").child(nm).child(book_time).set({
            Bookedby:nm,
            date:book_time[0]+""+book_time[1]+"/"+book_time[2]+""+book_time[3]+"/"+book_time[4]+""+book_time[5]+""+book_time[6]+""+book_time[7],
            time:book_time[8]+""+book_time[9]+":"+book_time[10]+""+book_time[11]+":"+book_time[12]+""+book_time[13]  ,
            patientusrnm :snapshot.val()["basicinfo"]["username"],
            patientaddr: snapshot.val()["basicinfo"]["Address"],
            patientcontnm: snapshot.val()["basicinfo"]["ContactNumber"]
        }).then(()=>{
          alert("Booked Successfully");
          db.ref("critical/"+critical).remove();
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
  {//.child(val[data]["username"])
    let basicInfo=[]
    //let index=0
    cb.ref("user/").get().then((snap)=>{
      //console.log(snap.val())
      Object.keys(snap.val()).forEach(info=>{
        basicInfo.push(snap.val()[info]["basicinfo"])
      })
    })
    //console.log(basicInfo)
      db.ref("critical/").get().then((snapshot)=>
      {
        // console.log(data.key)
        //   console.log(data.val())
        //   console.log(data.val()["username"])
        //   console.log(data.val().username)
        let val=snapshot.val();
        let content=``;
        //let ino=" ";
        Object.keys(val).map((data)=>
        (

            
            `<div class="one">
                <table>
                
                  <tr><label htmlFor="usrnm">USERNAME</label>
                  <td><div id="usrnm">${val[data]["username"]}</div></td>
                  </tr><span class="DND">`+
                  
                  basicInfo.map((index)=>{
                    return ((val[data]["username"]===index["username"])?
                    `<tr><label htmlFor="addr">ADDRESS</label>
                    <td><div id="addr">${index["Address"]}</div></td>
                    </tr>
                    <tr><label htmlFor="contactnm">CONTACTNUMBER</label>
                    <td><div id="contactnm">${index["ContactNumber"]}</div></td>
                  </tr>
                    <tr><label htmlFor="dob">DATE OF BIRTH</label>
                    <td><div id="dob">${index["DateofBirth"]}</div></td>
                    </span>
                  </tr><span class="DND">`:``
                  )
                })+
                  
                  `</span>
                  <tr><label htmlFor="spotwo">SPO2</label>
                  
                  <td><div id="spotwo">${val[data]["spotwo"]}</div></td>
                </tr>
                
                <tr><label htmlFor="heartrate">HEARTRATE</label>
                <td> <div id="heartrate">${val[data]["heartrate"]}</div></td>
                </tr>
                <tr> <label htmlFor="time">TIME</label>
                <td> <div id="time">${val[data]["time"]}</div></td>
                </tr>
                <tr> <label htmlFor="date">DATE</label>
                  <td><div id="date">${val[data]["date"]}</div></td>
                  </tr>
                  <button id="${val[data]["username"]}">Book</button>
                
                </table>
                  </div>`
          
            
          // console.log(childSnap.key)
          // console.log(childSnap.val())
          )).forEach(element=>{
            content += element
          })

      
      document.getElementById("cricpat").innerHTML=content;
     // console.log(content)
    
      
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



 

