import React from "react"
import "/static/css/index.css"



export const LoginOrShowUser =({isLoggedIn, handleLogout}) => {


    if (!isLoggedIn) {
    return(
        <>
                <a href="/register/" className="btn btn-primary active" aria-current="page" style={{background:'#f0f0f0', fontFamily:'bungee', color:'black', borderColor:'black'}}>Register</a>
                <a href="/login/" className="btn btn-primary active" aria-current="page" style={{background:'#f0f0f0', fontFamily:'bungee', color:'black', borderColor:'black'}}>Login</a>
                <a href='/playgame/' className="btn btn-primary active" aria-current="page" style={{background:'#f0f0f0', fontFamily:'bungee', color:'black', borderColor:'black'}} >PlayGame</a>
        </>
    )}

    else {
        return(
            <>
                    <a href='/playgame/' className="btn btn-primary active" aria-current="page" style={{background:'#f0f0f0', fontFamily:'bungee', color:'black', borderColor:'black'}} >Play Game</a>
                    <a className="btn btn-primary active" onClick={handleLogout} aria-current="page" style={{background:'#f0f0f0', fontFamily:'bungee', color:'black', borderColor:'black'}}>Logout</a>
            </>
        )
    }
}