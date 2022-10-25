import React, { useEffect, useState} from "react"
import axios from "axios";
import "/static/css/index.css"


export const UserFullGameLeaderboard =({currUsername, token }) => {
    const [userBestFullTimes, setUserBestFullTimes] = useState('')

    useEffect(() => {
        axios
        .get('https://young-plateau-94674.herokuapp.com/user/full-run-times/', {
            headers: {
                Authorization: `Token ${token}`
            },
        })
        .then((res) =>
        setUserBestFullTimes(res.data.results.sort((a,b)=> {
            let timeDiff = a.time - b.time
            if (timeDiff != 0){
                return timeDiff
            }
            return 0   //TODO: use created time 
        } 
        )))},[token])

    

    if (userBestFullTimes){
        return(
            <>
            <div className="box" style={{color:'white', width:'75%', margin:'auto', fontFamily:'bungee' ,textAlign:'center', paddingBottom:'50px'}}>
                <div>
                <p> {currUsername} </p>
                    <p style={{fontSize:'3rem'}}>
                        Your Full Game Best Times
                    </p>
                </div>
                <div>
                    {userBestFullTimes.map((listOfTimes) => (
                    <div key={listOfTimes.id} 
                        style={{
                            textAlign:'center',
                            margin:'auto',
                        }}>
                        <div style={{display:'flex', justifyContent:'center', fontSize:'1.5rem', margin:'auto', textAlign:'center', maxWidth:'80%'}}>
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