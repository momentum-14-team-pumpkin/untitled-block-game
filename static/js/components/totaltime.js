import React from "react"
import { useState } from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import "/static/css/index.css"


export const UserTimesTotal = ({level, currUsername, setAuth, token, isLoggedIn}) => {
    const [userBestTimesTotal, setUserBestTimesTotal] = useState('')

    useEffect(() => {
        axios
        .get(`https://young-plateau-94674.herokuapp.com/user/level/${level}/times/`, {
            headers: {
                Authorization: `Token ${token}`
            },
        })
        .then((res) =>
        setUserBestTimesTotal(res.data.sort((a,b)=> {
            let timeDiff = a.time + b.time
            if (timeDiff != 0){
                return timeDiff
            }
            return 0   //TODO: use created time ??
        } 
        )))},[level, token])

if (userBestTimesTotal){
    return(
        <>
<p style={{color:'white', fontFamily:'bungee', borderRadius:'10px'}}>Already have an account?</p>
            
<div className="back-to-login-link">
    <Link style={{color:'white', fontFamily:'bungee', borderRadius:'10px', textDecoration:'none', fontSize:'1.5em'}}  to="/homepage/">Back to Homepage</Link>
</div>
</div>
</>


)
}