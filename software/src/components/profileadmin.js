import React from "react";


import Mainchecker from "./mainchecker.js";
import { useHistory } from "react-router-dom";
import firebase from "./fire.js";
function Profileadmin()
{   
    
    var db=firebase.database();
    var check=Mainchecker.getProfile();
    var str="basicinfo";
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
        
        
        
        if(check[str]["password"]===prpass)
        {
            
            
            console.log(check[str]["password"])
            console.log(check[str]["username"])
            db.ref("admin/").child(check[str]["username"]).child(str).update({
                password:nwpass
            }).then((data)=>{
                alert("password updated")
                document.getElementById("passchange").style.display="none"
            })
            
            

            
        }
        else
            alert("you have pressed wrong password");
       
        
        document.getElementById("passchange").style.display="none"
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
    //Mainchecker.getProfile().str.username
    return(
    <React.Fragment>
        
        <button id="logout" onClick={logout}>Logout</button>
        <button id="measure" onClick={critical}>Critical</button>
         <div id="profile">
            
            <label htmlFor="username">Username</label>
         
            <div  id="username" className="username-two" >{check[str]["username"]}</div>
            <label htmlFor="name">Name</label>
            <div id="name" className="name-two" >{check[str]["name"]}</div> 
            <label htmlFor="email">Email</label>
            <div id="email" className="email-two">{check[str]["email"]}</div>
            <label htmlFor="dob">DateofBirth</label>
            <div id="dob" className="dob-two">{check[str]["DateofBirth"]}</div>
            <label htmlFor="address">Address</label>
            <div  id="address" className="address-two">{check[str]["Address"]}</div>
            <label htmlFor="contactnm">Contact Number</label>
            <div id="contactnm" className="contactnm-two" >{check[str]["ContactNumber"]}</div> 
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
   
    )
}
export default Profileadmin;