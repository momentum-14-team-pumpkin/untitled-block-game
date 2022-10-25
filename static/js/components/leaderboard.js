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
        let timeEntries = bestTimes.map((timeEntry, index) =>
            `${(index + 1 + '.').padEnd(4)}${convertSecondsToTimestring(timeEntry.time)}...${timeEntry.player}`)
        const longestEntry = timeEntries.reduce((acc, elem) => Math.max(acc, elem.length), 0)
        timeEntries = timeEntries.map(text => text.replace('...', Array(longestEntry - text.length + 4).join('.')))

        return(
            <>
            <div className="box" style={{color:'white', width:'75%', margin:'auto', fontFamily:'bungee' ,textAlign:'center', paddingBottom:'50px'}}>
                <div>
                    <p style={{fontSize:'3rem'}}>
                        Best Times For Level {level}
                    </p>
                    <p style={{fontSize:'1rem', fontStyle:'italic'}}>Must <Link to="/login/" style={{color:'white'}}>Login </Link>To Make Leaderboard</p>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontFamily: 'Inconsolata, Courier, Consolas, "Fira Code", monospace',
                    fontSize: '2rem',
                }}>
                    <div>
                        {timeEntries
                            .map((entry, i) => (
                            <div key={i} style={{
                                whiteSpace: 'pre',
                            }}>
                                {entry}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </>
            )
    }
}

