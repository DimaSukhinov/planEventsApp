import React, {useCallback, useEffect} from 'react'
import s from '../events/event/Event.module.scss'
import {Header} from '../header/Header'
import {invitationsAPI} from '../../api/api'
import {useDispatch} from 'react-redux'
import {setInvitesAC} from '../../store/invites-reducer'
import {useAppSelector} from '../../store/store'
import img from '../../assets/img.png'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'

export const Invites = React.memo(() => {

    const dispatch = useDispatch()
    useEffect(() => {
        invitationsAPI.getInvitations()
            .then((data) => {
                dispatch(setInvitesAC(data.data))
            })
    }, [])

    const invites = useAppSelector(state => state.invites)

    const acceptEvent = useCallback((eventId: number, type: 'accept') => () => {
        invitationsAPI.postInvitations(eventId, type).then()
        invitationsAPI.getInvitations().then((data) => {
            dispatch(setInvitesAC(data.data))
        })
    }, [dispatch])

    const rejectEvent = useCallback((eventId: number, type: 'reject') => () => {
        invitationsAPI.postInvitations(eventId, type).then()
        invitationsAPI.getInvitations().then((data) => {
            dispatch(setInvitesAC(data.data))
        })
    }, [dispatch])

    return (
        <>
            <Header/>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{margin: '40px 0', fontFamily: '\'Cutive\', serif', fontSize: '36px'}}>Мои приглашения</div>
                {
                    invites.map(i => <div className={s.event}>
                        <div>
                            <img src={img} alt="img"/>
                        </div>
                        <div className={s.description}>
                            <h4>{i.title}</h4>
                            <p>Место: {i.location}</p>
                            <div className={s.date} style={{marginTop: '10px'}}>
                                {i.date.toString().slice(0, 10) + ` ` + i.date.toString().slice(11, 16)}
                            </div>
                            <div>
                                <p>Подтвердите участие:</p>
                                <div style={{textAlign: 'center'}}>
                                    <CheckCircleIcon onClick={acceptEvent(i.id, 'accept')} style={{marginRight: '10px'}}/>
                                    <CancelIcon onClick={rejectEvent(i.id, 'reject')} style={{marginLeft: '10px'}}/>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </>
    )
})
