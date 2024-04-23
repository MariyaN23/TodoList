import Grid from '@mui/material/Grid';
import {FormControl, FormControlLabel, FormGroup, FormLabel} from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {FormikHelpers, useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {loginFormSendingTC} from './LoginReducer';
import {AppDispatchType, AppRootState} from '../../app/store';
import {Navigate} from 'react-router-dom';
import React from 'react';
import {ThunkDispatch} from 'redux-thunk';

/*type validatedErrorsType = {
    email: null | string
    password: null | string
}*/

type FormikValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootState, unknown, any>>()
    const isAuthorised = useSelector<AppRootState, boolean>(state => state.login.isAuthorised)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<FormikValuesType>) => {
           const res = await dispatch(loginFormSendingTC(values))
            debugger
            if (res.type === loginFormSendingTC.rejected.type) {
                res.payload.errors.forEach(el=>formikHelpers.setFieldError(el.field, el.error))
            }
        },
        /*validate: values => {
            const validatedErrors: validatedErrorsType = {
                email: null,
                password: null
            }
            if (!values.email) {
                validatedErrors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                validatedErrors.email = 'Invalid email address'
            }
            if (!values.password) {
                validatedErrors.password = 'Password is required'
            }
            return validatedErrors
        },*/
    })
    if (isAuthorised) {
        return <Navigate to={'/'} replace={true}/>
    }
    return (
        <Grid container justifyContent="center">
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel><p>To log in get registered {<a target={'_blank'} href={'https://social-network.samuraijs.com/'}>here</a>} or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            color="secondary"
                            {...formik.getFieldProps("email")}
                        />
                            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            color="secondary"
                            {...formik.getFieldProps("password")}
                        />
                            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label="Remember me"
                            control={
                                <Checkbox
                                    color="secondary"
                                    {...formik.getFieldProps("rememberMe")}
                                    checked={formik.values.rememberMe}
                                />
                            }
                        />
                        <Button type="submit" variant="contained" color="secondary">
                            Login
                        </Button>
                    </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}