import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import Link from 'next/link'
import routes from "../../constants/routes";
import { Form, Formik } from "formik";
import { useState } from "react";
import BluredBg from "../../components/ui/BluredBg";
import AuthInput from "../../components/ui/form/AuthInput";
import Button from "../../components/ui/Button";
import signupForm from '../../lib/schemas/singupSchema';
import Error from '../../components/ui/Error';
import LogoAndHeader from '../../components/ui/LogoAndHead';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router'
/**
 * 
 * Values For Signup After Validation
 */
interface Values {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string
}
/**
 * 
 * Initial Values For Signup
 */
const initialValues = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
}
/**
 * 
 * Signup From
 */
const Signup = () => {
    // router
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
            // Show Loader
            setLoading(true)
            // Post Data To Reset Password Api & Get Response
            const res = await axios.post(routes.SIGNUP, values)
            // hide loader
            setLoading(false)
            //Relove After Signup Success
            router.reload();
        } catch (err) {
            // Set Error If Post Request Wasn't Successful
            setError((err as AxiosError).response?.data.error.message)
            // Hide Loader
            setLoading(false)
        }
    }
    return <BluredBg>
        <div>
            <LogoAndHeader header="Sign up" />
            <Formik
                initialValues={initialValues}
                validationSchema={signupForm}
                onSubmit={handleOnSubmit}
            >
                <Form className={`flex flex-col`}>
                    {error && <Error error={error} />}
                    <AuthInput
                        label="username"
                        placeholder="Username"
                        Icon={<AiOutlineUser size={24} color="gray" />}
                        name="username"
                    />
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
                    <AuthInput
                        label="Confirm password"
                        placeholder="Confirm password"
                        Icon={<AiOutlineLock size={24} color="gray" />}
                        type="password"
                        name="passwordConfirmation"
                    />
                    <Button
                        type="submit"
                        label="sign up"
                        loading={loading}
                    />
                </Form>
            </Formik>
            <div>
                <p className={`text-sm capitalize mt-4`}>I have an account!
                    <Link href={routes.LOGIN}><span className={`text-blue-500 cursor-pointer capitalize hover:underline`}> log in</span>
                    </Link>
                </p>
            </div>
        </div>
    </BluredBg >
}
export default Signup;