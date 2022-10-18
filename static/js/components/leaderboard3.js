import React, { useEffect } from "react"
import { useState } from "react";
import axios from "axios";
import "/static/css/index.css"


export const LeaderboardThree =() => {
    const [bestTimes, setBestTimes] = useState('')

    useEffect(() => {
        axios
        .get('https://young-plateau-94674.herokuapp.com/times')
        .then((res) =>
        setBestTimes(res.data))},[])

    if (bestTimes){
        return(
            <>
            <div style={{color:'white', width:'75%', margin:'auto', fontFamily:'helvetica' ,textAlign:'center', border: 'solid', borderBlockStyle:'dotted'}}>
                <div >
                    <h1>
                        Best Times For Level 3
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

