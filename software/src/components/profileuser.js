import React from "react";

import './profileuser.css';
import Mainchecker from "./mainchecker.js";
import { useHistory } from "react-router-dom";
import firebase from "./fire.js";
function Profileuser()
{   
    var db=firebase.database();
    var check=Mainchecker.getProfile();
    
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
        

    }
    var str="basicinfo";
    return(
    <React.Fragment>

<div class="head200">
            <h1>USER PROFILE</h1>
            </div> 
        
        <button id="logout3" onClick={logout}><b>LOGOUT</b></button>
        <button id="measure" onClick={measure}><b>MEASURE</b></button>
         <div id="profileuser">
         <div class="username-one"> <label htmlFor="username"><b>USERNAME</b></label></div>
            <div class="username-two">{check[str]["username"]}</div>
            <div class="name-one" >  <label htmlFor="name"><b>NAME</b></label></div>
            <div class="name-two" >{check[str]["name"]}</div>
            <div class="email-one" > <label htmlFor="email"><b>EMAIL</b></label></div>
            <div class="email-two" >{check[str]["email"]}</div>
            <div class="dob-one" >  <label htmlFor="dob"><b>DOB</b></label></div>
            <div class="dob-two" >{check[str]["DateofBirth"]}</div>
            <div class="address-one">  <label htmlFor="address"><b>ADDRESS</b></label></div>
            <div class="address-two">{check[str]["Address"]}</div>
            <div class="contactnm-one" ><label htmlFor="contactnm"><b>CONTACT NO</b></label></div>
            <div class="contactnm-two" >{check[str]["ContactNumber"]}</div> 


          <button id ="change2" onClick={passchang}><b>CHANGE PASSWORD</b></button>


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
   
    );
}
export default Profileuser;