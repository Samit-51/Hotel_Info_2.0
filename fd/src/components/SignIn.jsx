import { useState } from 'react';
import axios from 'axios';

const SignIn = () =>{
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[usernameErr, setUsernameErr] = useState('');
    const[emailErr, setEmailErr] = useState('');
    const[passwordErr, setPasswordErr] = useState('');
    const handlesubmit = async(e) =>{
        e.preventDefault();
        setUsernameErr('');
        setEmailErr('');
        setPasswordErr('');
        try{
            const response = await axios.post('/api/signin', {
                username : username,
                email: email,
                password: password
            })
            if(response.data.errors){
                let errors = response.data.errors;
                setUsernameErr(errors.Username);
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
                <h1>Create you account.</h1>
                <form>
                    <div className="input-container">
                        <label htmlFor="username"><i class="fa-solid fa-user"></i></label>
                        <input 
                        type="text"
                        placeholder="Username"
                        id='username'
                        value={username}
                        onChange={(e)=>{
                            setUsername(e.target.value)
                        }}
                        />
                    </div>
                    {usernameErr && <p className='err'>{usernameErr}</p>}
                    <div className="input-container">
                        <label htmlFor="email"><i class="fa-solid fa-envelope"></i></label>
                        <input 
                        type="email"
                        placeholder="E-mail address"
                        id='email'
                        value={email}
                        onChange={(e)=>[
                            setEmail(e.target.value)
                        ]}
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
                        />
                    </div>
                    {passwordErr && <p className='err'>{passwordErr}</p>}
                    <div className="link">
                        Already have an account?<a href="#"> Login</a>
                    </div>
                    <button className="btn" onClick={(e)=>{handlesubmit(e)}}>
                        Sign-in
                    </button>
                </form>
            </div>
        </div>
    )
} 

export default SignIn;