import React from "react"
import "/static/css/index.css"
import { ShowUserTimes } from "./usertimeslink"
import "/static/css/title.css"
import { LoginOrShowUser } from "./login-or-showuser"
// import CONSTS from "../consts"
import { useState } from "react"
import { PlayGame } from "./gameplay"
import CONSTS from "../consts"


export const NavBar = ({isLoggedIn, handleLogout, token, setAuth, currUsername, goPlay, level}) => {

    return(
        <>
        <div>
            <LoginOrShowUser isLoggedIn={isLoggedIn} currUsername={currUsername} handleLogout={handleLogout} token={token}/>
            <div style={{ display:'flex', justifyContent:'center', color:'white', fontFamily:'bungee'}}>

            <div style={{justifyContent:'center', display:'flex', marginBottom:'30px'}}>
                <div className='btn-group' role="group" style={{borderRadius:'10px', overflow:'none'}}>
                    <div className="btn-group" role="group" >
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                            style={{background:'#f0f0f0', fontFamily:'bungee', color:'black'}}>
                                LeaderBoard
                            </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1"  style={{background:'#f0f0f0', fontFamily:'bungee', color:'black'}}>
                            <li><a className="dropdown-item" href="/fullgameleaderboard/">Full Game</a></li>
                            {Array(CONSTS.NUM_OF_LEVELS - 1).fill(0).map((_, i) =>
                                <li key={i}> <a className="dropdown-item" href={`/leaderboard${i+1}/`}> Level {i+1} </a></li>
                            )}
                        </ul>
                    </div>
                    <ShowUserTimes isLoggedIn={isLoggedIn} token={token} handleLogout={handleLogout} setAuth={setAuth}/>
                </div>
            </div>
            </div>
        </div>

    </>
    )}