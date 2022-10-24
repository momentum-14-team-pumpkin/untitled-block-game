import React from "react"
import { useNavigate, Link, redirect } from "react-router-dom"
import CONSTS from "../consts"
import "/static/css/index.css"




export const ShowUserTimes = ({isLoggedIn, token, setAuth, level, handleLogout}) => {
    if (isLoggedIn){
    return(
            <div className="btn-group" role="group">
                <button type="button" id="dropDownMenuBotton2" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"
                style={{background:'#f0f0f0', fontFamily:'bungee', color:'black'}}
                >
                    Your Best Times
                </button>
            <ul className="dropdown-menu" aria-labelledby="dropDownMenuBotton2" style={{background:'#f0f0f0', fontFamily:'bungee', color:'white'}}>
                <li> <a className="dropdown-item" href='/user/best-times1/'> Level 1 </a></li>
                <li> <a className="dropdown-item" href='/user/best-times2/'> Level 2 </a></li>
                <li> <a className="dropdown-item" href='/user/best-times3/'> Level 3 </a></li>
                <li> <a className="dropdown-item" href='/user/best-times4/'> Level 4 </a></li>
                <li> <a className="dropdown-item" href='/user/best-times5/'> Level 5 </a></li>
            </ul>
            </div>
    )
}}