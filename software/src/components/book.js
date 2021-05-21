import React from "react";
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
              (dat["username"]===undefined)? 
            `<div class="one">
             <tr> <label htmlFor="usrnm">Username</label>
               <td> <div>${dat["Bookedby"]}</div></td>
            </tr>
             <tr> <label htmlFor="spotwo">SPO2</label>
           <td>   <div>${dat["spotwo"]}</div></td>
            </tr>
             <tr> <label htmlFor="heartrate">HEARTRATE</label>
              <td><div>${dat["heartrate"]}</div></td>
            </tr>
             <tr> <label htmlFor="time">TIME</label>
          <td>    <div>${dat["time"]}</div></td>        
              </tr>     
          <tr> <label htmlFor="time">TIME</label>
          <td>    <div>${dat["date"]}</div></td>              
            </tr>   
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
          
          <button onClick={Booked}>Click  to show the ones Serviced/Yet to Service</button>
          <div id="bookpat">
          
          </div>
      
      
         
      </React.Fragment>
  )
}
export default Book;