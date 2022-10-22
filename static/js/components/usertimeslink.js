import React from "react"
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"
import "/static/css/index.css"
import { Register } from "./register";
import { PlayGame } from "./gameplay";



export const ShowUserTimes = ({isLoggedIn, token, setAuth, level, handleLogout}) => {
    if (isLoggedIn){
    return(
        <>
        <div style={{color:'white', fontFamily:'bungee', display:'flex', marginTop:'30px', marginBottom:'30px', justifyContent:'center'}}>
            <Link to='/user/best-times1/' style={{fontSize:'1.5rem', color:'white', fontFamily:'bungee', paddingRight:'30px'}}> Level 1 Times</Link>
            <Link to='/user/best-times2/' style={{fontSize:'1.5rem', color:'white', fontFamily:'bungee', paddingRight:'30px'}}> Level 2 Times</Link>
            <Link to='/user/best-times3/' style={{fontSize:'1.5rem', color:'white', fontFamily:'bungee', }}> Level 3 Times</Link>
        </div>
        <div style={{textAlign:'center'}}>
            <button to="/homepage/" onClick={handleLogout} style={{borderRadius:'10px', color:'black', fontWeight:'bolder', fontFamily:'bungee'}}>
            Logout</button>
        </div>
        </>
    )
}}