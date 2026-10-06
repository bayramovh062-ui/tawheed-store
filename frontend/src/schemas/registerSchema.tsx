import * as Yup from 'yup'

export const registerSchema = Yup.object().shape({
    firstName: Yup.string().trim().required('First name required'),
    lastName: Yup.string().trim().required('Last name required'),
    email: Yup.string().trim().email('You should enter a valid email').required('email required'),
    password: Yup.string().min(8, "Your password should be minimum 8 character").trim().required("Password required"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Confirm password should be same password").required('You should re enter password')
})