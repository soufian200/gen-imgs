import { Form, Formik } from "formik"
import BluredBg from "../../../components/ui/BluredBg"
import Logo from "../../../components/ui/Logo"
import AuthInput from "../../../components/ui/form/AuthInput";
import { AiOutlineLock } from "react-icons/ai";
import Button from "../../../components/ui/Button";
import ChangePasswordSchema from "../../../lib/schemas/ChangePasswordSchema";


interface Values {

    password: string;
    passwordConfirmation: string;
}

function ResetPasswordToken() {



    return <BluredBg>
        <div>
            <div className={`capitalize font-bold text-3xl mb-10`}> <Logo /> | Change Password</div>
            <Formik
                initialValues={{

                    password: '',
                    passwordConfirmation: ''
                }}
                validationSchema={ChangePasswordSchema}
                onSubmit={(values: Values) => {
                    console.log(values)
                }}
            >
                <Form className={`flex flex-col`}>

                    {/* <div className={` text-red-500`}>
                        {
                            errors.length > 0 &&
                            errors.map((error) => <li className={` text-sm capitalize ml-2`}> ! {error} </li>)
                        }
                    </div> */}

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