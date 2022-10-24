import React from "react"
import "/static/css/index.css"
import {Link} from 'react-router-dom'
import { ShowUserTimes } from "./usertimeslink"

export const NavBar = ({isLoggedIn, handleLogout, token, setAuth, level}) => {

    return(
        <>
        <div>
            <Link to='/' style={{textDecoration:'none'}}>
            <h1 style={{fontFamily:'Bungee', textTransform:'uppercase', fontSize:'84px', fontWeight:'600',  color:'white', textAlign:'center', marginTop:'0', paddingTop:'4rem'}}
            >Blocks of Time </h1></Link>
            <div style={{ display:'flex', justifyContent:'center', color:'white', fontFamily:'bungee'}}>
                    <div>
                        <Link to={"/login/"} element =''style={{color:'white', fontFamily:'bungee', paddingRight:'30px'}}
                        >Login</Link>
                        <Link to='/playgame/'
                        style={{color:'white', fontFamily:'bungee', borderRadius:'10px'}}
                        >Play Game</Link>
                    </div>
                    <br></br>
                    {/* <div>
                        <Link {...isLoggedIn} to="/homepage/" onClick={handleLogout} style={{ color:'white', paddingRight:'30px'}}>
                            Logout</Link>
                    </div> */}
            </div>  
            <div style={{ display:'flex', justifyContent:'center', color:'white', paddingTop:'20px', fontFamily:'bungee', marginBottom:'20px'}} >
                Don't have a login?<Link to="/register" style={{ color:'white', paddingRight:'30px', paddingLeft:'10px'}} >  Register Here</Link>
            </div>
            <div style={{marginTop:'30px', display:'flex', fontFamily:'bungee', justifyContent:'center', width:'100%'}}>
                {Array(window.NUM_OF_LEVELS).fill(0).map((_, i) =>
                    <Link
                        key={i}
                        to={`/leaderboard${i + 1}/`}
                        style={{
                            color: 'white',
                            paddingRight: '30px',
                            textAlign: 'center'
                        }}
                    >Leaderboard (Level {i + 1})</Link>
                )}
            </div>
            <div>
                <ShowUserTimes isLoggedIn={isLoggedIn} token={token} handleLogout={handleLogout} setAuth={setAuth}/>
            </div>


        </div>
    </>
    )
}