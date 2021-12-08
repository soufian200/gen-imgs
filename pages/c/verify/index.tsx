import { Form, Formik } from "formik";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Center from "../../../components/common/Center";
import AuthInput from "../../../components/ui/form/AuthInput";
import LogoAndHeader from "../../../components/ui/LogoAndHead";
import Navbar from "../../../components/ui/Navbar";
import * as Yup from 'yup';
import { useContext, useEffect, useState } from "react";
import Error from "../../../components/ui/Error";
import Button from "../../../components/ui/Button";
import axios, { AxiosError } from "axios";
import routes from "../../../constants/routes";
import SuccessOperation from "../../../components/ui/SuccessOperation";
import { COOKIES_NAMES } from "../../../constants/cookiesNames";
import { useRouter } from "next/router";
import AppContext from "../../../contexts/AppContext";
const verifySchema = Yup.object().shape({
    code: Yup.number()
        .typeError('Only numbers')
        .max(999999, "Code should be 6 numbers long")
        .min(100000, "Code should be 6 numbers long")
        .required('Required'),
});

/**
 * 
 * Formik Values
 * */
interface Values {
    code: string;
}
const Verify = () => {
    const router = useRouter()
    const [error, setError] = useState<string>('')
    // 200 ok msg from server
    const [msg, setMsg] = useState<string>('')
    const { user } = useContext(AppContext)
    // is loading
    const [loading, setLoading] = useState(false)
    const [isResendedLoading, setIsResendedLoading] = useState(false)
    const [isResended, setIsResended] = useState(false)

    /**
     * 
     * Send Verification Code To Server
     * @param values 
     */
    const handleOnSubmit = async (values: Values) => {
        try {
            setError('')
            setIsResended(false)
            // Show Loader
            setLoading(true)
            // Send Data To Server
            const res = await axios.post(routes.VERIFY, values)
            console.log(res)
            const { payload, message } = await res.data.data
            setMsg(message)
            // hide loader
            setLoading(false)
            // set token in local storage
            localStorage.setItem(COOKIES_NAMES.token, payload?.sub)

        } catch (err) {
            // Set Error If Post Request Wasn't Successful
            setError((err as AxiosError).response?.data.error.message)
            // Hide Loader
            setLoading(false)
        }
    }
    /**
     * 
     * Send Verification Code To Server
     * @param values 
     */
    const handleResendCode = async () => {
        try {
            setError('')
            setIsResended(false)
            setIsResendedLoading(true)
            // Send Data To Server
            const res = await axios.get(routes.VERIFY + routes.RESEND)
            console.log(res)
            setIsResended(true)
            setIsResendedLoading(false)

        } catch (err) {
            // Set Error If Post Request Wasn't Successful
            setError((err as AxiosError).response?.data.error.message)
            setIsResended(false)
            setIsResendedLoading(false)
        }
    }

    useEffect(() => {
        if (user && user.isVerified) {
            setMsg("verified")
        }
    }, [user])
    return <div className={`w-screen h-screen bg-gray-100`}>
        <Navbar />
        <Center styles={`w-full h-full`} >
            <div className={`bg-white shadow p-14 `}>
                <LogoAndHeader header="Verify Account" />
                {msg
                    ? <div>
                        <SuccessOperation msg={msg} />
                        <div className={`mt-5 flex justify-center`}>
                            <Button
                                label="Home"
                                onClick={() => router.replace(routes.CONTENT + routes.HOME)}
                            />
                        </div>
                    </div>
                    : <div>
                        <Formik
                            initialValues={{ code: '' }}
                            validationSchema={verifySchema}
                            onSubmit={handleOnSubmit}
                        >
                            <Form className={`flex flex-col`}>
                                {error && <Error error={error} />}
                                <AuthInput
                                    label="verification code"
                                    placeholder="verification code"
                                    Icon={<AiOutlineCheckCircle size={24} color="gray" />}
                                    name="code"
                                    autoComplete="off"
                                />
                                <Button
                                    label="Send"
                                    type="submit"
                                    loading={loading}
                                />
                            </Form>
                        </Formik>

                        <p className={`mt-8`}>
                            I didn't recieve verification code!. <button
                                onClick={handleResendCode}
                                className={`text-blue-400 hover:text-blue-500 hover:underline ${isResendedLoading && "pointer-events-none "}`}>{isResendedLoading ? "Resend..." : "Resend"}</button>
                        </p>
                        {
                            isResended && <h1 className={`mt-4 bg-green-50 p-4 text-green-600 `}>Please check your email. we resend verification code</h1>
                        }
                    </div>

                }
            </div>
        </Center>
    </div>
}

export default Verify;