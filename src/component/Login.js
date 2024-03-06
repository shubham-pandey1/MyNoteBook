import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";

const Login = (props) => {
    
    const [credentials,setCredentials] = useState({email:"", password:""});
    let Navigate = useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
            const host = "http://localhost:5000";
            const response = await fetch(`${host}/api/auth/login`, {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({email:credentials.email, password:credentials.password})
             
            });
            const json = await response.json();
            
            console.log(json);
            if(json.success){
                //redirect
                localStorage.setItem("token", json.authtoken);
                props.showAlert("Logged in Successfully","success");
                Navigate("/");
            }
            else{
                props.showAlert("Invalid Credentials","danger");
            }
          }

          const onChange=(e)=>{
            setCredentials({...credentials, [e.target.name]: e.target.value})
          }

    return (
        <div className='container mt-3'>
            <h2 className='ps-5 pb-2'>Login to Continue to iNoteBook</h2>
            <form onSubmit={handleSubmit} className='col-md-11'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label ps-5">Email address</label>
                    <input type="email" className="form-control ms-5" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required/>
                        
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="ps-5 form-label">Password</label>
                    <input type="password" className="form-control ms-5" id="password" name='password' onChange={onChange} required minLength={5}/>
                </div>
                
                <button type="submit" className="btn btn-primary ms-5">Submit</button>
            </form>
        </div>
    )
}

export default Login
