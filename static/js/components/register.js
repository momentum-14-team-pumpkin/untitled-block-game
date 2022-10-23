import React from "react"
import { useState } from "react"
import axios from "axios"
import {Link, redirect, useNavigate} from "react-router-dom"
import "/static/css/index.css"
import { ShowUserTimes } from "./usertimeslink"



export const Register = ({setAuth}) => {
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const [error, setError] = useState(null)
        const navigate = useNavigate()

        const handleSubmit = (e) => {
            e.preventDefault()
            console.log('handle submit')
            axios
                .post('https://young-plateau-94674.herokuapp.com/auth/users/', {
                    username: username,
                    password: password,
                })
                .then(() =>
                    axios.post(
                    'https://young-plateau-94674.herokuapp.com/auth/token/login/',
                    {
                    username: username,
                    password: password,
                    }
                )
                )
                .then((res) => {
                    console.log(res.data),
                    setAuth(username, res.data.auth_token),
                    navigate('/homepage/')
                    })

                .catch((error) => {
                    console.log(error)
                    if (error.response.data.username)
                        setError(error.response.data.username);
                
                    if (error.response.data.password)
                        setError(error.response.data.password);
                })

        }

    return (  
        <>
        <div style={{margin:'auto', textAlign:'center'}}>
        <h1 style={{fontFamily:'bungee', color:'white'}}>Registration Page</h1>
        {error && <div style={{color:'red', fontFamily:'bungee'}} className="error">{error} <br /> <br /></div>}
        <form id="registration-form" onSubmit={handleSubmit}>
            <label style={{color:'white', fontFamily:'bungee'}} htmlFor="username">Username: </label>
            <input 
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                style={{fontFamily:'bungee'}}
                autoComplete="on"
                value={username}
                required
                />
                <br />
                <br />

        <label style={{color:'white', fontFamily:'bungee'}}  htmlFor="password">Password: </label>
            
            <input 
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                style={{fontFamily:'bungee'}}
                required
                />
                <br />
                <br />
                <button
                style={{color:'black', fontFamily:'bungee', borderRadius:'10px'}} 
                type="submit"
                value="Register"
                >Register</button>
        </form>

        <br />
        <p style={{color:'white', fontFamily:'bungee', borderRadius:'10px'}}>Already have an account?</p>
            
            <div className="back-to-login-link">
                <Link style={{color:'white', fontFamily:'bungee', borderRadius:'10px', textDecoration:'none', fontSize:'1.5em'}}  to="/login/">Back to Login</Link>
            </div>
        </div>
        </>

        
    )}