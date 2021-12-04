import { Form, Formik } from "formik"
import BluredBg from "../../../../components/ui/BluredBg"
import AuthInput from "../../../../components/ui/form/AuthInput";
import { AiOutlineLock } from "react-icons/ai";
import Button from "../../../../components/ui/Button";
import ChangePasswordSchema from "../../../../lib/schemas/ChangePasswordSchema";
import LogoAndHeader from "../../../../components/ui/LogoAndHead";
import { useState } from "react";
import axios from "axios";
import routes from "../../../../constants/routes";
import { useRouter } from "next/router";
import SuccessOperation from "../../../../components/ui/SuccessOperation";
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
    console.log(routes.RESETPASSWORD)
    // Global
    const router = useRouter();
    // Get Token From Router
    const { token } = router.query
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
            const res = await axios.post(`${routes.RESETPASSWORD}/${token}`, values)
            const data = res.data;
            // Get Message From Response If Post Request Was Successful
            setMsg(res.data.data.message)
            // Hide Loader
            setLoading(false)
            // Reset Errors
            //  setErrors([])
            console.log(data)
        } catch (err) {

            setLoading(false)
            router.push(routes.RESETPASSWORD)
        }
    }
    // Initial Values For Formik
    const initialValues = {
        password: '',
        passwordConfirmation: ''
    }
    return <BluredBg>
        <LogoAndHeader header="Change Password" />
        <div>
            {
                msg ? <div className={`flex flex-col`}>
                    <SuccessOperation msg={msg} />
                    <Button label="login" onClick={() => router.push(routes.LOGIN)} />
                </div>
                    : <div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={ChangePasswordSchema}
                            onSubmit={handleOnSubmit}
                        >
                            <Form >
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
                                <div className={`w-full flex justify-center mt-10`}>

                                    <Button type="submit" loading={loading} label="Save" />
                                </div>
                            </Form>
                        </Formik></div>
            }
        </div>
    </BluredBg>
}
export default ResetPasswordToken