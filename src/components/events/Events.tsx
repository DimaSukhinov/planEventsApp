import React, {useCallback, useEffect, useState} from 'react'
import s from './Events.module.scss'
import AddIcon from '@material-ui/icons/Add'
import Modal from '@material-ui/core/Modal'
import {AddEvent} from './addEvent/AddEvent'
import {useAppSelector} from '../../store/store'
import {Header} from '../header/Header'
import {Event} from './event/Event'
import {eventsAPI} from '../../api/api'
import {useDispatch} from 'react-redux'
import {setEventsAC} from '../../store/events-reducer'
import {StylesProvider} from '@material-ui/core';

export const Events = React.memo(() => {

    const dispatch = useDispatch()
    const events = useAppSelector(state => state.events)

    const [addEventModal, setAddEventModal] = useState(false)
    const handleOpenAddEventModal = useCallback(() => setAddEventModal(true), [])
    const handleCloseAddEventModal = useCallback(() => setAddEventModal(false), [])

    useEffect(() => {
        eventsAPI.allEvents().then((data) => {
            dispatch(setEventsAC(data.data.user_events))
        })
    }, [])

    return (
        <>
            <Header/>
            <div className={s.events}>
                <div className={s.title}>Мои мероприятия</div>
                <div className={s.addEvent} onClick={handleOpenAddEventModal}>
                    <AddIcon/>
                    <p>Добавить мероприятие</p>
                </div>
                <StylesProvider injectFirst>
                    <Modal open={addEventModal} onClose={handleCloseAddEventModal}>
                        {<AddEvent closeModal={setAddEventModal} handleCloseAddEventModal={handleCloseAddEventModal}/>}
                    </Modal>
                </StylesProvider>
                <div style={{marginBottom: '30px'}}>
                    {events.map(e => <Event key={e.id} event={e}/>)}
                </div>
            </div>
        </>
    )
})
