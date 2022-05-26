import React, {useCallback, useState, ChangeEvent} from 'react'
import s from './AboutEvent.module.scss'
import {changeEventTitleAC, deleteEventAC, EventType} from '../../../store/events-reducer'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../../../store/store'
import Button from '@mui/material/Button'
import Modal from '@material-ui/core/Modal'
import {addGiftAC} from '../../../store/gifts-reducer'
import {addItemAC} from '../../../store/purchaseItem-reducer'
import {AddGiftAndItemModal} from '../addGiftAndItemModal/Modal'
import {EditableSpan} from '../../common/EditableSpan'
import {TextField} from '@mui/material'
import DeleteIcon from '@material-ui/icons/Delete'

type AboutEventPropsType = {
    event: EventType
    closeModal: (open: boolean) => void
}

export const AboutEvent = (props: AboutEventPropsType) => {

    const dispatch = useDispatch()
    const gifts = useAppSelector(state => state.gifts)
    const users = useAppSelector(state => state.users)
    const locations = useAppSelector(state => state.locations)
    const purchaseItems = useAppSelector(state => state.purchaseItems)
    const contributors = useAppSelector(state => state.contributors)

    const [error, setError] = useState<string | null>(null)

    const [giftModal, setGiftModal] = useState(false)
    const [itemModal, setItemModal] = useState(false)
    const [userModal, setUserModal] = useState(false)

    const handleOpenAddGiftModal = useCallback(() => setGiftModal(true), [])
    const handleCloseAddGiftModal = useCallback(() => setGiftModal(false), [])

    const handleOpenAddItemModal = useCallback(() => setItemModal(true), [])
    const handleCloseAddItemModal = useCallback(() => setItemModal(false), [])

    const handleOpenAddUserModal = useCallback(() => setUserModal(true), [])
    const handleCloseAddUserModal = useCallback(() => setUserModal(false), [])

    const [giftTitle, setGiftTitle] = useState<string>('')
    const [giftQuantity, setGiftQuantity] = useState<number | null>(null)

    const onGiftTitleChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setGiftTitle(e.currentTarget.value), [])
    const onGiftQuantityChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setGiftQuantity(+e.currentTarget.value), [])

    const [itemTitle, setItemTitle] = useState<string>('')
    const [itemQuantity, setItemQuantity] = useState<number | null>(null)

    const onItemTitleChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setItemTitle(e.currentTarget.value), [])
    const onItemQuantityChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setItemQuantity(+e.currentTarget.value), [])

    const [userTitle, setUserTitle] = useState<string>('')
    const onUserTitleChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setUserTitle(e.currentTarget.value), [])

    const addGift = useCallback(() => {
        if (giftTitle.trim() !== '') {
            dispatch(addGiftAC(giftTitle, giftQuantity))
            setGiftTitle('')
            setGiftQuantity(null)
            setGiftModal(false)
        } else {
            setError('Требуется название')
        }
    }, [dispatch, giftQuantity, giftTitle])

    const addItem = useCallback(() => {
        if (itemTitle.trim() !== '') {
            dispatch(addItemAC(itemTitle, itemQuantity))
            setItemTitle('')
            setItemQuantity(null)
            setItemModal(false)
        } else {
            setError('Требуется название')
        }
    }, [dispatch, itemQuantity, itemTitle])

    const onEventTitleChange = useCallback((title: string) => dispatch(changeEventTitleAC(props.event.id, title)), [dispatch, props.event.id])
    const deleteEvent = useCallback(() => {
        dispatch(deleteEventAC(props.event.id))
        props.closeModal(false)
    }, [dispatch, props])

    return (
        <div className={s.paper}>
            <div className={s.title}>
                <EditableSpan value={props.event.title} onChange={onEventTitleChange}/>
            </div>
            <DeleteIcon onClick={deleteEvent} style={{position: 'absolute', right: 30, top: 30}}/>
            <div className={s.about}>
                <p>Создатель мероприятия: {users.map(e => e.id === props.event.ownerId && e.userName)}</p>
                <p>Место проведения: {locations.map(e => e.eventId === props.event.id && e.title)}</p>
                <p>Время проведения: {props.event.date.toString().slice(4, 21)}</p>
                <div className={s.items}>
                    <div>
                        <p>Подарки:</p>
                        {
                            gifts.map(e => e.eventId === props.event.id && <div className={s.gifts}>
                                <ul>
                                    <li>{e.title}</li>
                                    <li>Статус: {+e.status}</li>
                                    <li>Количество: {e.quantity}</li>
                                </ul>
                            </div>)
                        }
                        <Button onClick={handleOpenAddGiftModal}>Добавить подарок</Button>
                        <Modal
                            open={giftModal}
                            onClose={handleCloseAddGiftModal}
                        >
                            {<AddGiftAndItemModal title={giftTitle} quantity={giftQuantity}
                                                  onTitleChangeHandler={onGiftTitleChangeHandler} error={error}
                                                  add={addGift} onQuantityChangeHandler={onGiftQuantityChangeHandler}
                            />}
                        </Modal>
                    </div>
                    <div>
                        <p>Покупки:</p>
                        {
                            purchaseItems.map(e => e.eventId === props.event.id && <div className={s.gifts}>
                                <ul>
                                    <li>{e.title}</li>
                                    <li>Статус: {+e.status}</li>
                                    <li>Количество: {e.quantity}</li>
                                </ul>
                            </div>)
                        }
                        <Button onClick={handleOpenAddItemModal}>Добавить покупку</Button>
                        <Modal
                            open={itemModal}
                            onClose={handleCloseAddItemModal}
                        >
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
                                {/*{*/}
                                {/*    contributors.map(c => c.eventId === props.event.id && c.isAccepted &&*/}
                                {/*        <li>{users.map(u => u.id === c.userId && u.userName)}</li>)*/}
                                {/*}*/}
                            </ul>
                            <Button onClick={handleOpenAddUserModal}>Добавить участника</Button>
                            <Modal
                                open={userModal}
                                onClose={handleCloseAddUserModal}
                            >
                                {
                                    <div className={s.paper}
                                         style={{width: '300px', height: '200px', justifyContent: 'space-around'}}>
                                        <TextField label="Имя пользователя" variant="outlined" value={userTitle}
                                                   onChange={onUserTitleChangeHandler}/>
                                        <Button variant="contained" style={{backgroundColor: '#6666B5'}}>
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
