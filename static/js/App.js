import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, BrowserRouter, redirect } from 'react-router-dom'
import { Login } from './components/login';
import useLocalStorageState from 'use-local-storage-state';
import { Register } from './components/register';
import axios from 'axios';
import { HomePage } from './components/homepage';
import { Leaderboard } from './components/leaderboard';
import '/static/css/index.css'
import { UserTimes } from './components/usertimes';
import { PlayGame } from './components/gameplay';
import { NavBar } from './components/navbar';



function App() {
    const [token, setToken] = useLocalStorageState('BlockOfTimeToken', null )
    const [username, setUsername] =  useLocalStorageState('BlockOfTimeUsername', '')

    useEffect(() => {
        window.userToken = token
    }, [])

    const setAuth = (username, token) => {
        setToken(token)
        setUsername(username)
        window.userToken = token
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
        .catch(() => 
        setAuth('', null)
        )
    }

    const isLoggedIn = username && token


    return (
        <>
        <div style={{backgroundImage:'URL(/static/assets/images/brick-black.png)', minWidth:'100vw', position:'absolute', backgroundRepeat:'yes', minHeight:'100vh'}}>
        <BrowserRouter>
        <NavBar setAuth={setAuth} handleLogout={handleLogout} isLoggedIn={isLoggedIn} token={token} currUsername={username}/>
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
            element={<Login setAuth={setAuth} currUsername={username} isLoggedIn={isLoggedIn} handleLogout={handleLogout} token={token}/>} 
            />
            <Route path='/homepage' element={<HomePage isLoggedIn={isLoggedIn} currUsername={username} handleLogout={handleLogout} setAuth={setAuth} token={token}/>}/>
            <Route path="/Register" element={<Register setAuth={setAuth} isLoggedIn={isLoggedIn} />}/>
            <Route path='/leaderboard1' element={<Leaderboard level={1}/>} />
            <Route path='/leaderboard2' element={<Leaderboard level={2}/>} />
            <Route path='/leaderboard3' element={<Leaderboard level={3} />} />
            <Route path='/leaderboard4' element={<Leaderboard level={4} />} />
            <Route path='/leaderboard5' element={<Leaderboard level={5} />} />
            <Route path='/user/best-times1' element={<UserTimes level={1} setAuth={setAuth} token={token} handleLogout={handleLogout} currUsername={username}/>} />
            <Route path='/user/best-times2' element={<UserTimes level={2} setAuth={setAuth} token={token} currUsername={username}/>} />
            <Route path='/user/best-times3' element={<UserTimes level={3} setAuth={setAuth} token={token} currUsername={username}/>} />
            <Route path='/user/best-times4' element={<UserTimes level={4} setAuth={setAuth} token={token} currUsername={username}/>} />
            <Route path='/user/best-times5' element={<UserTimes level={5} setAuth={setAuth} token={token} currUsername={username}/>} />
            <Route path='/playgame' element={<PlayGame token={token}/>} />
            </Routes>          
        </BrowserRouter>
        </div>
        </>
    )
}

export default App;