import * as Yup from 'yup';

const signupForm = Yup.object().shape({
    username: Yup.string()
        .min(2, "username is too short!")
        .max(20, "Username is too long!")
        .required('Username is required'),

    email: Yup.string()
        .email("Email not valid")
        .max(40, "Email is too Long!")
        .required('Email is required'),

    password: Yup
        .string()
        .min(8, "Password is weak")
        .max(50, "password is too long!")
        .required('Password is required'),

    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required')

});

export default signupForm;