import React, {useCallback, useState, ChangeEvent, useEffect} from 'react'
import s from './AboutEvent.module.scss'
import {changeEventDateAC, changeEventTitleAC, deleteEventAC, EventType} from '../../../store/events-reducer'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../../../store/store'
import Button from '@mui/material/Button'
import Modal from '@material-ui/core/Modal'
import {AddGiftAndItemModal} from '../addGiftAndItemModal/Modal'
import {EditableSpan} from '../../common/EditableSpan'
import {TextField} from '@mui/material'
import DeleteIcon from '@material-ui/icons/Delete'
import {eventsAPI, giftsAPI, itemsAPI} from '../../../api/api'
import {changeGiftStatusAC, setGiftsAC} from '../../../store/gifts-reducer'
import {changeItemStatusAC, setItemsAC} from '../../../store/purchaseItem-reducer'
import {changeLocationTitleAC, setLocationsAC} from '../../../store/locations-reducer'
import {setUsersAC} from '../../../store/users-reducer'
import RedeemIcon from '@material-ui/icons/Redeem'
import {setAppErrorAC} from '../../../store/auth-reducer'
import EditIcon from '@material-ui/icons/Edit'
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

type AboutEventPropsType = {
    event: EventType
    closeModal: (open: boolean) => void
}

export const AboutEvent = (props: AboutEventPropsType) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setUsersAC([]))
        eventsAPI.getEvent(props.event.id).then((data) => {
            dispatch(setUsersAC(data.data.users))
            dispatch(setLocationsAC(data.data.location[0]))
            if (data.data.gifts) {
                dispatch(setGiftsAC(data.data.gifts))
            }
            if (data.data.pItems) {
                dispatch(setItemsAC(data.data.pItems))
            }
        })
    }, [dispatch, props.event.id])

    const gifts = useAppSelector(state => state.gifts)
    const users = useAppSelector(state => state.users)
    const purchaseItems = useAppSelector(state => state.purchaseItems)
    const location = useAppSelector(state => state.locations)

    const [error, setError] = useState<string | null>(null)

    const [giftModal, setGiftModal] = useState(false)
    const [itemModal, setItemModal] = useState(false)
    const [userModal, setUserModal] = useState(false)
    const [dateModal, setDateModal] = useState(false)

    const handleOpenAddGiftModal = useCallback(() => setGiftModal(true), [])
    const handleCloseAddGiftModal = useCallback(() => setGiftModal(false), [])

    const handleOpenAddItemModal = useCallback(() => setItemModal(true), [])
    const handleCloseAddItemModal = useCallback(() => setItemModal(false), [])

    const handleOpenAddUserModal = useCallback(() => setUserModal(true), [])
    const handleCloseAddUserModal = useCallback(() => setUserModal(false), [])

    const handleOpenChangeDateModal = useCallback(() => setDateModal(true), [])
    const handleCloseChangeDateModal = useCallback(() => setDateModal(false), [])

    const [giftTitle, setGiftTitle] = useState<string>('')
    const [giftQuantity, setGiftQuantity] = useState<number>(0)

    const onGiftTitleChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setGiftTitle(e.currentTarget.value), [])
    const onGiftQuantityChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setGiftQuantity(+e.currentTarget.value), [])

    const [itemTitle, setItemTitle] = useState<string>('')
    const [itemQuantity, setItemQuantity] = useState<number>(0)

    const onItemTitleChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setItemTitle(e.currentTarget.value), [])
    const onItemQuantityChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setItemQuantity(+e.currentTarget.value), [])

    const [userTitle, setUserTitle] = useState<string>('')
    const onUserTitleChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setUserTitle(e.currentTarget.value), [])

    const addGift = useCallback(() => {
        if (giftTitle.trim() !== '') {
            giftsAPI.createGift(props.event.id, giftTitle, giftQuantity, false).then()
            eventsAPI.getEvent(props.event.id)
                .then((data) => {
                    dispatch(setGiftsAC(data.data.gifts))
                })
            setGiftTitle('')
            setGiftQuantity(0)
            setGiftModal(false)
        } else {
            setError('Требуется название')
        }
    }, [dispatch, giftQuantity, giftTitle, props.event.id])
    const addItem = useCallback(() => {
        if (itemTitle.trim() !== '') {
            itemsAPI.createItem(props.event.id, itemTitle, itemQuantity, false).then()
            eventsAPI.getEvent(props.event.id)
                .then((data) => {
                    dispatch(setItemsAC(data.data.pItems))
                })
            setItemTitle('')
            setItemQuantity(0)
            setItemModal(false)
        } else {
            setError('Требуется название')
        }
    }, [dispatch, itemQuantity, itemTitle, props.event.id])

    const inviteUser = useCallback(() => {
        if (userTitle.trim() !== '') {
            eventsAPI.inviteUser(userTitle, props.event.id)
                .then()
                .catch(() => {
                    dispatch(setAppErrorAC('Такой пользователь не существует'))
                })
            eventsAPI.getEvent(props.event.id)
                .then((data) => {
                    dispatch(setUsersAC(data.data.users))
                })
            setUserTitle('')
            setUserModal(false)
        } else {
            setError('Требуется название')
        }
    }, [dispatch, props.event.id, userTitle])

    const onEventTitleChange = useCallback((title: string) => {
        eventsAPI.changeTitle(props.event.id, {type: 'title', value: title})
            .then(() => {
                dispatch(changeEventTitleAC(props.event.id, title))
            })
    }, [dispatch, props.event.id])
    const onEventLocationChange = useCallback((location: string) => {
        eventsAPI.changeTitle(props.event.id, {type: 'location', value: location})
            .then(() => {
                dispatch(changeLocationTitleAC(props.event.id, location))
            })
    }, [dispatch, props.event.id])

    const [date, setDate] = useState<Date | null | string>(null)
    const onDataChangeHandler = useCallback((date: Date | null) => {
        if (date && date > new Date()) {
            setDate(date)
        } else dispatch(setAppErrorAC('Неверная дата и время'))
    }, [dispatch])
    const onEventDateChange = useCallback(() => {
        if (date) {
            eventsAPI.changeTitle(props.event.id, {type: 'date', value: date})
                .then(() => {
                    dispatch(changeEventDateAC(props.event.id, date.toString()))
                })
        }
        setDateModal(false)
    }, [date, dispatch, props.event.id])

    const deleteEvent = useCallback(() => {
        eventsAPI.deleteEvent(props.event.id)
            .then(() => {
                dispatch(deleteEventAC(props.event.id))
                props.closeModal(false)
            })
    }, [dispatch, props])
    const deleteGift = useCallback((giftId: number) => () => {
        giftsAPI.deleteGift(giftId, props.event.id).then()
        eventsAPI.getEvent(props.event.id)
            .then((data) => {
                if (data.data.pItems) {
                    dispatch(setGiftsAC(data.data.gifts))
                } else dispatch(setGiftsAC([]))
            })
    }, [dispatch, props.event.id])
    const deleteItem = useCallback((itemId: number) => () => {
        itemsAPI.deleteItem(itemId, props.event.id).then()
        eventsAPI.getEvent(props.event.id)
            .then((data) => {
                if (data.data.pItems) {
                    dispatch(setItemsAC(data.data.pItems))
                } else dispatch(setItemsAC([]))
            })
    }, [dispatch, props.event.id])

    const changeGiftStatus = useCallback((giftId: number, status: boolean) => () => {
        giftsAPI.giftCheck(giftId, props.event.id)
            .then(() => {
                dispatch(changeGiftStatusAC(status, props.event.id))
            })
        eventsAPI.getEvent(props.event.id)
            .then((data) => {
                dispatch(setGiftsAC(data.data.gifts))
            })
    }, [dispatch, props.event.id])
    const changeItemStatus = useCallback((itemId: number, status: boolean) => () => {
        itemsAPI.itemCheck(itemId, props.event.id)
            .then(() => {
                dispatch(changeItemStatusAC(status, props.event.id))
            })
        eventsAPI.getEvent(props.event.id)
            .then((data) => {
                dispatch(setItemsAC(data.data.pItems))
            })
    }, [dispatch, props.event.id])

    return (
        <div className={s.paper}>
            <div className={s.title}>
                <EditableSpan value={props.event.title} onChange={onEventTitleChange} id={props.event.id}/>
            </div>
            <DeleteIcon onClick={deleteEvent} style={{position: 'absolute', right: 30, top: 30}}/>
            <div className={s.about}>
                <p>Место проведения: <EditableSpan value={location.title} onChange={onEventLocationChange}
                                                   id={props.event.id}/>
                </p>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <p>Дата и время проведения
                        : {props.event.date.toString().slice(0, 10) + ` ` + props.event.date.toString().slice(11, 16)}</p>
                    <EditIcon onClick={handleOpenChangeDateModal} style={{marginLeft: '20px'}}/>
                    <Modal open={dateModal} onClose={handleCloseChangeDateModal}>
                        {
                            <div className={s.paper} style={{
                                display: 'flex', width: '500px', height: '400px',
                                justifyContent: 'space-around', alignItems: 'center'
                            }}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <p>Изменение даты</p>
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
                                <Button variant="contained" onClick={onEventDateChange}
                                        style={{backgroundColor: '#6666B5'}}>
                                    Изменить
                                </Button>
                            </div>
                        }
                    </Modal>
                </div>
                <div className={s.items}>
                    <div>
                        <p>Подарки:</p>
                        {
                            gifts.map(g => g.eventId === props.event.id && <div className={s.gifts}>
                                <ul>
                                    <li>
                                        <div className={s.divInLi}>
                                            {g.title}
                                            <DeleteIcon fontSize={'small'} onClick={deleteGift(g.id)}/>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={s.divInLi}>
                                            Статус: {+g.status === 0 ? 'не куплен' : 'куплен'}
                                            <RedeemIcon onClick={changeGiftStatus(g.id, !g.status)} fontSize={'small'}/>
                                        </div>
                                    </li>
                                    <li>Количество: {g.quantity}</li>
                                </ul>
                            </div>)
                        }
                        <Button onClick={handleOpenAddGiftModal}>Добавить подарок</Button>
                        <Modal open={giftModal} onClose={handleCloseAddGiftModal}>
                            {<AddGiftAndItemModal title={giftTitle} quantity={giftQuantity}
                                                  onTitleChangeHandler={onGiftTitleChangeHandler} error={error}
                                                  add={addGift} onQuantityChangeHandler={onGiftQuantityChangeHandler}
                            />}
                        </Modal>
                    </div>
                    <div>
                        <p>Покупки:</p>
                        {
                            purchaseItems.map(i => i.eventId === props.event.id && <div className={s.gifts}>
                                <ul>
                                    <li>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            {i.title}
                                            <DeleteIcon fontSize={'small'} onClick={deleteItem(i.id)}/>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={s.divInLi}>
                                            Статус: {+i.status === 0 ? 'не куплен' : 'куплен'}
                                            <RedeemIcon onClick={changeItemStatus(i.id, !i.status)} fontSize={'small'}/>
                                        </div>
                                    </li>
                                    <li>Количество: {i.quantity}</li>
                                </ul>
                            </div>)
                        }
                        <Button onClick={handleOpenAddItemModal}>Добавить покупку</Button>
                        <Modal open={itemModal} onClose={handleCloseAddItemModal}>
                            {<AddGiftAndItemModal title={itemTitle} quantity={itemQuantity}
                                                  onTitleChangeHandler={onItemTitleChangeHandler} error={error}
                                                  add={addItem} onQuantityChangeHandler={onItemQuantityChangeHandler}
                            />}
                        </Modal>
                    </div>
                    <div>
                        <p>Участники:</p>
                        <div className={s.users}>
                            <ul>
                                {
                                    users.map(u => <li>{u.userName}: {u.isAccepted === null ? 'на рассмотрении' : !u.isAccepted ? 'отклонено' : 'принято'}</li>)
                                }
                            </ul>
                            <Button onClick={handleOpenAddUserModal}>Добавить участника</Button>
                            <Modal open={userModal} onClose={handleCloseAddUserModal}>
                                {
                                    <div className={s.paper}
                                         style={{
                                             display: 'flex', width: '300px', height: '200px',
                                             justifyContent: 'space-around', alignItems: 'center'
                                         }}>
                                        <TextField label="Имя пользователя" variant="outlined" value={userTitle}
                                                   onChange={onUserTitleChangeHandler}/>
                                        <Button variant="contained" onClick={inviteUser}
                                                style={{backgroundColor: '#6666B5'}}>
                                            Добавить
                                        </Button>
                                    </div>
                                }
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
