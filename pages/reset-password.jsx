import Center from "../components/common/Center";
import { AiOutlineMail, } from 'react-icons/ai'
import Input from "../components/ui/form/Input";
import classNames from "classnames";
import Loader from "../components/ui/Loader";
import { useFormik } from "formik";
import { useState } from "react";
import BluredBg from "../components/ui/BluredBg";
import Logo from "../components/ui/Logo";
import Link from 'next/link'
import routes from "../constants/routes";

const ResetPassword = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: values => {
            console.log(values);
        },
    });

    const [errors, setErrors] = useState([])





    return <BluredBg>
        <div>
            <div className={`capitalize font-bold text-3xl mb-10`}>  <Logo /> | Reset Password</div>

            <form onSubmit={formik.handleSubmit}>
                <div className={` text-red-500`}>
                    {errors.length > 0 &&
                        errors.map((error) => <li className={` text-sm capitalize ml-2`}> {error} </li>)
                    }
                </div>
                <Input
                    label="email"
                    type="email"
                    Icon={<AiOutlineMail size={24} color="gray" />}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="Enter your email"
                    name="email"

                />


                <button
                    type="submit"
                    className={classNames(`w-full capitalize p-4 text-white font-bold  mt-10 hover:opacity-90  ${!formik.values.email.trim() ? "bg-blue-400 pointer-events-none" : "bg-blue-500 pointer-events-auto"} `)}
                >
                    <Center>
                        {true ? "send" : <Loader />}
                    </Center>

                </button>
            </form>
            <div>
                <p className={`text-sm mt-2 capitalize mt-4`}>I have an account!
                    <Link href={routes.LOGIN}><span className={`text-blue-500 cursor-pointer capitalize hover:underline`}> log in</span>
                    </Link>
                </p>

            </div>
        </div>
    </BluredBg>


}



export default ResetPassword;