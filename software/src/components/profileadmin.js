import React from "react";
import './profileadmin.css';

import Mainchecker from "./mainchecker.js";
import { useHistory } from "react-router-dom";
import firebase from "./fire.js";
function Profileadmin()
{   
    
    var db=firebase.database();
    var check=Mainchecker.getProfile();
    var str="basicinfo";
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

    }
    return(
    <React.Fragment>

<div class="head100">
            <h1>ADMIN PROFILE</h1>
            </div> 
        
        <button id="logout2" onClick={logout}><b>LOGOUT</b></button>
        <button id="critical" onClick={critical}><b>CRITICAL</b></button>
        
        <div id="profileadmin">

<div class="username-one"><label htmlFor="username"><b>USERNAME</b></label></div>
<div class="username-two">{check[str]["username"]}</div>
<div class="name-one" ><label htmlFor="name"><b>NAME</b></label></div>
<div class="name-two" >{check[str]["name"]}</div>
<div class="email-one" ><label htmlFor="email"><b>EMAIL</b></label></div>
<div class="email-two" >{check[str]["email"]}</div>
<div class="dob-one" ><label htmlFor="dob"><b>DOB</b></label></div>
<div class="dob-two" >{check[str]["DateofBirth"]}</div>
<div class="address-one"><label htmlFor="address"><b>ADDRESS</b></label></div>
<div class="address-two">{check[str]["Address"]}</div>
<div class="contactnm-one" ><label htmlFor="contactnm"><b>CONTACT NO</b></label></div>
<div class="contactnm-two" >{check[str]["ContactNumber"]}</div> 


<button id ="change" onClick={passchang}><b>CHANGE PASSWORD</b></button>


<div id="passchange" style={{display:"none"}}>
        <div class="c1">
        <label htmlFor="password-two"><div class="t100"><b>PREVIOUS PASSWORD   </b></div></label>
        <input id="password-two" className="password-two" onChange={passchange}></input>
        </div>
        <div class="c2">
        <label htmlFor="nwpassword-two"><div class="t100"><b>NEW PASSWORD   </b></div></label>
        <input id="nwpassword-two" className="nwpassword-two" onChange={passchange}></input>
        </div>
        <div class="c3">
        <button id="save" style={{display:"none"}} onClick={passchanged}><b>SAVE</b></button>
        </div>
</div> 


</div>
    </React.Fragment>
   
    )
}
export default Profileadmin;