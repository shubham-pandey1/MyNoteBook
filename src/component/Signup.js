import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const {showAlert} = props;
    const [credentials,setCredentials] = useState({email:"", password:"", name:"", cpassword:""});
    let Navigate = useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const {name,email,password} = credentials;
            const host = "http://localhost:5000"; 
            const response = await fetch(`${host}/api/auth/createuser`, {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({name, email, password})
            });
            const json = await response.json();
            
            console.log(json);
            if(json.success){
                //redirect
                localStorage.setItem("token", json.authtoken);
                Navigate("/");
                showAlert("Account created Successfully","success");
            }
            else{
                showAlert("Invalid Details","danger");
            }
          }
          const onChange=(e)=>{
            setCredentials({...credentials, [e.target.name]: e.target.value})
          }

  return (
    
    <div className='container mt-2'>
          <h2 className='ps-5 pb-2'>Create an account to use iNoteBook</h2>
            <form onSubmit={handleSubmit} className='col-md-11'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label ps-5">Name</label>
                    <input type="text" className="form-control ms-5" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} required minLength={3}/>
                        
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label ps-5">Email address</label>
                    <input type="email" className="form-control ms-5" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required />
                        
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="ps-5 form-label">Password</label>
                    <input type="password" className="form-control ms-5" id="password" name='password' onChange={onChange} required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="ps-5 form-label">Confirm Password</label>
                    <input type="password" className="form-control ms-5" id="cpassword" name='cpassword' onChange={onChange} required minLength={5}/>
                </div>
                
                <button type="submit" className="btn btn-primary ms-5">Submit</button>
            </form>
        </div>
  )
}

export default Signup
