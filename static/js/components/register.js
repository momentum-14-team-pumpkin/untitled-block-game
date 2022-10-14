import React from "react"
import { useState } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"
import {Link} from "react-router-dom"


export const Register = ({setAuth, isLoggedIn}) => {
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
            return <Navigate to="/" />
        }

    return (  
        <>
        <h1>Registration Page</h1>
        {error && <div className="error">{error} <br /> <br /></div>}
        <form id="registration-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
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

        <label htmlFor="password">Password: </label>
            
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
                type="submit"
                value="Register"
                to='/'
                >Sign Up</button>
        </form>

        <br />
            Already have an account?
            <div className="back-to-login-link">
                <Link to="/Login">Back to Login</Link>
            </div>
        </>

        
    )
}