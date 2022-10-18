import React from "react"
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"
import "/static/css/index.css"


export const Login = ({setAuth, isLoggedIn, handleLogout, currUsername}) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    
    const handleSubmit = (event) => {
        console.log({ username, password })
        event.preventDefault()
        setError(null)
        axios
        .post('https://young-plateau-94674.herokuapp.com/auth/token/login/', {
            username: username,
            password: password,
        })
        .then((res) => {
            // console.log(res.data)
            const token = res.data.auth_token
            setAuth(username, token)
            navigate('/homepage/')

        })
        .catch((error) => {
            console.log(error)
            if (error.response.data.username)
            setError(error.response.data.username);
        
        if (error.response.data.password)
            setError(error.response.data.password)
        })
        console.log(username, password)
    }

    if (!isLoggedIn){
    return (  
        <>
        <div style={{textAlign:'center', color:'white'}}>
        <h1>Sign In</h1>
        <form id="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input 
                style={{maxWidth:'100px'}}
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                autoComplete="on"
                value={username}
                required
                />
                <br />
                <br />

<label htmlFor="password">Password: </label>
            <input 
                style={{maxWidth:'100px'}}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                required
                />
                <br />
                <br />

                <button style={{borderRadius:'10px', textDecoration:'none', color:'black'}}>Sign In</button>
        </form>
            <br />
            <div className="register-link">
                Don't have an account? <br />
            <Link to="/Register" style={{textDecoration:'none', color:'white', fontWeight:'bolder'}}>Sign Up </Link>
            </div>
        </div>
        </>
    )}

    else{
        return(
            <>
            <div style={{textAlign:'center'}}>
                <div >
                    <p style={{color:'white'}}>Ready to play {currUsername}?</p>
                </div>
                <div>
                    <Link to="/homepage/" onClick={handleLogout} style={{textDecoration:'none', color:'white', paddingRight:'30px'}}>
                    Logout</Link>
                </div>
            
            </div>
            </>
        )
    }
}