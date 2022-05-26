import React from 'react'
import s from './StartPage.module.scss'
import {SvgSelector} from '../../assets/SvgSelector'
import Button from '@material-ui/core/Button'
import {NavLink} from 'react-router-dom'

export const StartPage = React.memo(() => {

    const buttonStyle = {
        width: '220px',
        backgroundColor: '#fff',
        borderRadius: '15px',
        marginTop: '10px',
    }

    return (
        <div className={s.home}>
            <div className={s.title}>PlanEvent</div>
            <div>
                <SvgSelector svgId={'HOME-SVG'}/>
            </div>
            <div className={s.about}>
                PlanEvent-это универсальное приложение<br/> для подготовки к мероприятиям
            </div>
            <div className={s.buttons}>
                <NavLink to={'login'} style={{textDecoration: 'none'}}>
                    <Button style={buttonStyle}>Войти</Button>
                </NavLink>
                <NavLink to={'registration'} style={{textDecoration: 'none'}}>
                    <Button style={buttonStyle}>Регистрация</Button>
                </NavLink>
            </div>
        </div>
    )
})