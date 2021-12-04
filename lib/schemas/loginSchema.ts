import * as Yup from 'yup';
const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email not valid")
        .max(40, "Email is too Long!")
        .required('Email is required'),

    password: Yup
        .string()
        .min(8, "Password is weak")
        .max(50, "password is too long!")
        .required('Password is required')
});
export default loginSchema;