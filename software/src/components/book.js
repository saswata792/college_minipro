import React from "react";
import './book.css';
import firebase from "./fire.js";
var db=firebase.database();
function Book(){
    
    function Booked()
    {
      
      db.ref("admin/").get().then((snapshot)=>
      {
        let admit=[];
        let cover=[];
        Object.keys(snapshot.val()).forEach(data=>{
            admit.push(snapshot.val()[data])
        })
        let content=``;
        console.log("Admit")
        console.log(admit)
        admit.forEach((index)=>
        {
          console.log(index)
            Object.keys(index).forEach((dat)=>{
              cover.push(index[dat])
            })
            
        })
        console.log("Cover")
      console.log(cover)
      cover.map((dat)=>
        (
          console.log(dat)
              (dat["username"]===undefined)? 
            `<div class="one">

            <div class="one">

            <table>

             <tr> 
             <th><label htmlFor="usrnm">ADMINISTRATOR</label></th>
             <th><label htmlFor="usrnm">CONTACT NO.</label></th>
             <th><label htmlFor="spotwo">SPO2</label></th>
             <th><label htmlFor="heartrate">HEARTRATE</label></th>
             <th><label htmlFor="date">DATE</label></th>
             <th><label htmlFor="time">TIME</label></th>
             </tr>

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
            // console.log(childSnap.key)
            // console.log(childSnap.val())
          )).forEach(element=>{
            content += element
          })
       document.getElementById("bookpat").innerHTML=content;
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

<div class="header7">
<h1>BOOKED DATABASE</h1>
</div> 
          
          <div class="by"><button onClick={Booked}><div class = "t1"><b>CLICK TO CHECK</b></div></button></div>
          <div id="bookpat">
          
          </div>
         
      </React.Fragment>
  )
}
export default Book;