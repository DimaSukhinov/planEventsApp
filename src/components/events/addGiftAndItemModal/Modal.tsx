import React, {ChangeEvent} from 'react'
import s from '../aboutEvent/AboutEvent.module.scss'
import {TextField} from '@mui/material'
import Button from '@mui/material/Button'

type ModalPropsType = {
    title: string
    quantity: number | null
    titleError: string | null
    quantityError: string | null
    onTitleChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    onQuantityChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    add: () => void
}

export const AddGiftAndItemModal = (props: ModalPropsType) => {

    return (
        <div className={s.paper} style={{
            display: 'flex', width: '400px', height: '300px',
            justifyContent: 'space-around', alignItems: 'center'
        }}>
            <TextField variant="outlined" label="Название" value={props.title} onChange={props.onTitleChangeHandler}
                       error={!!props.titleError} helperText={props.titleError}
            />
            <TextField label="Количество" type="number" InputLabelProps={{shrink: true}} variant="outlined"
                       value={props.quantity} onChange={props.onQuantityChangeHandler}
                       error={!!props.quantityError} helperText={props.quantityError}
            />
            <Button variant="contained" onClick={props.add} style={{backgroundColor: '#6666B5'}}>
                Добавить
            </Button>
        </div>
    )
}
