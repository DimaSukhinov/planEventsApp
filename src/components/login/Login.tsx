import React from 'react'
import s from './Login.module.scss'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useFormik} from 'formik'
import {NavLink, useNavigate} from 'react-router-dom'
import {authAPI} from '../../api/api'
import {userKeyStorage} from '../../api/Storage'
import {setAppErrorAC, setIsLoggedInAC} from '../../store/auth-reducer'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../../store/store'

type FormikErrorType = {
    login?: string
    password?: string
}

export const Login = React.memo(() => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.login) {
                errors.login = 'Введите email'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.login)) {
                errors.login = 'Неверный email'
            }

            if (!values.password) {
                errors.password = 'Введите пароль'
            }
            return errors
        },
        onSubmit: values => {
            authAPI.login(formik.values)
                .then((data) => {
                    userKeyStorage.setItem(data.data.token)
                    dispatch(setIsLoggedInAC(true))
                })
                .catch(() => {
                    dispatch(setAppErrorAC('Пользователь не найден'))
                    formik.resetForm()
                })
        },
    })

    if (isLoggedIn) {
        navigate('/events')
    }

    const inputStyle = {
        width: '300px'
    }

    return (
        <Grid container className={s.login}>
            <Grid item>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p className={s.title}>PlanEvent</p>
                            <p className={s.entry}>Вход</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField style={inputStyle} label="Email"
                                       margin="normal" {...formik.getFieldProps('login')}/>
                            {formik.touched.login && formik.errors.login &&
                                <div style={{'color': 'red'}}>{formik.errors.login}</div>}
                            <TextField type="password" label="Пароль"
                                       margin="normal" {...formik.getFieldProps('password')}/>
                            {formik.touched.password && formik.errors.password &&
                                <div style={{'color': 'red'}}>{formik.errors.password}</div>}

                            <Button type={'submit'} variant={'contained'} style={{backgroundColor: '#6666B5'}}>
                                Войти
                            </Button>
                        </FormGroup>
                        Впервые у нас?
                        <NavLink to={'/registration'}>Зарегистрироваться</NavLink>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
})
