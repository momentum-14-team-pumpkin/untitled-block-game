import React from "react"
import { useNavigate, Link, redirect } from "react-router-dom"
import "/static/css/index.css"




export const ShowUserTimes = ({isLoggedIn, token, setAuth, level, handleLogout}) => {
    if (isLoggedIn){
    return(
        <>
        <div style={{textAlign:'center'}}>
                <div className="btn-group dropend" style={{border:'solid'}}>
                <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"
                style={{background:'#f0f0f0', fontFamily:'bungee', color:'black', borderRadius:'10px'}}
                >
                    Your Best Times
                </button>
            <ul className="dropdown-menu" style={{background:'#f0f0f0', fontFamily:'bungee', color:'white'}}>
                <li> <a className="dropdown-item" href='/user/best-times1/'> Level 1 </a></li>
                <li> <a className="dropdown-item" href='/user/best-times2/'> Level 2 </a></li>
                <li> <a className="dropdown-item" href='/user/best-times3/'> Level 3 </a></li>
                <li> <a className="dropdown-item" href='/user/best-times4/'> Level 4 </a></li>
                <li> <a className="dropdown-item" href='/user/best-times5/'> Level 5 </a></li>
            </ul>
            </div>
        </div>
        <div style={{textAlign:'center'}}>
            <Link to="/homepage/">
            <button onClick={handleLogout} style={{borderRadius:'10px', color:'black', fontWeight:'bolder', fontFamily:'bungee', background:'#f0f0f0'}}>
            Logout</button></Link>
        </div>
        </>
    )
}}