import Grid from '@mui/material/Grid';
import {FormControl, FormControlLabel, FormGroup, FormLabel} from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {useFormik} from 'formik';


export const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: values => {
            alert(JSON.stringify(values))
        },
    })
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
                            name="email"
                            color="secondary"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            color="secondary"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <FormControlLabel
                            label="Remember me"
                            control={
                                <Checkbox
                                    onChange={formik.handleChange}
                                    checked={formik.values.rememberMe}
                                    name="rememberMe"
                                    color="secondary"
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