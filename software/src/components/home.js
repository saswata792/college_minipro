import React from "react";
import './home.css';
import { useHistory } from "react-router-dom";
import firebase from "./fire.js";
import Mainchecker from "./mainchecker.js";


var db=firebase.database();
function Header()
{
	let  history= useHistory();
	
	
	function signupclick()
	{
		alert("Admin:username@admin,User:username@user");
		history.push("/signup");
	}
	
	function checkdata()
	{
		
		const usrnm=document.getElementById("username").value;
	    const pass=document.getElementById("password").value;
		
		
		
		var str="basicinfo";
		const usrnm_array=usrnm.split("@");
		if(usrnm_array[1]==="user")
		{
			
			db.ref("user/").child(usrnm).get().then((snapshot)=>{
				if(snapshot.val()[str]["username"]===usrnm && snapshot.val()[str]["password"]===pass)
				{
					
					Mainchecker.setProfile(snapshot.val());
					
					history.push('/measure');
					
				}
				else if(snapshot.val()[str].password!==pass)
				{
					alert("wrong password,please check again");
				}
				else
					alert("your account doesn't exist"); 
			})
			
				
				
			
			
		}
		if(usrnm_array[1]==="admin")
		{
			
			db.ref("admin/").child(usrnm).get().then((snapshot)=>{
				if(snapshot.val()[str]["username"]===usrnm && snapshot.val()[str]["password"]===pass)
				{
					
					
					Mainchecker.setProfile(snapshot.val());
					
					history.push('/critical');
					
				}
				else if(snapshot.val()[str].password!==pass)
				{
					alert("wrong password,please check again");
				}
				else
					alert("your account doesn't exist"); 
			
			
			})
			
				
				
		}
		
		
		
	}
	function booked(){
		history.push("/book");
	}	
		return(
			<React.Fragment>

				<div class="header">
            <h1>USER/ADMIN SIGN IN</h1>
            </div> 

			<div class="signin">
				<label htmlFor="username" ><div class="tnew"><b>USERNAME</b></div></label>
				<input type="text" className="username-but" id="username" required></input>
				<label htmlFor="password"><div class="tnew"><b>PASSWORD</b></div></label>
				<input type="password" className="password-but" id="password" required></input>
				<div class="b1"><button id="signin" onClick={checkdata}><b>SIGN IN</b></button></div>	
                <div class="b2"><button  id="signup" onClick={signupclick}><b>SIGN UP</b></button></div>
			    <div class="b3"><button onClick={booked}><b>BOOKED</b></button></div>
				</div>

			</React.Fragment>


			);
	
}
export default Header;