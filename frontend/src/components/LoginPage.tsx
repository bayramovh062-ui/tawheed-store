import '../css/register.css'
import { TextField, Button, Link } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchLoginResult } from '../redux/slice/authSlice'
import type { AppDispatch } from '../redux/store'
import { loginSchema } from '../schemas/loginSchema'

function LoginPage() {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            try {
                const result = await dispatch(fetchLoginResult(values)).unwrap()
                navigate('/')
                console.log("success")
            } catch (error) {
                console.log(error)
            }
        }
    })
    return (
        <div className='register-login-wrapper'>
            <div className="register-login-container">
                <form className='register-login-form' style={{ height: '450px' }} onSubmit={formik.handleSubmit}>
                    <h2 >Login</h2>
                    <div style={{ display: 'flex', gap: '14px', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField sx={{ width: '70%' }}
                            id="email"
                            name='email'
                            size='small'
                            label="Email"
                            variant="outlined"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField sx={{ width: '70%' }}
                            id="password"
                            name='password'
                            size='small'
                            type='password'
                            label="Password"
                            variant="outlined"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </div>
                    <Button type='submit' variant="contained" sx={{ marginTop: '20px', width: '70%' }}>Login</Button>
                    <Link sx={{ display: 'block', marginTop: '18px', cursor: 'pointer' }} onClick={() => {
                        navigate('/register')
                    }}>You don't have an account? Sign Up</Link>
                </form>
            </div >
        </div >
    )
}

export default LoginPage