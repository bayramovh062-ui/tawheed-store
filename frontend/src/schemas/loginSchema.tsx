import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
    email: Yup.string().trim().required("Email required"),
    password: Yup.string().trim().required('password required')
})
