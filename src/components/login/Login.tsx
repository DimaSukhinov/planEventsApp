import React from 'react'
import s from './Login.module.scss'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useFormik} from 'formik'
import {NavLink} from 'react-router-dom'
import {authAPI} from '../../api/api'

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = React.memo(() => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            // if (!values.email) {
            //     errors.email = 'Email is required'
            // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            //     errors.email = 'Invalid email address'
            // }
            //
            // if (!values.password) {
            //     errors.password = 'Password is required'
            // }
            return errors
        },
        onSubmit: values => {
            // alert(JSON.stringify(values))
            authAPI.login().then()
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
                            <p className={s.entry}>Вход</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField style={inputStyle} label="Email" margin="normal" {...formik.getFieldProps('email')}/>
                            {formik.touched.email && formik.errors.email &&
                                <div style={{'color': 'red'}}>{formik.errors.email}</div>}
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
