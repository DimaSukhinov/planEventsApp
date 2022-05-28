import React, {useCallback} from 'react'
import s from './Header.module.scss'
import {AppBar, Toolbar, Typography} from '@mui/material'
import Button from '@mui/material/Button'
import {NavLink, useNavigate} from 'react-router-dom'
import {userKeyStorage} from '../../api/Storage'
import {useDispatch} from 'react-redux'
import {setIsLoggedInAC} from '../../store/auth-reducer'
import {setEventsAC} from '../../store/events-reducer';

export const Header = React.memo(() => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = useCallback(() => {
        userKeyStorage.removeItem('key')
        dispatch(setIsLoggedInAC(false))
        dispatch(setEventsAC([]))
        navigate('/login')
    }, [dispatch, navigate])

    return (
        <div className={s.main}>
            <AppBar position="static" style={{backgroundColor: '#6666B5'}}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <Typography variant="h6" >
                        <NavLink to={'/events'} className={s.link}>Мои мероприятия</NavLink>
                        <NavLink to={'/invites'} className={s.link}>Мои приглашения</NavLink>
                        <NavLink to={'/participation'} className={s.link}>Участие в мероприятиях</NavLink>
                    </Typography>
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
})
