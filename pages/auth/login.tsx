import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai'
import Link from 'next/link'
import routes from "../../constants/routes";
import { useState } from "react";
import BluredBg from "../../components/ui/BluredBg";
import { Form, Formik } from "formik";
import AuthInput from "../../components/ui/form/AuthInput";
import loginSchema from "../../lib/schemas/loginSchema";
import Button from "../../components/ui/Button";
import LogoAndHeader from "../../components/ui/LogoAndHead";
import Error from "../../components/ui/Error";
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { COOKIES_NAMES } from '../../constants/cookiesNames';
/**
 * 
 * Formik Values
 * */
interface Values {
    email: string;
    password: string;
}
/**
 * Initial Values
 * 
 * */
const initialValues = {
    email: '',
    password: '',
}
/**
 * 
 * Login
 * 
 * */
const Login = () => {
    const router = useRouter()
    // 400 error
    const [error, setError] = useState<string>('')
    // is loading
    const [loading, setLoading] = useState(false)
    /**
     * 
     * Send Email Input Value To Server
     * @param values 
     * 
     */
    const handleOnSubmit = async (values: Values) => {
        // Try To Post Data
        try {
            setError('')
            // Show Loader
            setLoading(true)
            // Post Data To Reset Password Api & Get Response
            const res = await axios.post(routes.LOGIN, values)
            const { payload } = await res.data.data
            // set token in local storage
            localStorage.setItem(COOKIES_NAMES.token, payload?.sub)
            // hide loader
            setLoading(false)
            // Go to Home
            router.reload()
            // router.replace(routes.CONTENT + routes.HOME)
        } catch (err) {
            // Set Error If Post Request Wasn't Successful
            setError((err as AxiosError).response?.data.error.message)
            // Hide Loader
            setLoading(false)
        }
    }
    return <BluredBg>
        <div>
            <LogoAndHeader header="Login" />

            <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={handleOnSubmit}
            >
                <Form className={`flex flex-col`}>
                    {error && <Error error={error} />}
                    <AuthInput
                        label="email"
                        placeholder="Email"
                        Icon={<AiOutlineMail size={24} color="gray" />}
                        name="email"
                    />
                    <AuthInput
                        label="password"
                        placeholder="Password"
                        Icon={<AiOutlineLock size={24} color="gray" />}
                        type="password"
                        name="password"
                    />

                    <Button type="submit" loading={loading} label="login" />
                </Form>
            </Formik>
            <div>
                <p className={`text-sm capitalize mt-4`}>I don't have an account!
                    <Link href={routes.SIGNUP}><span className={`text-blue-500 cursor-pointer capitalize hover:underline`}> sign up</span>
                    </Link>
                </p>
                <p className={`text-xs mt-1 text-red-500 capitalize hover:underline`}>
                    <Link href={routes.RESETPASSWORD}>i forget my password </Link>
                </p>
            </div>
        </div>
    </BluredBg>
}
export default Login;