import '../css/register.css'
import { TextField, Button, Link } from '@mui/material'
import { useFormik } from 'formik'
import { registerSchema } from '../schemas/registerSchema'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            console.log('form values', values)
        }
    })
    return (
        <div className='register-login-wrapper'>
            <div className="register-login-container">
                <form className='register-login-form' onSubmit={formik.handleSubmit}>
                    <h2 >Register</h2>
                    <div style={{ display: 'flex', gap: '14px', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                            id="firstName"
                            name='firstName'
                            size='small'
                            label="First Name"
                            variant="outlined"
                            sx={{ width: '70%' }}
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        <TextField
                            sx={{ width: '70%' }}
                            id="lastName"
                            name='lastName'
                            size='small'
                            label="Last Name"
                            variant="outlined"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
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
                        <TextField sx={{ width: '70%' }}
                            id="confirmPassword"
                            name='confirmPassword'
                            size='small'
                            type='password'
                            label="Confirm Password"
                            variant="outlined"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                    </div>
                    <Button type='submit' variant="contained" sx={{ marginTop: '20px', width: '70%' }}>Sign up</Button>
                    <Link sx={{ display: 'block', marginTop: '18px', cursor: 'pointer' }} onClick={() => {
                        navigate('/login')
                    }}>Already have an account? Login</Link>
                </form>
            </div >
        </div >
    )
}

export default RegisterPage