import React from "react"
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"
import "/static/css/index.css"
import { Register } from "./register";
import { PlayGame } from "./gameplay";


export const Login = ({setAuth, isLoggedIn, handleLogout, currUsername, token}) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [goRegister, setGoRegister] = useState(false)

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
            console.log(token)

        })
        .catch((error) => {
            console.log(error)
            if (error.response.data.username)
            setError(error.response.data.username);
        
        if (error.response.data.password)
            setError(error.response.data.password)
        })
        
        

    }

    if (goRegister){
        return (
            <Register setAuth={(username, token) => {
                setAuth(username, token)
                setGoRegister(false)
            }} 
            />
        )
    }


    else if (!isLoggedIn){
    return (  
        <>
        <div style={{textAlign:'center', color:'white', fontFamily:'bungee'}}>
        <h1>Sign In</h1>
        {error && <div style={{color:'red', fontFamily:'bungee'}} className="error">{error} <br /> <br /></div>}
        <form id="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input 
                style={{maxWidth:'100px', fontFamily:'bungee'}}
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
                style={{maxWidth:'100px', fontFamily:'bungee'}}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                required
                />
                <br />
                <br />

                <button style={{borderRadius:'10px', textDecoration:'none', color:'black', fontFamily:'bungee'}}>Sign In</button>
        </form>
            <br />
            <div className="register-link">
                Don't have an account? <br />
                    <button onClick={()=> setGoRegister(true)} style={{borderRadius:'10px', textDecoration:'none', color:'black', fontWeight:'bolder', fontFamily:'bungee'}}>Sign Up </button>
            </div>
        </div>
        </>
    )}

    else if (isLoggedIn){
        return(
            <>
            <div style={{textAlign:'center'}}>
                <div >
                    <p style={{color:'white', fontFamily:'bungee'}}>Ready to play </p>
                    <p style={{color:'white', fontFamily:'bungee', fontSize:'1.5rem'}} >{currUsername}</p>
                    <Link to='playgame'>PlayGame</Link>
                </div>
                <div style={{color:'white', fontFamily:'bungee'}}>
                    <Link to='/user/best-times1/' style={{color:'white', fontFamily:'bungee', textDecoration:'none'}}   > <h1>Level 1 Times</h1></Link>
                    <Link to='/user/best-times2/' style={{color:'white', fontFamily:'bungee', textDecoration:'none'}}  > <h1>Level 2 Times</h1></Link>
                    <Link to='/user/best-times3/' style={{color:'white', fontFamily:'bungee', textDecoration:'none'}}  > <h1>Level 3 Times</h1></Link>
                </div>
                <div>
                    <button to="/homepage/" onClick={handleLogout} style={{borderRadius:'10px', textDecoration:'none', color:'black', fontWeight:'bolder', fontFamily:'bungee'}}>
                    Logout</button>
                </div>

            
            </div>
            </>
        )
    }
}
