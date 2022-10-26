import React, { useEffect, useState} from "react"
import axios from "axios";
import "/static/css/index.css"


export const UserFullGameLeaderboard =({currUsername, token }) => {
    const [userBestFullTimes, setUserBestFullTimes] = useState('')

    useEffect(() => {
        axios
        .get('https://blocks-of-time.herokuapp.com/user/full-run-times/', {
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
        let timeEntries = userBestFullTimes.map((timeEntry, index) =>
            `${(index + 1 + '.').padEnd(4)}${convertSecondsToTimestring(timeEntry.time)}`)
        const longestEntry = timeEntries.reduce((acc, elem) => Math.max(acc, elem.length), 0)
        timeEntries = timeEntries.map(text => text.replace('...', Array(longestEntry - text.length + 4).join('.')))

        return(
            <>
            <div className="box" style={{color:'white', width:'75%', margin:'auto', fontFamily:'bungee' ,textAlign:'center', paddingBottom:'50px'}}>
                <div>
                <p> {currUsername} </p>
                    <p style={{fontSize:'3rem'}}>
                        Your Full Game Best Times
                    </p>
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