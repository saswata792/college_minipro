import React from "react";
import './signup.css';
import { useHistory } from "react-router-dom";
import firebase from "./fire.js";


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
		
		const usrnm=document.getElementById("username").value;
		const pass=document.getElementById("password").value;
		const email=document.getElementById("email").value;
		const date=document.getElementById("dob").value;
		const addr=document.getElementById("address").value;
		const contnm=document.getElementById("contnm").value;
		const nameus=document.getElementById("nameus").value;
		// inst.forEach((check)=>{
		// 	if(check.username===usrnm)
		// 	{
		// 		alert("username already exist");
		// 		history.push('/signup');
		// 	}
		// })
		
		// db.ref(usrnm).on('value',function(check){
		// 	console.log(check.val());
		// 	if(check.val()[str].username.val()===usrnm)
		// 	{
		// 		console.log(check.str);
		// 		alert("username already exist");
		// 		history.push('/signup');
		// 	}
		// });
		db.ref(usrnm).on("value", snapshot => {
			if(snapshot.exists())
			{
				alert("username already exist");
				console.log(snapshot);

		 		history.push('/signup');
				
			}
		
			else

			{
				if(usrnm.includes("@"))
				{
					const usrnm_array=usrnm.split("@");
					if(usrnm_array[1]==='user')
						{
							//1alert(usrnm_array[0]);
							db.child(usrnm).child("basicinfo").set({
								name: nameus,
								username:usrnm,
								password:pass,
								email:email,
								DateofBirth:date,
								ContactNumber:contnm,
								Address:addr
								})
								.then(()=>{
									alert("Succesfully Registered");
								})
								.catch((error)=>{
									alert("try again");
								})
							
						}
				}	
					else
					{
						alert("it's mandatory to enter a @");
					}

			}
			
		}).catch((error)=>{
			console.log(error);
		})
		
	    
	
	}
		return(
			<React.Fragment>
			<div className="signup">
			<h1> Signup</h1>
			
				<label for="username" >Username</label>
				<input type="text" class="username" id="username" required></input>
				<br></br>
				<label for="password">Password</label>
                <input type="password" class="password" id="password" required></input>
				<label for="nameus">Full name</label>
				<input id="nameus" class="nameus" required></input>
                <label for="email">Email</label>
                <input type="email" class="email" id="email" required></input>
                <label for="dob">DOB</label>
                <input type="date" class="dob"id="dob" required></input>
				<label for="address">Address</label>
				<input type="text" class="address" id="address"></input>
				<label for="contnm">Contact Number</label>
				<input type="number" id="contnm" class="contnm"></input>
                <button onClick={store}>Signups</button>
			
			</div>
			</React.Fragment>


			);
	
}
export default Signup;