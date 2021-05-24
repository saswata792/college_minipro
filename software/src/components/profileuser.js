import React from "react";

import './profileuser.css';
import Mainchecker from "./mainchecker.js";
import { useHistory } from "react-router-dom";
import firebase from "./fire.js";
function Profileuser()
{   
    var db=firebase.database();
    var check=Mainchecker.getProfile();
    
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
            
            db.ref("user/").child(check[str]["username"]).child(str).update({
                password:nwpass
            })
            alert("password updated");
           document.getElementById("passchange").style.display="none";

            
        }
        else
            alert("you have pressed wrong password");
        
    }
    let  history= useHistory();
    function measure()
    {
        history.push("/measure");
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

<div class="header4">
            <h1>USER PROFILE</h1>
            </div> 
        
        <div class="B10"><button id="logout" onClick={logout}><b>LOGOUT</b></button></div>
        <div class="B11"><button id="measure" onClick={measure}><b>MEASURE</b></button></div>
         <div id="profile">

            <div class="main">
            
            <p><label htmlFor="username"><b>USERNAME</b></label></p>
            <div  id="username" className="username-two">{check[str]["username"]}</div>
            <p><label htmlFor="name"><b>NAME</b></label></p>
            <div id="name" className="name-two" >{check[str]["name"]}</div>
            <p><label htmlFor="email"><b>EMAIL</b></label></p>
            <div id="email" className="email-two" >{check[str]["email"]}</div>
            <p><label htmlFor="dob"><b>DATE OF BIRTH</b></label></p>
            <div id="dob" className="dob-two" >{check[str]["DateofBirth"]}</div>
            <p><label htmlFor="address"><b>ADDRESS</b></label></p>
            <div  id="address" className="address-two">{check[str]["Address"]}</div>
            <p><label htmlFor="contactnm"><b>CONTACT NUMBER</b></label></p>
            <div id="contactnm" className="contactnm-two" >{check[str]["ContactNumber"]}</div> 


          <div class="B12"><button onClick={passchang}><b>CHANGE PASSWORD</b></button></div>

            </div>


            <div id="passchange" style={{display:"none"}}>
                    <div class="c1">
                    <label htmlFor="password-two"><b>PREVIOUS PASSWORD   </b></label>
                    <input id="password-two" className="password-two" onChange={passchange}></input>
                    </div>
                    <div class="c2">
                    <label htmlFor="nwpassword-two"><b>NEW PASSWORD   </b></label>
                    <input id="nwpassword-two" className="nwpassword-two" onChange={passchange}></input>
                    </div>
                    <div class="c3">
                    <button id="save" style={{display:"none"}} onClick={passchanged}><b>SAVE</b></button>
                    </div>
            </div> 
            
            
         </div>
    </React.Fragment>
   
    );
}
export default Profileuser;