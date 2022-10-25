import React, { useEffect } from "react"
import { useState } from "react";
import axios from "axios";
import "/static/css/index.css"
import {  Link } from "react-router-dom";


export const Leaderboard =({level}) => {
    const [bestTimes, setBestTimes] = useState('')

    useEffect(() => {
        axios
        .get(`https://blocks-of-time.herokuapp.com/levels/${level}/times/`)
        .then((res) =>
        setBestTimes(res.data.results.sort((a,b)=> {
            let timeDiff = a.time - b.time
            if (timeDiff != 0){
                return timeDiff
            }
            return 0  
        } 
        )))},[level])

    

    if (bestTimes){
        return(
            <>
            <div className="box" style={{color:'white', width:'75%', margin:'auto', fontFamily:'bungee' ,textAlign:'center', paddingBottom:'50px'}}>
                <div>
                    <p style={{fontSize:'3rem'}}>
                        Best Times For Level {level}
                    </p>
                    <p style={{fontSize:'1rem', fontStyle:'italic'}}>Must <Link to="/login/" style={{color:'white'}}>Login </Link>To Make Leaderboard</p>
                </div>
                <div>
                    {bestTimes.map((listOfTimes) => (
                    <div key={listOfTimes.id} 
                        style={{
                            textAlign:'center',
                            margin:'auto',
                        }}>
                        <div style={{display:'flex', justifyContent:'center', fontSize:'1.5rem', margin:'auto', textAlign:'center', maxWidth:'80%'}}>
                            <p>{convertSecondsToTimestring(listOfTimes.time)}</p>
                            <p>...............{listOfTimes.player}</p>
                            
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            </>
            )
    }
}

