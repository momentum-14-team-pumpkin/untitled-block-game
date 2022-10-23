import React from "react"
import { useNavigate, Link, redirect } from "react-router-dom"
import "/static/css/index.css"




export const ShowUserTimes = ({isLoggedIn, token, setAuth, level, handleLogout}) => {
    if (isLoggedIn){
    return(
        <>
        <div style={{color:'white', fontFamily:'bungee', display:'flex', marginTop:'30px', marginBottom:'30px', justifyContent:'center', width:'100%'}}>
            <Link to='/user/best-times1/' style={{fontSize:'1.5rem', color:'white', fontFamily:'bungee', paddingRight:'30px', textAlign:'center'}}> User Level 1 Times</Link>
            <Link to='/user/best-times2/' style={{fontSize:'1.5rem', color:'white', fontFamily:'bungee', paddingRight:'30px', textAlign:'center'}}> User Level 2 Times</Link>
            <Link to='/user/best-times3/' style={{fontSize:'1.5rem', color:'white', fontFamily:'bungee',paddingRight:'30px', textAlign:'center'}}> User Level 3 Times</Link>
            <Link to='/user/best-times4/' style={{fontSize:'1.5rem', color:'white', fontFamily:'bungee',paddingRight:'30px', textAlign:'center'}}> User Level 4 Times</Link>
        </div>
        <div style={{textAlign:'center'}}>
            <Link to="/homepage/">
            <button onClick={handleLogout} style={{borderRadius:'10px', color:'black', fontWeight:'bolder', fontFamily:'bungee'}}>
            Logout</button></Link>
        </div>
        </>
    )
}}