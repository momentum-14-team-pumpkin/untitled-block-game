import React, { useEffect } from "react"
import { useState } from "react";
import axios from "axios";
import "/static/css/index.css"


export const Leaderboard =({level}) => {
    const [bestTimes, setBestTimes] = useState('')

    useEffect(() => {
        axios
        .get(`https://young-plateau-94674.herokuapp.com/levels/${level}/times/`)
        .then((res) =>
        setBestTimes(res.data.sort((a,b)=> {
            let timeDiff = a.time - b.time
            if (timeDiff != 0){
                return timeDiff
            }
            return 0   //TODO: use created time 
        } 
        )))},[level])

    

    if (bestTimes){
        return(
            <>
            <div style={{color:'white', width:'75%', margin:'auto', fontFamily:'bungee' ,textAlign:'center', border: 'solid', borderBlockStyle:'dotted'}}>
                <div >
                    <h1>
                        Best Times For Level {level}
                    </h1>
                </div>
                <div>
                    {bestTimes.map((listOfTimes) => (
                    <div key={listOfTimes.id} 
                        style={{
                            textAlign:'center',
                            margin:'auto',
                        }}>
                        <div style={{textAlign:'center'}}>
                            <h2>{listOfTimes.time}</h2>
                            <p>{listOfTimes.player}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            </>
            )
    }
}
