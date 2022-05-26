import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import s from './App.module.scss'
import {StartPage} from '../components/startPage/StartPage'
import {Login} from '../components/login/Login'
import {Registration} from '../components/login/Registration'
import {Events} from '../components/events/Events'

export const App = React.memo(() => {
    return (
        <div className={s.app}>
            <Routes>
                <Route path='/' element={<StartPage/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='registration' element={<Registration/>}/>
                <Route path='events' element={<Events/>}/>
                <Route path='404' element={<h1>404: OOPS! PAGE NOT FOUND</h1>}/>
                <Route path='*' element={<Navigate to='404'/>}/>
            </Routes>
        </div>
    )
})