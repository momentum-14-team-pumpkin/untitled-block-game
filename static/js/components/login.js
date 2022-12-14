import React from "react"
import { useState } from "react";
import axios from "axios";
import "/static/css/index.css"
import { Register } from "./register";
import { useNavigate } from "react-router-dom";



export const Login = ({setAuth, isLoggedIn}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [goRegister, setGoRegister] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        setError(null)
        axios
        .post('https://blocks-of-time.herokuapp.com/auth/token/login/', {
            username: username,
            password: password,
        })
        .then((res) => {
            const token = res.data.auth_token
            setAuth(username, token)
            navigate('/')
        })
        .catch((error) => {
            console.log(error)
            if (error.response.data.non_field_errors)
            setError(error.response.data.non_field_errors);
        
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
            <label htmlFor="username">Username </label>
            <input 
                style={{maxWidth:'200px', fontFamily:'sans-serif', marginLeft:'1rem'}}
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                autoComplete="on"
                value={username}
                required
                />
                <br />
                <br />

<label htmlFor="password">Password </label>
            <input 
                style={{maxWidth:'200px', fontFamily:'sans-serif', marginLeft:'1rem'}}
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
        </div>
        </>
    )}

    }
