import * as Yup from 'yup';
const verifySchema = Yup.object().shape({
    code: Yup.number()
        .typeError('Only numbers')
        .max(999999, "Code should be 6 numbers long")
        .min(100000, "Code should be 6 numbers long")
        .required('Required'),
});

export default verifySchema