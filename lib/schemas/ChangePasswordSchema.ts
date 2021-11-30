import * as Yup from 'yup';

const ChangePasswordSchema = Yup.object().shape({

    password: Yup
        .string()
        .min(8, "Password is weak")
        .max(50, "password is too long!")
        .required('Password is required'),

    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required')

});

export default ChangePasswordSchema