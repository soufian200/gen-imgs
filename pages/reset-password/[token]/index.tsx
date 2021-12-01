import { Form, Formik } from "formik"
import BluredBg from "../../../components/ui/BluredBg"
import AuthInput from "../../../components/ui/form/AuthInput";
import { AiOutlineLock } from "react-icons/ai";
import Button from "../../../components/ui/Button";
import ChangePasswordSchema from "../../../lib/schemas/ChangePasswordSchema";
import LogoAndHeader from "../../../components/ui/LogoAndHead";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import routes from "../../../constants/routes";
import { useRouter } from "next/router";
/**
 * 
 * Values Interface For Submition Form
 */
interface Values {
    password: string;
    passwordConfirmation: string;
}
/**
 * 
 * Change Password Form.
 * If User Forget It's Password,
 * User Will Land To This Page If He Get It's Url In His Email.
 * 
 */
function ResetPasswordToken() {
    // Global
    const router = useRouter();
    // Get Token From Router
    const { token } = router.query
    // errors
    const [errors, setErrors] = useState<string[]>([])
    // message
    const [msg, setMsg] = useState('')
    // is loading
    const [loading, setLoading] = useState(false)
    /**
     * Send Password And Password Confirmation Values To Server
     * @param values 
     * 
     */
    const handleOnSubmit = async (values: Values) => {

        // Try To Post Data
        try {
            // Show Loader
            setLoading(true)
            // Post Data To Reset Password Api & Get Response
            const res = await axios.post(`${routes.RESETPASSWORD}/${token}`, { password: '123', passwordConfirmation: '123' })
            const data = res.data;
            // Get Message From Response If Post Request Was Successful
            //  setMsg(res.data.data.message)
            // Hide Loader
            //  setLoading(false)
            // Reset Errors
            //  setErrors([])
            console.log(data)
        } catch (err) {
            console.log((err as Error).message)
            // Set Error If Post Request Wasn't Successful
            //  setErrors([...errors, (err as AxiosError).response?.data.error.message])
            // Hide Loader
            //  setLoading(false)
        }
    }
    // Initial Values For Formik
    const initialValues = {
        password: '',
        passwordConfirmation: ''
    }
    return <BluredBg>
        <div>
            <LogoAndHeader header="Change Password" />
            <Formik
                initialValues={initialValues}
                validationSchema={ChangePasswordSchema}
                onSubmit={handleOnSubmit}
            >
                <Form className={`flex flex-col`}>
                    <AuthInput
                        label="password"
                        placeholder="Password"
                        Icon={<AiOutlineLock size={24} color="gray" />}
                        type="password"
                        name="password"
                    />
                    <AuthInput
                        label="Confirm password"
                        placeholder="Confirm password"
                        Icon={<AiOutlineLock size={24} color="gray" />}
                        type="password"
                        name="passwordConfirmation"
                    />
                    <Button type="submit" label="Save" />
                </Form>
            </Formik>
        </div>
    </BluredBg>
}
export default ResetPasswordToken