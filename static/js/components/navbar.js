import React from "react"
import "/static/css/index.css"
import {Link} from 'react-router-dom'
import { ShowUserTimes } from "./usertimeslink"
import { Title } from "./title"
import "/static/css/title.css"
import { LoginOrShowUser } from "./login-or-showuser"


export const NavBar = ({isLoggedIn, handleLogout, token, setAuth, currUsername, level}) => {

    return(
        <>
        <div>
            <LoginOrShowUser isLoggedIn={isLoggedIn} currUsername={currUsername} handleLogout={handleLogout}/>
            <div style={{ display:'flex', justifyContent:'center', color:'white', fontFamily:'bungee'}}>

            <div style={{justifyContent:'center', display:'flex', marginBottom:'30px'}}>
                <div className='btn-group' role="group" style={{borderRadius:'10px', overflow:'none'}}>
                    <div className="btn-group" role="group" >
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                            style={{background:'#f0f0f0', fontFamily:'bungee', color:'black'}}>
                                LeaderBoard
                            </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1"  style={{background:'#f0f0f0', fontFamily:'bungee', color:'black'}}>
                            <li> <a className="dropdown-item" href='/leaderboard1/'> Level 1 </a></li>
                            <li> <a className="dropdown-item" href='/leaderboard2/'> Level 2 </a></li>
                            <li> <a className="dropdown-item" href='/leaderboard3/'> Level 3 </a></li>
                            <li> <a className="dropdown-item" href='/leaderboard4/'> Level 4 </a></li>
                            <li> <a className="dropdown-item" href='/leaderboard5/'> Level 5 </a></li>
                        </ul>
                    </div>
                    <ShowUserTimes isLoggedIn={isLoggedIn} token={token} handleLogout={handleLogout} setAuth={setAuth}/>
                </div>
            </div>

            </div>
        </div>
    </>
    )
}