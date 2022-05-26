import React, {useCallback, useState} from 'react'
import s from './Events.module.scss'
import AddIcon from '@material-ui/icons/Add'
import Modal from '@material-ui/core/Modal'
import {AddEvent} from './addEvent/AddEvent'
import {useAppSelector} from '../../store/store'
import {Header} from '../header/Header'
import {Event} from './event/Event'

export const Events = React.memo(() => {

    const events = useAppSelector(state => state.events)

    const [addEventModal, setAddEventModal] = useState(false)
    const handleOpenAddEventModal = useCallback(() => setAddEventModal(true), [])
    const handleCloseAddEventModal = useCallback(() => setAddEventModal(false), [])

    return (
        <>
            <Header/>
            <div className={s.events}>
                <div className={s.title}>Мои мероприятия</div>
                <div className={s.addEvent} onClick={handleOpenAddEventModal}>
                    <AddIcon/>
                    <p>Добавить мероприятие</p>
                </div>
                <Modal
                    open={addEventModal}
                    onClose={handleCloseAddEventModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {<AddEvent closeModal={setAddEventModal}/>}
                </Modal>
                <div>
                    {events.map(e => <Event event={e}/>)}
                </div>
            </div>
        </>
    )
})