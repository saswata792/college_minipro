import React from "react";
import './signup.css';
import { useHistory } from "react-router-dom";
import firebase from "./fire.js";

import Mainchecker from "./mainchecker.js";
var db=firebase.database();
function Signup()
{
	let history=useHistory();
	//const [inst,setinst]=React.useState([])
	// React.useEffect(()=>
	// 	{	
	// 		const fetchdata= async()=>{
	// 			const check=await db.collection('inst').get()
	// 			setinst(check.docs.map(doc=>doc.data()))
	// 		}
	// 		fetchdata()
	// 	},[])
	
	function store()
	{
		var str="basicinfo";
		const usrnm=document.getElementById("username").value;
		const pass=document.getElementById("password").value;
		const email=document.getElementById("email").value;
		const date=document.getElementById("dob").value;
		const addr=document.getElementById("address").value;
		const contnm=document.getElementById("contnm").value;
		const nameus=document.getElementById("nameus").value;
		const usrnm_array=usrnm.split("@");
		if(usrnm_array[1]==="user")
		{
			db.ref("user/").child(usrnm).get().then((snapshot) => {
				
				try
				{
					if(snapshot.val()[str].username===usrnm)
						{
						alert("username already exist");
						console.log(snapshot);
						document.getElementById("username").value="";
						document.getElementById("password").value="";
						document.getElementById("email").value="";
						document.getElementById("dob").value="";
						document.getElementById("address").value="";
						document.getElementById("contnm").value="";
						document.getElementById("nameus").value="";
						window.location.reload();
						}
				}
		
				catch

				{
					
						let det ={basicinfo:{
									
							name: nameus,
							username:usrnm,
							password:pass,
							email:email,
							DateofBirth:date,
							ContactNumber:contnm,
							Address:addr
							}}
								//1alert(usrnm_array[0]);
								db.ref("user/").child(usrnm).child(str).set(det.basicinfo)
									.then(()=>{
										alert("Succesfully Registered");
									})
									.catch((error)=>{
										alert("trNamen");
									})
								Mainchecker.setProfile(det);
								history.push('/profileuser');
							
				}	
			}).catch((error)=>{
				console.log(error);
			})
		
		}
		if(usrnm_array[1]==="admin")
		{
			db.ref("admin/").child(usrnm).get().then((snapshot) => {
				
				try
				{
					if(snapshot.val()[str].username===usrnm)
						{
						alert("username already exist");
						console.log(snapshot);
						document.getElementById("username").value="";
						document.getElementById("password").value="";
						document.getElementById("email").value="";
						document.getElementById("dob").value="";
						document.getElementById("address").value="";
						document.getElementById("contnm").value="";
						document.getElementById("nameus").value="";
						window.location.reload();
						}
				}
		
				catch

				{
					
						let det ={basicinfo:{
									
							name: nameus,
							username:usrnm,
							password:pass,
							email:email,
							DateofBirth:date,
							ContactNumber:contnm,
							Address:addr
							}}
								//1alert(usrnm_array[0]);
								db.ref("admin/").child(usrnm).child(str).set(det.basicinfo)
									.then(()=>{
										alert("Succesfully Registered");
									})
									.catch((error)=>{
										alert("error",error);
									})
								Mainchecker.setProfile(det);
								history.push('/critical');
							
				}	
			}).catch((error)=>{
				console.log(error);
			})
		
		}
	
	
	}
		return(
			<React.Fragment>
			<div className="signup">
			<h1> Signup</h1>
			
				<label htmlFor="username" >Username</label>
				<input type="text" className="username" id="username" required></input>
				<br></br>
				<label htmlFor="password">Password</label>
                <input type="password" className="password" id="password" required></input>
				<label htmlFor="nameus">Full name</label>
				<input id="nameus" className="nameus" required></input>
                <label htmlFor="email">Email</label>
                <input type="email" className="email" id="email" required></input>
                <label htmlFor="dob">DOB</label>
                <input type="date" className="dob"id="dob" required></input>
				<label htmlFor="address">Address</label>
				<input type="text" className="address" id="address"></input>
				<label htmlFor="contnm">Contact Number</label>
				<input type="number" id="contnm" className="contnm"></input>
                <button onClick={store}>Signups</button>
			
			</div>
			</React.Fragment>


			);
	
}
export default Signup;