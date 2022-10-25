import React from "react"
import { useState } from "react"
import axios from "axios"
import "/static/css/index.css"
import { useEffect } from "react"


export const UserTimes = ({level, currUsername, setAuth, token, isLoggedIn}) => {
    const [userBestTimes, setUserBestTimes] = useState('')

    useEffect(() => {
        axios
        .get(`https://blocks-of-time.herokuapp.com/user/level/${level}/times/`, {
            headers: {
                Authorization: `Token ${token}`
            },
        })
        .then((res) =>
        setUserBestTimes(res.data.results.sort((a,b)=> {
            let timeDiff = a.time - b.time
            if (timeDiff != 0){
                return timeDiff
            }
            return 0   //TODO: use created time 
        } 
        )))},[level, token])

    

    if (userBestTimes){
        return(
            <>
            <div className='box' style={{color:'white', width:'75%', margin:'auto', fontFamily:'bungee' ,textAlign:'center'}}>
                <div style={{fontSize:'3rem'}}>
                    <p> {currUsername} </p>
                    <p>Best Times  For Level {level}</p>
                    
                </div>
                <div>
                    {userBestTimes.map((listOfTimes) => (
                    <div key={listOfTimes.id} 
                        style={{
                            textAlign:'center',
                            margin:'auto',
                        }}>
                        <div style={{textAlign:'center'}}>
                            <p>{convertSecondsToTimestring(listOfTimes.time)}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            </>
            )
    }
}