import React, {useEffect} from 'react'
import s from '../events/event/Event.module.scss'
import {Header} from '../header/Header'
import {invitationsAPI} from '../../api/api'
import {useDispatch} from 'react-redux'
import {setAcceptedInvitesAC} from '../../store/acceptedInvites-reducer'
import {useAppSelector} from '../../store/store'
import img from '../../assets/img.png'

export const Participation = React.memo(() => {

    const dispatch = useDispatch()
    useEffect(() => {
        invitationsAPI.getAcceptedInvitations()
            .then((data) => {
                dispatch(setAcceptedInvitesAC(data.data))
            })
    }, [])

    const acceptedInvites = useAppSelector(state => state.acceptedInvites)

    return (
        <>
            <Header/>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{margin: '40px 0', fontFamily: '\'Cutive\', serif', fontSize: '36px'}}>Участие в мероприятиях</div>
                {
                    acceptedInvites.map(i => <div className={s.event}>
                        <div>
                            <img src={img} alt="img"/>
                        </div>
                        <div className={s.description}>
                            <h4>{i.title}</h4>
                            <p>Место: {i.location}</p>
                            <div className={s.date} style={{marginTop: '10px'}}>
                                {i.date.toString().slice(0, 10) + ` ` + i.date.toString().slice(11, 16)}
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </>
    )
})
