import * as Yup from 'yup';
/**
   * Validation Schema
   * */
const generateFormSchema = Yup.object().shape({
    width: Yup.number()
        .typeError('only numbers')
        .min(10, "Too Short!")
        .max(1000, "Too Long!")
        .required("Required"),

    height: Yup.number()
        .typeError('only numbers')
        .min(10, "Too Short!")
        .max(1000, "Too Long!")
        .required("Required"),

    size: Yup.number()
        .typeError('only numbers')
        .min(5, "Too Short!")
        .max(50, "Currently You can Just generate up to 50 img")
        .required("Required"),

    collectionName: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),

    description: Yup.string()
        .min(5, "This description is too short !")
        .max(500, "This description is too long !")
        .required("Required"),

});

export default generateFormSchema;