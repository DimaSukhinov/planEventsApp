import React, {ChangeEvent, useCallback, useState} from 'react'
import s from './AddEvent.module.scss'
import {TextField} from '@mui/material'
import Button from '@mui/material/Button'
import {useDispatch} from 'react-redux'
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import {eventsAPI} from '../../../api/api'
import {setEventsAC} from '../../../store/events-reducer'
import {SvgSelector} from '../../../assets/SvgSelector'

type AddEventPropsType = {
    closeModal: (open: boolean) => void
    handleCloseAddEventModal: () => void
}

export const AddEvent = (props: AddEventPropsType) => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [date, setDate] = useState<Date | null>(null)
    const [titleError, setTitleError] = useState<string | null>(null)
    const [locationError, setLocationError] = useState<string | null>(null)
    const [dateError, setDateError] = useState<string | null>(null)

    const onTitleChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setTitleError(null)
    }, [])
    const onLocationChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setLocation(e.currentTarget.value)
        setLocationError(null)
    }, [])
    const onDataChangeHandler = useCallback((date: Date | null) => {
        if (date && date > new Date()) {
            setDate(date)
        }
        setDateError(null)
    }, [])

    const addEvent = useCallback(() => {
        if (title.trim() !== '' && location.trim() !== '' && date) {
            eventsAPI.createEvent(title, date.toString().split('+')[0], location).then()
            eventsAPI.allEvents().then((data) => {
                dispatch(setEventsAC(data.data.user_events))
            })
            props.closeModal(false)
        } else {
            if (title.trim() === '') {
                setTitleError('?????????????? ????????????????')
            }
            if (location.trim() === '') {
                setLocationError('?????????????? ??????????')
            }
            if (date === null) {
                setDateError('?????????????? ???????? ?? ??????????')
            }
        }
    }, [title, date, location, props, dispatch])

    return (
        <>
            <div className={s.paper}>
                <p className={s.title}>?????????? ??????????????????????</p>
                <div>
                    <p>???????????????? ??????????????????????:</p>
                    <TextField variant="outlined" value={title} onChange={onTitleChangeHandler}
                               error={!!titleError} helperText={titleError} className={s.input}/>
                </div>
                <div>
                    <p>?????????? ????????????????????:</p>
                    <TextField variant="outlined" value={location} onChange={onLocationChangeHandler}
                               className={s.input} error={!!locationError} helperText={locationError}/>
                </div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        label="????????"
                        value={date}
                        onChange={onDataChangeHandler}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        error={!!dateError}
                    />
                    <KeyboardTimePicker
                        label="??????????"
                        value={date}
                        onChange={onDataChangeHandler}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                        error={!!dateError}
                        helperText={dateError}
                    />
                </MuiPickersUtilsProvider>
                <Button variant="contained" onClick={addEvent} className={s.button}>????????????????</Button>
                <div className={s.close} onClick={props.handleCloseAddEventModal}>
                    <SvgSelector svgId={'CLOSE'}/>
                </div>
            </div>
        </>
    )
}
