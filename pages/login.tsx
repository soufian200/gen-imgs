import Center from "../components/common/Center";
import { AiOutlineLock, AiOutlineMail, AiOutlineWarning } from 'react-icons/ai'
import Input from "../components/ui/form/Input";
import Image from 'next/image'
import Link from 'next/link'
import bg from '../assets/bg.jpg'
import routes from "../constants/routes";
import classNames from "classnames";
import Loader from "../components/ui/Loader";
import { useFormik } from "formik";
import { useState } from "react";
import BluredBg from "../components/ui/BluredBg";
import Logo from "../components/ui/Logo";


const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            console.log(values);
        },
    });

    const [errors, setErrors] = useState([])


    return <BluredBg>
        <div>
            <div className={`capitalize font-bold text-3xl mb-10`}>  <Logo /> | login</div>

            <form onSubmit={formik.handleSubmit}>
                <div className={` text-red-500`}>
                    {errors.length > 0 &&
                        errors.map((error) => <li className={` text-sm capitalize ml-2`}> {error} </li>)
                    }

                </div>
                <Input
                    label="email"
                    type="email"
                    placeholder="Enter your email"
                    Icon={<AiOutlineMail size={24} color="gray" />}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    name="email"
                />
                <Input
                    label="password"
                    placeholder="Enter your password"
                    type="password"
                    Icon={<AiOutlineLock size={24} color="gray" />}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name="password"
                />

                <p className={`text-xs mt-2 capitalize text-red-600 hover:underline`}><Link href={routes.RESETPASSWORD}>I forget my password! </Link></p>
                <button
                    type="submit"
                    className={classNames(`w-full capitalize p-4 text-white font-bold  mt-10 hover:opacity-90  ${!formik.values.email.trim() || !formik.values.password.trim() ? "bg-blue-400 pointer-events-none" : "bg-blue-500 pointer-events-auto"} `)}
                >
                    <Center>

                        {true ? "login" : <Loader />}
                    </Center>

                </button>
            </form>
            <div>
                <p className={`text-sm mt-2 capitalize mt-4`}>I don't have an account!
                    <Link href={routes.SIGNUP}><span className={`text-blue-500 cursor-pointer capitalize hover:underline`}> sign up</span>
                    </Link>
                </p>

            </div>
        </div>
    </BluredBg>


}



export default Login;