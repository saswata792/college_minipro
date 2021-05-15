import React from "react";

import './profileuser.css';
import Mainchecker from "./mainchecker.js";
import firebase from "./fire.js";
function Profileuser()
{   
    var db=firebase.database();
    // const [inst,setinst]=React.useState([])
	// React.useEffect(()=>
	// 	{	
	// 		const fetchdata= async()=>{
	// 			const check=await db.collection('inst').get()
	// 			setinst(check.docs.map(doc=>doc.data()))
	// 		}
	// 		fetchdata()
	// 	},[]) 
    // function moresubject()
    // {
    //     const sub=document.getElementById("subjectmore");
    //     sub.style.display="block";
    // }
    function passchang()
    {
        
        
        document.getElementById("passchange").style.display="block";
       
    }
    function passchange()
    {
        document.getElementById("save").style.display="block";
    }
    function passchanged()
    {
        const prpass=document.getElementById('password-two').value;
        const nwpass=document.getElementById('nwpassword-two').value;
        str="basicinfo";
        if(Mainchecker.getProfile().str.password===prpass)
        {
            
            db.child(Mainchecker.getProfile()).child(str).update({
                        password:nwpass
            })        
            
        }
        else
            alert("you have pressed wrong password");
        
    }
    // function savefacul()
    // {
    //     const subnm=document.getElementById("subjectnm").value;
    //     const afacul=document.getElementById("assfacul").value;
    //     const subcd=document.getElementById("subjectcd").value;
    //     const day=document.getElementById("day").value;
    //     const time=document.getElementById("time").value;
    //     const concat=afacul+':'+subcd;
    //     alert(concat); 
    //     db.collection('inst').doc(concat).set({
    //         subjectname: subnm,
    //         assignedfaculty:afacul,
    //         subjectcode:subcd,
    //         day:day,
    //         timeslot:time
    //     })
    // }
    // function savefaculty(){
    //     document.getElementById("savebut").style.display="block";
    // }
    var str="basicinfo";
    return(
    <React.Fragment>
         <div id="profile">
            
         <label for="username">Username</label>
            <input  id="username" class="username-two" value={Mainchecker.getProfile().str.username}></input>
            <label for="name">Name</label>
            <input id="name" class="name-two" value={Mainchecker.getProfile().str.name}></input> 
            <label for="email">Email</label>
            <input id="email" class="email-two" value={Mainchecker.getProfile().str.email}></input>
            <label for="dob">DateofBirth</label>
            <input id="dob" class="dob-two" value={Mainchecker.getProfile().str.DateofBirth}></input>
            <label for="address">Address</label>
            <input  id="address" class="address-two" value={Mainchecker.getProfile().str.Address}></input>
            <label for="contactnm">Contact Number</label>
            <input id="contactnm" class="contactnm-two" value={Mainchecker.getProfile().str.ContactNumber}></input> 
            <button onClick={passchang}>Change Password</button>
            <div id="passchange" style={{display:"none"}}>
                    <label for="password-two">Previous Password</label>
                    <input id="password-two" class="password-two" onChange={passchange}></input>
                    <label for="nwpassword-two">New Password</label>
                    <input id="nwpassword-two" class="nwpassword-two" onChange={passchange}></input>
                    <button id="save" style={{display:"none"}} onClick={passchanged}>Save</button>
            </div> 
        
            
         </div>
    </React.Fragment>
   
    );
}
export default Profileuser;