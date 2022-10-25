import React from "react"
import "/static/css/index.css"
import { ShowUserTimes } from "./usertimeslink"
import "/static/css/title.css"
import { LoginOrShowUser } from "./login-or-showuser"
import CONSTS from "../consts"
import { useLocation } from "react-router-dom"


export const NavBar = ({isLoggedIn, handleLogout, token, setAuth, currUsername}) => {

    const location = useLocation()
    
    if(location.pathname === '/playgame/'){
        return <></>
    }

    return(           
            <div style={{display:'flex', justifyContent:'center', marginTop:'20px', marginBottom:'20px'}}>
            <div className='btn-group' role='group'>
                <LoginOrShowUser isLoggedIn={isLoggedIn} currUsername={currUsername} handleLogout={handleLogout} token={token}/>                        
                <div className='btn-group' role='group'>
                    <button className="btn btn-primary dropdown-toggle" role='group' type="button" id="btnGroupDrop1" data-bs-toggle="dropdown" aria-expanded="false"
                        style={{background:'#f0f0f0', fontFamily:'bungee', color:'black', borderColor:'black'}}>
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
    )}