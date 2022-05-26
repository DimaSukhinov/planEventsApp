import React from 'react'
import s from './Header.module.scss'
import {AppBar, Toolbar, Typography} from '@mui/material'
import Button from '@mui/material/Button'
import {NavLink} from 'react-router-dom'

export const Header = React.memo(() => {

    return (
        <div className={s.main}>
            <AppBar position="static" style={{backgroundColor: '#6666B5'}}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <Typography variant="h6" >
                        <NavLink to={'/events'} className={s.link}>Мои мероприятия</NavLink>
                        <NavLink to={'/invites'} className={s.link}>Мои приглашения</NavLink>
                        <NavLink to={'/participation'} className={s.link}>Участие в мероприятиях</NavLink>
                    </Typography>
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
})