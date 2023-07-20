import { Form, Formik } from "formik";
import * as yup from "yup";
import { Input } from "../../components/input";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import notify from "../../utils/toast";
import { signIn, useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

import { Layout } from "../../components/layout";
import CheckboxField from "../../components/checkbox";
import ApiService from "../../services/ApiService";
import { setCookie } from "cookies-next";
import { useEffect } from "react";

const frontedURL = process.env.FRONTEND_URL || "http://localhost:3000";

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    console.log(process.env.BACKEND_URL)
    console.log(process.env.NEXT_JWT_SECRET)
    console.log(process.env.NEXT_PUBLIC_TOKEN)
  }, []);
  async function handleSubmit(values: any, { setSubmitting }: any) {
    const res: any = await signIn("credentials", {
      username: values.email,
      password: values.password,
      redirect: false,
    });
    console.log(res)
    if (res.error === null) {
      const user = await ApiService.getData({url: `/users/${values.email}`})
      setCookie("NewUserId", user.id, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      })
      notify.success("Successful! Redirecting..."); 
      router.push(frontedURL + "/buyers");
    } else notify.error(res.error);
    setSubmitting(false);
  }
  
  async function handleGoogleSignin() {
    await signIn("google", { callbackUrl: frontedURL + "/buyers" })
  }

  async function handleFacebookSignin() {
    await signIn("facebook", { callbackUrl: frontedURL + "/buyers" });
  }

  const page: JSX.Element = (
    <div className="flex justify-center bg-[#F6F7FB] h-full border">
      <ToastContainer />
      <div className={"container mx-auto flex justify-center"}>
        <div className="my-20 bg-white rounded-2xl w-[90%] md:w-[66%] lg:w-[40%] xl:w-[33%] p-5 md:p-12">
          <div className={"py-2"}>
            <h1 className="text-center leading-normal text-black decoration-4 font-inter font-medium text-4xl my-2 max-[639px]:text-[30px] md:text-[40px] max-[639px]:text-center">
              Sign In To BuBe
            </h1>

            <div className="flex-col justify-center">
              <button
                onClick={handleFacebookSignin}
                className="border rounded-full my-3 w-full bg-[#4267B2] p-3 text-white flex justify-center "
              >
                <FontAwesomeIcon className="mr-4 mt-1" icon={faFacebook} />
                <span>Login With Facebook</span>
              </button>

              <button
                onClick={handleGoogleSignin}
                className="border rounded-full mt-3 mb-6 w-full bg-[#E84639] p-3 text-white flex justify-center"
              >
                <FontAwesomeIcon className="mr-4 mt-1" icon={faGoogle} />
                <span> Login With Google</span>
              </button>

              <Formik
                initialValues={{
                  password: "",
                  email: "",
                }}
                validationSchema={yup.object({
                  password: yup.string().required("Password is required."),
                  email: yup
                    .string()
                    .email("Email address is not valid")
                    .required("Email address is required."),
                })}
                onSubmit={(values, helpers) => handleSubmit(values, helpers)}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Input
                      id="email"
                      name="email"
                      label="Email Address "
                      placeholder="Enter Email Address"
                    />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      label="Password"
                      placeholder="Enter Password"
                    />

                    <button
                      type={"submit"}
                      className="border rounded-full w-full my-4 bg-primary p-3 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging you in..." : "Login"}
                    </button>
                    <div className="flex justify-between">
                      <CheckboxField
                        name="rememberMe"
                        id="rememberMe"
                        value="one"
                        label=" Remember me"
                      />
                      <span className="text-sec font-medium">
                        <Link href="./forgot-password"> Forgot Password?</Link>
                      </span>
                    </div>
                    <hr className="my-6" />
                    <h5 className="my-6 text-center font-medium">
                      Dont have an account?
                      <span className="text-sec px-2">
                        <Link href="./signup"> Sign Up</Link>
                      </span>
                    </h5>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return <Layout>{page}</Layout>;
}
