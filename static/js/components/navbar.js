import React from "react"
import "/static/css/index.css"
import {Link} from 'react-router-dom'

export const NavBar = () => {

    return(
        <>
        {/* <div style={{ display:'flex', justifyContent:'center'}}>
                <div>
                    <Link to={"/login"} element =''style={{textDecoration:'none', color:'darkgray', paddingRight:'30px'}}
                    >Login</Link>
                </div>
                <br></br>
                <div>
                    <Link {...isLoggedIn} to="/homepage/" onClick={handleLogout} style={{textDecoration:'none', color:'darkgray', paddingRight:'30px'}}>
                        Logout</Link>
                </div>
        </div>  
            <div style={{ display:'flex', justifyContent:'center', color:'darkgray', paddingTop:'20px'}} >
                Don't have a login?<Link to="/register" style={{textDecoration:'none', color:'black', paddingRight:'30px'}} >  Register Here</Link>
            </div> */}
            <h1 style={{textDecoration:'none', color:'white', fontFamily:'bungee', textAlign:'center', marginTop:'50px'}} >Top Overall Times</h1>
            <div style={{marginTop:'30px', margin:'auto', fontFamily:'bungee', textAlign:'center'}}>
                    <Link to="/leaderboard1/" style={{ color:'white', paddingRight:'30px'}} >LeaderBoard (Level 1)</Link>
                    <Link to="/leaderboard2/" style={{ color:'white', paddingRight:'30px'}} >LeaderBoard (Level 2)</Link>
                    <Link to="/leaderboard3/" style={{ color:'white', paddingRight:'30px'}} >LeaderBoard (Level 3)</Link>
            </div>


    </>
    )
}