import * as Yup from 'yup';

const resetPasswordEmailSchema = Yup.object().shape({

    email: Yup.string()
        .email("Email not valid")
        .max(40, "Email is too Long!")
        .required('Email is required'),

});


export default resetPasswordEmailSchema;