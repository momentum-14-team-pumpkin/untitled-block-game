import React from "react"
import "/static/css/index.css"
import {Link} from 'react-router-dom'
import { ShowUserTimes } from "./usertimeslink"
import { Title } from "./title"
import "/static/css/title.css"


export const NavBar = ({isLoggedIn, handleLogout, token, setAuth, level}) => {

    return(
        <>
        <div>
            <Title />
            <div style={{ display:'flex', justifyContent:'center', color:'white', fontFamily:'bungee'}}>
                    <div>
                        <Link to={"/login/"} element =''style={{color:'white', fontFamily:'bungee', paddingRight:'30px'}}
                        >Login</Link>
                        <Link to='/playgame/'
                        style={{color:'white', fontFamily:'bungee', borderRadius:'10px'}}
                        >Play Game</Link>
                    </div>
                    <br></br>
            </div>  
            <div style={{ display:'flex', justifyContent:'center', color:'white', paddingTop:'20px', fontFamily:'bungee', marginBottom:'20px'}} >
                Don't have a login?<Link to="/register" style={{ color:'white', paddingRight:'30px', paddingLeft:'10px'}} >  Register Here</Link>
            </div>
            <div style={{textAlign:'center'}}>
                <div className="btn-group dropend">
                    <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"
                    style={{background:'#f0f0f0', fontFamily:'bungee', color:'black'}}
                    >
                        LeaderBoard
                    </button>
                <ul className="dropdown-menu" style={{background:'#f0f0f0', fontFamily:'bungee', color:'black'}}>
                    <li> <a className="dropdown-item" href='/leaderboard1/'> Level 1 </a></li>
                    <li> <a className="dropdown-item" href='/leaderboard2/'> Level 2 </a></li>
                    <li> <a className="dropdown-item" href='/leaderboard3/'> Level 3 </a></li>
                    <li> <a className="dropdown-item" href='/leaderboard4/'> Level 4 </a></li>
                    <li> <a className="dropdown-item" href='/leaderboard5/'> Level 5 </a></li>
                </ul>
                </div>
            </div>
            <div>
                <ShowUserTimes isLoggedIn={isLoggedIn} token={token} handleLogout={handleLogout} setAuth={setAuth}/>
            </div>


        </div>
    </>
    )
}