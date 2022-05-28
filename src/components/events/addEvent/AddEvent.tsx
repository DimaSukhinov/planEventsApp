import React, {ChangeEvent, useCallback, useState} from 'react'
import s from './AddEvent.module.scss'
import {TextField} from '@mui/material'
import Button from '@mui/material/Button'
import {useDispatch} from 'react-redux'
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import {eventsAPI} from '../../../api/api'
import {setEventsAC} from '../../../store/events-reducer'

type AddEventPropsType = {
    closeModal: (open: boolean) => void
}

export const AddEvent = (props: AddEventPropsType) => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [date, setDate] = useState<Date | null>(null)
    const [error, setError] = useState<string | null>(null)

    const onTitleChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value), [])
    const onLocationChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setLocation(e.currentTarget.value), [])
    const onDataChangeHandler = useCallback((date: Date | null) => {
        if (date && date > new Date()) {
            setDate(date)
        }
    }, [])

    const addEvent = useCallback(() => {
        if (title.trim() !== '' && date) {
            eventsAPI.createEvent(title, date.toString().split('+')[0], location).then()
            eventsAPI.allEvents().then((data) => {
                dispatch(setEventsAC(data.data.user_events))
            })
            props.closeModal(false)
        } else {
            setError('Title is required')
        }
    }, [title, date, location, props, dispatch])

    return (
        <div className={s.paper}>
            <p className={s.title}>Новое мероприятие</p>
            <div>
                <p>Название мероприятия:</p>
                <TextField variant="outlined" value={title} onChange={onTitleChangeHandler}
                           error={!!error} helperText={error} className={s.input} style={{width: '207px', height: '56px'}}/>
            </div>
            <div>
                <p>Место проведения:</p>
                <TextField variant="outlined" value={location} onChange={onLocationChangeHandler}
                           className={s.input} style={{width: '207px', height: '56px'}}/>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    label="Дата"
                    value={date}
                    onChange={onDataChangeHandler}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <KeyboardTimePicker
                    label="Время"
                    value={date}
                    onChange={onDataChangeHandler}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                />
            </MuiPickersUtilsProvider>
            <Button variant="contained" onClick={addEvent} className={s.button}>Добавить</Button>
        </div>
    )
}
