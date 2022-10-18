import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom'
import { Login } from './components/login';
import useLocalStorageState from 'use-local-storage-state';
import { Register } from './components/register';
import axios from 'axios';
import { HomePage } from './components/homepage';
import { LeaderboardOne } from './components/leaderboard1';
import '/static/css/index.css'
import { LeaderboardTwo } from './components/leaderboard2';
import { LeaderboardThree } from './components/leaderboard3';

function App() {
    const [token, setToken] = useLocalStorageState('BlockOfTimeToken', null )
    const [username, setUsername] =  useLocalStorageState('BlockOfTimeUsername', '')

    const setAuth = (username, token) => {
        setToken(token)
        setUsername(username)
    }

    const handleLogout = () => {
        axios
        .post(
        'https://young-plateau-94674.herokuapp.com/auth/token/logout',
        {},
        {
            headers: {
            Authorization: `Token ${token}`,
            },
        }
        )
        .then(() =>
        setAuth('', null),
        )
    }

    const isLoggedIn = username && token


    return (
        <>
        <div style={{backgroundImage:'URL(/static/assets/images/brick-black.png)', backgroundSize:'cover', minHeight:'100vh',}}>
        <BrowserRouter>
        <HomePage isLoggedIn={isLoggedIn} currUsername={username} handleLogout={handleLogout} setAuth={setAuth} token={token}/>
            <Routes>
            <Route
                path="*"
                element={
                    <main>
                    <p>  Welcome </p>
                </main>
                }
                />  
            <Route path="/Login"
            element={<Login setAuth={setAuth} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} 
            />
            <Route path="/Register" element={<Register setAuth={setAuth} isLoggedIn={isLoggedIn} />} 
            />
            <Route path='/leaderboard1' element={<LeaderboardOne />} />
            <Route path='/leaderboard2' element={<LeaderboardTwo />} />
            <Route path='/leaderboard3' element={<LeaderboardThree />} />
            </Routes>          
        </BrowserRouter>
        </div>
        </>
    )
}

export default App;