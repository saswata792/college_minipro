// import React from "react";
// import firebase from "./fire.js";
// var db=firebase.database();
// function Book(){
//     function Booked()
//   {
//       db.ref("admin/").get().then((snapshot)=>
//       {
//         // console.log(data.key)
//         //   console.log(data.val())
//         //   console.log(data.val()["username"])
//         //   console.log(data.val().username)
//         let content=``;
//         Object.keys(snapshot.val()).map((data)=>
//         (
//           `<div class="one">
//             <label htmlFor="usrnm">Username</label>
//               <div>${snapshot.val()[data]["Bookedby"]}</div>
//             <label htmlFor="spotwo">SPO2</label>
//             <div>${snapshot.val()[data]["spotwo"]}</div>
//             <label htmlFor="heartrate">HEARTRATE</label>
//             <div>${snapshot.val()[data]["heartrate"]}</div>
//             <label htmlFor="time">TIME</label>
//             <div>${snapshot.val()[data]["time"]}</div>
//             <label htmlFor="time">TIME</label>
//             <div>${snapshot.val()[data]["date"]}</div>
//             <button id="${snapshot.val()[data]}>Book</button>
            
//             </div>`
        
      
//           // console.log(childSnap.key)
//           // console.log(childSnap.val())
//         )).forEach(element=>{
//           content += element
//       })
//       document.getElementById("bookpat").innerHTML=content;
    
//     })
    
// }

//   // var cricpat=Object.keys(critical).map(critic);
//   // function  critic(data)
//   // {
//   //   return(
 
//   //   )
//   // }
  
  
//   return(
//       <React.Fragment>
          
//           <button onClick={Booked}>Click to show the ones Serviced/Yet to Service</button>
//           <div id="bookpat">
          
//           </div>
      
      
         
//       </React.Fragment>
//   )
// }
// export default Book;