import '../css/register.css'
import { TextField, Button, Link } from '@mui/material'

function RegisterPage() {
    return (
        <div className='register-login-wrapper'>
            <div className="register-login-container">
                <form className='register-login-form'>
                    <h2 >Register</h2>
                    <div style={{ display: 'flex', gap: '14px', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField id="outlined-basic" size='small' label="First Name" variant="outlined" sx={{ width: '70%' }} />
                        <TextField sx={{ width: '70%' }} id="outlined-basic" size='small' label="Last Name" variant="outlined" />
                        <TextField sx={{ width: '70%' }} id="outlined-basic" size='small' label="Email" variant="outlined" />
                        <TextField sx={{ width: '70%' }} id="outlined-basic" size='small' type='password' label="Password" variant="outlined" />
                        <TextField sx={{ width: '70%' }} id="outlined-basic" size='small' type='password' label="Confirm Password" variant="outlined" />
                    </div>
                    <Button variant="contained" sx={{ marginTop: '20px', width: '70%' }}>Sign up</Button>
                    <Link sx={{ display: 'block', marginTop: '18px' }} href="#">Already have an account? Login</Link>
                </form>
            </div >
        </div >
    )
}

export default RegisterPage