import { AiOutlineLock, } from 'react-icons/ai'
import { Form, Formik } from "formik";
import { useState } from "react";
import BluredBg from "../../../components/ui/BluredBg";
import Link from 'next/link'
import routes from "../../../constants/routes";
import AuthInput from "../../../components/ui/form/AuthInput";
import Button from "../../../components/ui/Button";
import axios, { AxiosError } from "axios";
import resetPasswordEmailSchema from '../../../lib/schemas/resetPasswordEmailSchema';
import LogoAndHeader from '../../../components/ui/LogoAndHead';
import SuccessOperation from '../../../components/ui/SuccessOperation';
import Error from '../../../components/ui/Error';
/**
 * 
 * Interface Values For Submit Form
 */
interface Values {
    email: string;
}
/**
 * 
 * @returns Reset Password Page & Check Email View
 */
const ResetPassword = () => {
    // errors
    const [error, setError] = useState<string>('')
    // message
    const [msg, setMsg] = useState('')
    // is loading
    const [loading, setLoading] = useState(false)
    /**
     * Send Email Input Value To Server
     * @param values 
     * 
     */
    const handleOnSubmit = async (values: Values) => {
        // Get Current Location
        const loc = { protocol: location.protocol, host: location.host }
        // Parepare Data To Send To server
        const data = { ...values, location: loc }
        // Try To Post Data
        try {
            // Reset Errors
            setError('')
            // Show Loader
            setLoading(true)
            // Post Data To Reset Password Api & Get Response
            const res = await axios.post(routes.RESETPASSWORD, data)
            // Get Message From Response If Post Request Was Successful
            setMsg(res.data.data.message)
            // Hide Loader
            setLoading(false)
        } catch (err) {
            // Set Error If Post Request Wasn't Successful
            setError((err as AxiosError).response?.data.error.message)
            // Hide Loader
            setLoading(false)
        }
    }
    return <BluredBg>
        <div>
            <div className={`flex justify-center`}>
                <LogoAndHeader header="Reset Password" />
            </div>
            {msg
                ? <SuccessOperation msg={msg} />
                : <div>
                    {error && <Error error={error} />}
                    <div>
                        <Formik
                            initialValues={{ email: '', }}
                            validationSchema={resetPasswordEmailSchema}
                            onSubmit={handleOnSubmit}
                        >
                            <Form className={`flex flex-col`}>
                                <AuthInput
                                    label="Email"
                                    placeholder="Email"
                                    Icon={<AiOutlineLock size={24} color="gray" />}
                                    type="email"
                                    name="email"
                                />
                                <Button type="submit" loading={loading} label="Sign up" />
                            </Form>
                        </Formik>
                    </div>
                    <div>
                        <p className={`text-sm capitalize mt-4`}>I have an account!
                            <Link href={routes.LOGIN}>
                                <span
                                    className={`text-blue-500 cursor-pointer capitalize hover:underline`}
                                > log in</span>
                            </Link>
                        </p>
                    </div>
                </div>
            }
        </div>
    </BluredBg>
}
export default ResetPassword;