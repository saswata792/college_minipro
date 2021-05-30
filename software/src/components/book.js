import React from "react";
import './book.css';
import firebase from "./fire.js";
import {
  useHistory
} from 'react-router-dom'
var db=firebase.database();
function Book(){
  let history=useHistory() 
    function Booked()
    {
      
      db.ref("admin/").get().then((snapshot)=>
      {
        let admit=[];
        let cover=[];
        Object.keys(snapshot.val()).forEach(data=>{
            admit.push(snapshot.val()[data])
        })
        // let content=``;
        console.log("Admit")
        console.log(admit)
        admit.forEach((index)=>
        {
          console.log(index)
            Object.keys(index).forEach((dat)=>{
              cover.push(index[dat])
            })
            
        })
        
      console.log(cover)

      let content=
      `
      <table id=table3>
      <tr> 
             <th><label htmlFor="usrnm">ADMINISTRATOR</label></th>
             <th><label htmlFor="usrnm">CONTACT</label></th>
             <th><label htmlFor="spotwo">SPO2</label></th>
             <th><label htmlFor="heartrate">HEARTRATE</label></th>
             <th><label htmlFor="date">TIME</label></th>
             <th><label htmlFor="time">DATE</label></th>
             </tr>
             
             </table>`
      cover.map((dat)=>
        (
              (dat["username"]===undefined)? 
            `<div class="one">

            <div class="twoone">

            <table>

             

             <tr>
             <td> <div>${dat["Bookedby"]}</div></td>
             <td> <div>${dat["ContactNumber"]}</div></td>
             <td><div>${dat["spotwo"]}</div></td>
             <td><div>${dat["heartrate"]}</div></td>
             <td><div>${dat["time"]}</div></td>
             <td><div>${dat["date"]}</div></td>     
            </tr>
            </br>

            <table>

            </div>

              </div>`:``
          )).forEach(element=>{
            content += element
          })
       document.getElementById("bookpat").innerHTML=content;
      })
    }     
   
    
  function home(){
    
    history.push('/')
  }
  
  return(
      <React.Fragment>

<div class="header7">
<h1>BOOKED DATABASE</h1>
</div> 
          <div class="bz"> <button onClick={home}><div class = "t1"><b>HOME</b></div></button></div>
          <div class="by"><button onClick={Booked}><div class = "t1"><b>CLICK TO CHECK</b></div></button></div>
          <div id="bookpat">
          
          </div>
         
      </React.Fragment>
  )
}
export default Book;