import React from "react";
import firebase from "./fire.js";
var db=firebase.database();
function Book(){
    let admit=[];
    let cover=[];
    function Booked()
    {
      
      db.ref("admin/").get().then((snapshot)=>
      {
        Object.keys(snapshot.val()).forEach(data=>{
            admit.push(snapshot.val()[data])
        })
    
      })
      let content=``;
      console.log(admit);
      admit.forEach((index)=>
      {
          index.forEach((dat)=>{
            cover.push(dat)
          })
          
      })
      console.log(cover)
    //   admit.map((index)=>
    //   (   
    //     index.map((dat)=>
    //     {
    //         console.log(index.dat["username"])
    //       (index.dat["username"]==='')? 
    //         `<div class="one">
    //           <label htmlFor="usrnm">Username</label>
    //             <div>${index.dat["Bookedby"]}</div>
    //           <label htmlFor="spotwo">SPO2</label>
    //           <div>${index.dat["spotwo"]}</div>
    //           <label htmlFor="heartrate">HEARTRATE</label>
    //           <div>${index.dat["heartrate"]}</div>
    //           <label htmlFor="time">TIME</label>
    //           <div>${index.dat["time"]}</div>
    //           <label htmlFor="time">TIME</label>
    //           <div>${index.dat["date"]}</div>
              
              
    //           </div>`:``
          
        
    //         // console.log(childSnap.key)
    //         // console.log(childSnap.val())
    //       }).forEach(element=>{
    //         content += element
    //       })
    //     ))


        console.log(content);
        document.getElementById("bookpat").innerHTML=content;
    }     
   
    
    
    


  // var cricpat=Object.keys(critical).map(critic);
  // function  critic(data)
  // {
  //   return(
 
  //   )
  // }
  
  
  return(
      <React.Fragment>
          
          <button onClick={Booked}>Click to show the ones Serviced/Yet to Service</button>
          <div id="bookpat">
          
          </div>
      
      
         
      </React.Fragment>
  )
}
export default Book;