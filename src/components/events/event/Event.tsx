import React, {useCallback, useState} from 'react'
import s from './Event.module.scss'
import img from '../../../assets/img.png'
import {EventType} from '../../../store/events-reducer'
import {AboutEvent} from '../aboutEvent/AboutEvent'
import Modal from '@material-ui/core/Modal'

type EventPropsType = {
    event: EventType
}

export const Event = (props: EventPropsType) => {

    const [eventModal, setEventModal] = useState(false)

    const handleOpenEventModal = useCallback(() => setEventModal(true), [])

    const handleCloseEventModal = useCallback(() => setEventModal(false), [])

    return (
        <>
            <div className={s.event} onClick={handleOpenEventModal}>
                <div>
                    <img src={props.event.img || img} alt="img"/>
                </div>
                <div className={s.description}>
                    <h4>{props.event.title}</h4>
                    <div className={s.date}>
                        {props.event.date.toString().slice(0, 10) + ` ` + props.event.date.toString().slice(11, 16)}
                    </div>
                </div>
            </div>
            <Modal
                open={eventModal}
                onClose={handleCloseEventModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {<AboutEvent event={props.event} closeModal={setEventModal}
                             handleCloseEventModal={handleCloseEventModal}/>}
            </Modal>
        </>
    )
}
