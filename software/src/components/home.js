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
		
		const usrnm=document.getElementById("username").value;
	    const pass=document.getElementById("password").value;
	    //const usrnm_array=usrnm.split("@");
		
		var str="basicinfo";
		const usrnm_array=usrnm.split("@");
		if(usrnm_array[1]==="user")
		{

			db.ref("user/").child(usrnm).get().then((snapshot) => {
				
				if(snapshot.val()[str].username===usrnm && snapshot.val()[str].password===pass)
				{
					alert(snapshot.val()[str].username);
					Mainchecker.setProfile(usrnm);
					
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

			db.ref("admin/").child(usrnm).get().then((snapshot) => {
				
				if(snapshot.val()[str].username===usrnm && snapshot.val()[str].password===pass)
				{
					
					Mainchecker.setProfile(usrnm);
					alert(snapshot.val()[str].username);
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
		
		
		
		// const check=db.collection('inst').get();
		
	}
	function booked(){
		history.push("/book");
	}	
		return(
			<React.Fragment>
			<div class="signin">
			<h1> Signin</h1>
			
				<label htmlFor="username" >Username</label>
				<input type="text" className="username-one" id="username" required></input>
				<label htmlFor="password">Password</label>
				<input type="password" className="password-one" id="password" required></input>
				<button id="signin" onClick={checkdata}>Signin</button>	
                
			
			
			<button  id="signup" onClick={signupclick}>Signup</button>
			 <button onClick={booked}>Booked</button> 
			</div>
			</React.Fragment>


			);
	
}
export default Header;