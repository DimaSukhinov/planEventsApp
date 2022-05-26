import React, {ChangeEvent, useCallback, useState} from 'react'
import s from './AddEvent.module.scss'
import {TextField} from '@mui/material'
import Button from '@mui/material/Button'
import {useDispatch} from 'react-redux'
import {addEventAC} from '../../../store/events-reducer'
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

type AddEventPropsType = {
    closeModal: (open: boolean) => void
}

export const AddEvent = (props: AddEventPropsType) => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState<string>('')
    const [date, setDate] = useState<Date | null>(new Date())
    const [error, setError] = useState<string | null>(null)

    const onTitleChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value), [])
    const onDataChangeHandler = useCallback((date: Date | null) => setDate(date), [])

    const addEvent = useCallback(() => {
        if (title.trim() !== '' && date) {
            dispatch(addEventAC(title, date.toString().slice(4, 21)))
            props.closeModal(false)
        } else {
            setError('Title is required')
        }
    }, [dispatch, date, props, title])

    return (
        <div className={s.paper}>
            <p className={s.title}>Новое мероприятие</p>
            <TextField label="Название мероприятия" variant="outlined" value={title} onChange={onTitleChangeHandler}
                       error={!!error} helperText={error} className={s.input}/>
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