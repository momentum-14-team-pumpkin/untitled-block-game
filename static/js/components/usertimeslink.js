import React from "react"
import { useNavigate, Link, redirect } from "react-router-dom"
import CONSTS from "../consts"
import "/static/css/index.css"




export const ShowUserTimes = ({isLoggedIn}) => {
    if (isLoggedIn){
    return(
            <div className="btn-group" role="group">
                <button type="button" id="dropDownMenuBotton2" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"
                style={{background:'#f0f0f0', fontFamily:'bungee', color:'black'}}
                >
                    Your Best Times
                </button>
            <ul className="dropdown-menu" aria-labelledby="dropDownMenuBotton2" style={{background:'#f0f0f0', fontFamily:'bungee', color:'white'}}>
                <li><a className="dropdown-item" href="/userfullgametimes/">Full Game</a></li>
            {Array(CONSTS.NUM_OF_LEVELS - 1).fill(0).map((_, i) =>
                <li key={i}> <a className="dropdown-item" href={`/user/best-times${i+1}/`}> Level {i+1} </a></li>
            )}
            </ul>
            </div>
    )
}}