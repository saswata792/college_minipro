import React from "react";
import './home.css';
import { useHistory } from "react-router-dom";
import firebase from "./fire.js";
import Mainchecker from "./mainchecker.js";


var db=firebase.database();
function Header()
{
	let  history= useHistory();
	
	//const [inst,setinst]=React.useState([])
	// React.useEffect(()=>
	// 	{	
	// 		const fetchdata= async()=>{
	// 			const check=await db.collection('inst').get()
	// 			setinst(check.docs.map(doc=>doc.data()))
	// 		}
	// 		fetchdata()
	// 	},[]) 
	
	function signupclick()
	{
		alert("Admin:username@admin,User:username@user");
		history.push("/signup");
	}
	
	function checkdata()
	{
		let str;
		const usrnm=document.getElementById("username").value;
	    const pass=document.getElementById("password").value;
	    //const usrnm_array=usrnm.split("@");
		let flag=0;
		str="basicinfo";
		const usrnm_array=usrnm.split("@");
		if(usrnm_array[1]==="user")
		{

			db.ref().child("user").child(usrnm).get().then((snapshot) => {
				console.log(snapshot.val());
				if(snapshot.val().str.username===usrnm && snapshot.val().str.password===pass)
				{
					Mainchecker.setProfile(snapshot.val());
					flag=1;
					history.push('/profileuser');
					
				}
			
			})
		}
		if(flag===0)
			alert("your account doesn't exist"); 
		
		// const check=db.collection('inst').get();
		
			
			
	}
		return(
			<React.Fragment>
			<div class="signin">
			<h1> Signin</h1>
			
				<label for="username" >Username</label>
				<input type="text" class="username-one" id="username" required></input>
				<label for="password">Password</label>
				<input type="password" class="password-one" id="password" required></input>
				<button id="signin" onClick={checkdata}>Signin</button>	
                
			
			
			<button  id="signup" onClick={signupclick}>Signup</button>
			</div>
			</React.Fragment>


			);
	
}
export default Header;