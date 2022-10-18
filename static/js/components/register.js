import React from "react"
import { useState } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"
import {Link} from "react-router-dom"
import "/static/css/index.css"



export const Register = ({setAuth, isLoggedIn, registered}) => {
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const [error, setError] = useState(null)
    
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
                .then((res) =>
                    setAuth(username, res.data.auth_token))

                .catch((error) => {
                    if (error.response.data.username)
                        setError(error.response.data.username);
                
                    if (error.response.data.password)
                        setError(error.response.data.password)
                })
        }

        if (isLoggedIn) {
            return <Navigate to="/homepage/" />
        }


    return (  
        <>
        <h1 style={{fontFamily:'bungee', color:'white'}}>Registration Page</h1>
        {error && <div className="error">{error} <br /> <br /></div>}
        <form id="registration-form" onSubmit={handleSubmit}>
            <label style={{color:'white', fontFamily:'bungee'}} htmlFor="username">Username: </label>
            <input 
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                type="text"
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
                required
                />
                <br />
                <br />

                <button
                style={{color:'black', fontFamily:'bungee', borderRadius:'10px'}} 
                type="submit"
                value="Register"
                to='/'
                >Sign Up</button>
        </form>

        <br />
        <p style={{color:'white', fontFamily:'bungee', borderRadius:'10px'}}>Already have an account?</p>
            
            <div className="back-to-login-link">
                <Link style={{color:'white', fontFamily:'bungee', borderRadius:'10px', textDecoration:'none'}}  to="/Login">Back to Login</Link>
            </div>
        </>

        
    )
}