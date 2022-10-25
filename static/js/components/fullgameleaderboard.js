import React, { useEffect } from "react"
import { useState } from "react";
import axios from "axios";
import "/static/css/index.css"
import { Link } from "react-router-dom";


export const FullGameLeaderboard =({}) => {
    const [bestFullTimes, setBestFullTimes] = useState('')

    useEffect(() => {
        axios
        .get('https://young-plateau-94674.herokuapp.com/full-run-times/')
        .then((res) =>
        setBestFullTimes(res.data.results.sort((a,b)=> {
            let timeDiff = a.time - b.time
            if (timeDiff != 0){
                return timeDiff
            }
            return 0   //TODO: use created time 
        } 
        )))},[])

    

    if (bestFullTimes){
        return(
            <>
            <div className="box" style={{color:'white', width:'75%', margin:'auto', fontFamily:'bungee' ,textAlign:'center', paddingBottom:'50px'}}>
                <div>
                    <p style={{fontSize:'3rem'}}>
                        Full Game Best Times
                    </p>
                    <p style={{fontSize:'1rem', fontStyle:'italic'}}>Must <Link to="/login/" style={{color:'white'}}>Login </Link>To Make Leaderboard</p>
                </div>
                <div>
                    {bestFullTimes.map((listOfTimes) => (
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