import { AiFillCheckCircle, AiOutlineLock, } from 'react-icons/ai'
import { Form, Formik } from "formik";
import { useState } from "react";
import BluredBg from "../../components/ui/BluredBg";
import Link from 'next/link'
import routes from "../../constants/routes";
import AuthInput from "../../components/ui/form/AuthInput";
import Button from "../../components/ui/Button";
import axios, { AxiosError } from "axios";
import resetPasswordEmailSchema from '../../lib/schemas/resetPasswordEmailSchema';
import ErrorsList from '../../components/ui/ErrorsList';
import LogoAndHeader from '../../components/ui/LogoAndHead';
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
    const [errors, setErrors] = useState<string[]>([])
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
            // Show Loader
            setLoading(true)
            // Post Data To Reset Password Api & Get Response
            const res = await axios.post(routes.RESETPASSWORD, data)
            // Get Message From Response If Post Request Was Successful
            setMsg(res.data.data.message)
            // Hide Loader
            setLoading(false)
            // Reset Errors
            setErrors([])
        } catch (err) {
            // Set Error If Post Request Wasn't Successful
            setErrors([...errors, (err as AxiosError).response?.data.error.message])
            // Hide Loader
            setLoading(false)
        }
    }
    return <BluredBg>
        {msg
            ? <CheckEmailView msg={msg} />
            : <div>
                <LogoAndHeader header="Reset Password" />
                <ErrorsList errors={errors} />
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

    </BluredBg>
}
/**
 * 
 * @param msg Message Coming From Server 
 * 
 */
const CheckEmailView = ({ msg }: { msg: string }) => {
    return <div>
        <LogoAndHeader header="Reset Password" />
        <div className={`flex items-center mt-10 text-green-600 flex-col justify-center`}>
            <AiFillCheckCircle size={120} />
            <h1 className={`mt-6 capitalize`}>please check your email</h1>
            <h1 className={` text-black capitalize`}>{msg}</h1>
        </div>
    </div>
}
export default ResetPassword;