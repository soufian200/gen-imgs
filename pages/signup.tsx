import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import Link from 'next/link'
import routes from "../constants/routes";
import { Form, Formik } from "formik";
import { useState } from "react";
import BluredBg from "../components/ui/BluredBg";
import Logo from "../components/ui/Logo";

import AuthInput from "../components/ui/form/AuthInput";
import Button from "../components/ui/Button";
import signupForm from '../lib/schemas/singupSchema';


interface Values {
    username: string;
    email: string;
    password: string;
}


const Signup = () => {


    const [errors, setErrors] = useState([])




    return <BluredBg>
        <div>

            <div className={`capitalize font-bold text-3xl mb-10`}>  <Logo /> | sign up</div>

            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    passwordConfirmation: ''
                }}
                validationSchema={signupForm}
                onSubmit={(values: Values) => {
                    console.log(values)
                }}
            >
                <Form className={`flex flex-col`}>

                    <div className={` text-red-500`}>
                        {
                            errors.length > 0 &&
                            errors.map((error) => <li className={` text-sm capitalize ml-2`}> ! {error} </li>)
                        }
                    </div>

                    <AuthInput
                        label="username"
                        placeholder="Enter your username"
                        Icon={<AiOutlineUser size={24} color="gray" />}
                        name="username"
                    />

                    <AuthInput
                        label="email"
                        placeholder="Enter your email"
                        Icon={<AiOutlineMail size={24} color="gray" />}
                        name="email"
                    />
                    <AuthInput
                        label="password"
                        placeholder="Enter your password"
                        Icon={<AiOutlineLock size={24} color="gray" />}
                        type="password"
                        name="password"
                    />
                    <AuthInput
                        label="Confirm password"
                        placeholder="Confirm your password"
                        Icon={<AiOutlineLock size={24} color="gray" />}
                        type="password"
                        name="passwordConfirmation"
                    />

                    <Button type="submit" label="sign up" />

                </Form>
            </Formik>


            <div>
                <p className={`text-sm mt-2 capitalize mt-4`}>I have an account!
                    <Link href={routes.LOGIN}><span className={`text-blue-500 cursor-pointer capitalize hover:underline`}> log in</span>
                    </Link>
                </p>
            </div>
        </div>
    </BluredBg >


}



export default Signup;