import React from 'react'
import s from './Login.module.scss'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useFormik} from 'formik'
import {NavLink} from 'react-router-dom';
import {authAPI} from '../../api/api';

type FormikErrorType = {
    email?: string
    password?: string
    userName?: string
}

export const Registration = React.memo(() => {

    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.userName) {
                errors.userName = 'User name is required'
            }

            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = 'Password is required'
            }
            return errors
        },
        onSubmit: values => {
            // alert(JSON.stringify(values))
            authAPI.register().then()
        },
    })

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
                            <p className={s.entry}>Регистрация</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Имя пользователя"
                                       margin="normal" {...formik.getFieldProps('userName')}/>
                            {formik.touched.userName && formik.errors.userName &&
                                <div style={{'color': 'red'}}>{formik.errors.userName}</div>}
                            <TextField style={inputStyle} label="Email" margin="normal" {...formik.getFieldProps('email')}/>
                            {formik.touched.email && formik.errors.email &&
                                <div style={{'color': 'red'}}>{formik.errors.email}</div>}
                            <TextField type="password" label="Пароль"
                                       margin="normal" {...formik.getFieldProps('password')}/>
                            {formik.touched.password && formik.errors.password &&
                                <div style={{'color': 'red'}}>{formik.errors.password}</div>}
                            <Button type={'submit'} variant={'contained'} style={{backgroundColor: '#6666B5'}}>
                                Зарегистрироваться
                            </Button>
                        </FormGroup>
                        Есть аккаунт?
                        <NavLink to={'/login'}>Войти</NavLink>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
})
