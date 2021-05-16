import React from "react";


import Mainchecker from "./mainchecker.js";
import { useHistory } from "react-router-dom";
import firebase from "./fire.js";
function Profileadmin()
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
        var str="basicinfo";
        if(Mainchecker.getProfile()[str].password===prpass)
        {
            var check=Mainchecker.getProfile();
            console.log(check[str].password)
            console.log(check[str].username)
            db.ref("user/").child(check[str].username).child(str).update({
                password:nwpass
            })
            alert("password updated");
           document.getElementById("passchange").style.display="none";

            
        }
        else
            alert("you have pressed wrong password");
        
    }
    let  history= useHistory();
    function critical()
    {
        history.push("/critical");
    }
    function logout()
    {
       

        history.push("/");
        // document.getElementById("username").value="";
		// document.getElementById("password").value="";
		// document.getElementById("email").value="";
		// document.getElementById("dob").value="";
		// document.getElementById("address").value="";
		// document.getElementById("contnm").value="";
		// document.getElementById("nameus").value="";
        

    }
    var str="basicinfo";//Mainchecker.getProfile().str.username
    return(
    <React.Fragment>
        
        <button id="logout" onClick={logout}>Logout</button>
        <button id="measure" onClick={critical}>Measure</button>
         <div id="profile">
            
            <label htmlFor="username">Username</label>
         
            <input  id="username" className="username-two" value={Mainchecker.getProfile()[str].username}></input>
            <label htmlFor="name">Name</label>
            <input id="name" className="name-two" value={Mainchecker.getProfile()[str].name}></input> 
            <label htmlFor="email">Email</label>
            <input id="email" className="email-two" value={Mainchecker.getProfile()[str].email}></input>
            <label htmlFor="dob">DateofBirth</label>
            <input id="dob" className="dob-two" value={Mainchecker.getProfile()[str].DateofBirth}></input>
            <label htmlFor="address">Address</label>
            <input  id="address" className="address-two" value={Mainchecker.getProfile()[str].Address}></input>
            <label htmlFor="contactnm">Contact Number</label>
            <input id="contactnm" className="contactnm-two" value={Mainchecker.getProfile()[str].ContactNumber}></input> 
            <button onClick={passchang}>Change Password</button>
            <div id="passchange" style={{display:"none"}}>
                    <label htmlFor="password-two">Previous Password</label>
                    <input id="password-two" className="password-two" onChange={passchange}></input>
                    <label htmlFor="nwpassword-two">New Password</label>
                    <input id="nwpassword-two" className="nwpassword-two" onChange={passchange}></input>
                    <button id="save" style={{display:"none"}} onClick={passchanged}>Save</button>
            </div> 
        
            
         </div>
    </React.Fragment>
   
    );
}
export default Profileadmin;