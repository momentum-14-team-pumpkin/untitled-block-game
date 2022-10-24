import React from "react"
import { useNavigate, Link, redirect } from "react-router-dom"
import "/static/css/index.css"




export const ShowUserTimes = ({isLoggedIn, token, setAuth, level, handleLogout}) => {
    if (isLoggedIn){
    return(
        <>
        <div style={{color:'white', fontFamily:'bungee', display:'flex', float:'left', marginTop:'30px', marginBottom:'30px', justifyContent:'center', width:'100%'}}>
            {Array(window.NUM_OF_LEVELS).fill(0).map((_, i) =>
                <Link
                    key={i}
                    to={`/user/best-times${i}/`}
                    style={{
                        fontSize: '1.5rem',
                        color: 'white',
                        fontFamily: 'bungee',
                        paddingRight: '30px',
                        textAlign: 'center'
                    }}
                >User Level {i} Times</Link>
            )}
        </div>
        <div style={{textAlign:'center'}}>
            <Link to="/homepage/">
            <button onClick={handleLogout} style={{borderRadius:'10px', color:'black', fontWeight:'bolder', fontFamily:'bungee'}}>
            Logout</button></Link>
        </div>
        </>
    )
}}