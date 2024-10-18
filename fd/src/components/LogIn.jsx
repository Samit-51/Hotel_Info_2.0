import { useState } from "react";
import axios from "axios";
const LogIn = () =>{
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[emailErr, setEmailErr] = useState('');
    const[passwordErr, setPasswordErr] = useState('');
    const handelSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post('/api/login', {
                email: email,
                password: password
            })
            if(response.data.errors){
                let errors = response.data.errors;
                setEmailErr(errors.Email);
                setPasswordErr(errors.Password);
            }
        }catch(e){
            console.log(e.message);
        }
    }
    return(
        <div className="wrapper">
            <div className="info"></div>
            <div className="container">
                <h1>Welcome back!</h1>
                <form onSubmit={handelSubmit}>
                <div className="input-container">
                        <label htmlFor="email"><i class="fa-solid fa-envelope"></i></label>
                        <input 
                        type="email"
                        placeholder="E-mail address"
                        id='email'
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                        required
                        />
                    </div>
                    {emailErr && <p className='err'>{emailErr}</p>}
                    <div className="input-container">
                        <label htmlFor="password"><i class="fa-solid fa-lock"></i></label>                       
                        <input 
                        type="password"
                        placeholder="Password"
                        id='password'
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                        required
                        />
                    </div>
                    {passwordErr && <p className='err'>{passwordErr}</p>}
                    <div className="link">
                        Forgot password?<a href="#"> Click here</a>
                    </div>
                    <input type="submit" className="btn"/>
                </form>
            </div>
        </div>
    )
} 

export default LogIn;