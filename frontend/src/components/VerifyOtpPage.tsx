import { useEffect, useState } from 'react'
import '../css/verifyOtp.css'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../redux/store'
import { useDispatch } from 'react-redux'
import { fetchVerifyOtpResult } from '../redux/slice/authSlice'
import { useNavigate } from 'react-router-dom'
import { Alert } from '@mui/material'

function VerifyOtpPage() {
    const [otp, setOtp] = useState('')
    const validateChar = (value: string): boolean => {
        return /^[0-9]$/.test(value);
    };
    const email = useSelector((state: RootState) => state.auth.email);
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const verifyResult = await dispatch(fetchVerifyOtpResult({ email: email || '', otpCode: otp })).unwrap()
            if (verifyResult.token) {
                navigate('/')
            } else {
                <Alert severity="error">
                    Invalid OTP. Please try again.
                </Alert>
            }
        } catch (error) {
            console.error('Error occurred while verifying OTP:', error)
        }

    }
    return (
        <>
            <div className="verify-otp-container">
                <div className="verify-otp-form-wrapper">
                    <h2 className="verify-otp-title">Verify email</h2>
                    <p className="verify-otp-description">Please enter the 6-digit code sent to your email.</p>
                    <form className="verify-otp-form" onSubmit={handleSubmit}>
                        <MuiOtpInput
                            value={otp}
                            onChange={setOtp}
                            length={6}
                            sx={{ width: '90%', marginBottom: '20px' }}
                            autoFocus
                            validateChar={validateChar}
                            TextFieldsProps={{
                                type: 'password',
                                slotProps: {
                                    htmlInput: {
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*',
                                    },
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: '90%' }}
                        >
                            Verify
                        </Button>
                    </form >
                    <p className="verify-otp-resend">Didn't receive the code? <a href="#" className="verify-otp-resend-link">Resend</a></p>
                </div>

            </div>
        </>
    )
}

export default VerifyOtpPage