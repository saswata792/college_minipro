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
				<div class="head">
			<h1>SIGN UP</h1>
			</div>
				<div class name="main">

				<div class="usernamel"><label htmlFor="username" ><b>USERNAME</b></label></div>
				<input type="text" className="username" id="username" required></input>

				<div class="passwordl"><label htmlFor="password"><b>PASSWORD</b></label></div>
				<input type="password" className="password" id="password" required></input>

				<div class="nameusl"><label htmlFor="nameus"><b>FULL NAME</b></label></div>
				<input id="nameus" className="nameus" required></input>

                <div class="emaill"><label htmlFor="email"><b>EMAIL</b></label></div>
				<input type="email" className="email" id="email" required></input>

                <div class="dobl"><label htmlFor="dob"><b>DATE OF BIRTH</b></label></div
				><input type="date" className="dob"id="dob" required></input>

				<div class="addressl"><label htmlFor="address"><b>ADDRESS</b></label></div>
				<input type="text" className="address" id="address"></input>

				<div class="contnml"><label htmlFor="contnm"><b>CONTACT NUMBER</b></label></div>
				<input type="number" id="contnm" className="contnm"></input>

				<div class="b20"><button onClick={store}><b>SIGN UP</b></button></div>

				</div>

				</div>

				
			</React.Fragment>


			);
	
}
export default Signup;