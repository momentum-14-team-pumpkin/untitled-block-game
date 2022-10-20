import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom'
import { Login } from './components/login';
import useLocalStorageState from 'use-local-storage-state';
import { Register } from './components/register';
import axios from 'axios';
import { HomePage } from './components/homepage';
import { Leaderboard } from './components/leaderboard';
import '/static/css/index.css'
import { UserTimes } from './components/usertimes';
import { PlayGame } from './components/gameplay';


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
        <div style={{backgroundImage:'URL(/static/assets/images/brick-black.png)', minWidth:'100vw' ,backgroundSize:'cover', minHeight:'100vh'}}>
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
            element={<Login setAuth={setAuth} isLoggedIn={isLoggedIn} handleLogout={handleLogout} token={token}/>} 
            />
            <Route path="/Register" element={<Register setAuth={setAuth} isLoggedIn={isLoggedIn} />} 
            />
            <Route path='/leaderboard1' element={<Leaderboard level={1}/>} />
            <Route path='/leaderboard2' element={<Leaderboard level={2}/>} />
            <Route path='/leaderboard3' element={<Leaderboard level={3} />} />
            <Route path='/user/best-times1' element={<UserTimes level={1} setAuth={setAuth} token={token}/>} />
            <Route path='/user/best-times2' element={<UserTimes level={2} setAuth={setAuth} token={token}/>} />
            <Route path='/user/best-times3' element={<UserTimes level={3} setAuth={setAuth} token={token}/>} />
            <Route path='/playgame' element={<PlayGame token={token}/>} />
            </Routes>          
        </BrowserRouter>
        </div>
        </>
    )
}

export default App;