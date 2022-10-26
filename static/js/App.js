import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
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
import { Title } from './components/title';
import CONSTS from './consts';
import { FullGameLeaderboard } from './components/fullgameleaderboard';
import { UserFullGameLeaderboard } from './components/userfullgameleaderboard';
import { GameDescription } from './components/gamedetails';



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
        'https://blocks-of-time.herokuapp.com/auth/token/logout',
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
        <Title />
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
            <Route path='/homepage' element={<HomePage />}/>
            <Route path='/' element={<HomePage />}/>
            <Route path="/Register" element={<Register setAuth={setAuth} isLoggedIn={isLoggedIn} />}/>
            {Array(CONSTS.NUM_OF_LEVELS - 1).fill(0).map((_, i) =>
                <Route
                    key={i}
                    path={`/leaderboard${i + 1}`}
                    element={<Leaderboard level={i + 1}/>}
                />
            )}
            {Array(CONSTS.NUM_OF_LEVELS - 1).fill(0).map((_, i) =>
                <Route
                    key={i}
                    path={`/user/best-times${i + 1}`}
                    element={
                        <UserTimes
                            level={i + 1}
                            setAuth={setAuth}
                            token={token}
                            handleLogout={handleLogout}
                            currUsername={username}
                        />
                    }
                />
            )}
            <Route path='/user/fullgametimes' element={<UserFullGameLeaderboard token={token} currUsername={username} />}/>
            <Route path='/fullgameleaderboard' element={<FullGameLeaderboard />}/>
            <Route path='/playgame' element={<PlayGame setAuth={setAuth} token={token}/>} />
            </Routes>          
        </BrowserRouter>
        </div>
        </>
    )
}

export default App;