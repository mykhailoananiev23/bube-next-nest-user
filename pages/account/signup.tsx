/* eslint-disable react/no-children-prop */
import { Form, Formik } from "formik";
import * as yup from "yup";
import { ToastContainer } from "react-toastify";
import { Input } from "../../components/input";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout } from "../../components/layout";
import { ApiResponse, UserFormValues } from "../../interface";
import ApiService from "../../services/ApiService";
import { AxiosError } from "axios";
import notify from "../../utils/toast";
import { useRouter } from "next/router";

const frontedURL = process.env.FRONTEND_URL || "http://localhost:3000";

export default function Signup() {
  const router = useRouter();
  const initialValues: UserFormValues = {
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: UserFormValues,
    { resetForm, setFieldError }: any
  ) => {
    const data: any = values;
    data.roles = ['Customer', 'Buyer'];
    const url: string = `users/sign-up`;
    try {
      const response = await ApiService.postData({ url, data });
      if(response.data.status === "Email already exist!"){
        notify.error("Email already exist!");
        router.push("/account/signup")
      } else if(response?.data?.status === "Succesful SignUp!"){
        notify.success("Registration Was Succesful Please Proceed With Login!");
        router.push("/account/login")
      }
      resetForm(true);
    } catch (error) {
      const err = error as AxiosError<ApiResponse>;
      if (err) {
        const errorData = err.response?.data.message;
        // set errors for all fields
        Object.keys(initialValues).forEach((field) => {
          setFieldError(field, errorData);
        });
      }
    }
  };

  const page = (
    <div className="flex justify-center bg-[#F6F7FB] h-full border">
      <ToastContainer />
      <div className={"container mx-auto flex justify-center"}>
        <div className="my-20 bg-white rounded-2xl w-[90%] md:w-[66%] lg:w-[50%] p-5 md:p-12">
          <div className={"py-2"}>
            <h1 className="text-center leading-normal text-black decoration-4 font-inter font-medium text-4xl my-2 max-[639px]:text-[30px] md:text-[40px] max-[639px]:text-center">
              Create an Account
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={yup.object({
                firstName: yup.string().required("First name is required."),
                lastName: yup.string().required("Last name is required."),
                password: yup.string().required("Password is required."),
                confirmPassword: yup
                  .string()
                  .required(" Confirm password is required."),
                email: yup
                  .string()
                  .email("Email address is not valid")
                  .required("Email address is required."),
              })}
              onSubmit={(values, helpers) => handleSubmit(values, helpers)}
            >
              {({ isSubmitting, values: { firstName, lastName } }) => (
                <Form>
                  <div className="flex flex-wrap -mx-3">
                    <div className={"w-full md:w-1/2 px-3"}>
                      <Input
                        id="firstName"
                        name="firstName"
                        label="First Name"
                      />
                    </div>
                    <div className={"w-full md:w-1/2 px-3"}>
                      <Input id="lastName" name="lastName" label="Last Name" />
                    </div>
                  </div>
                  <Input
                    id="email"
                    name="email"
                    label="Email Address "
                    placeholder="Enter Email Address"
                  />
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter Password"
                  />
                  <Input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Enter password"
                  />
                  <button type="submit" className="border rounded-full w-full my-4 bg-primary p-3 text-white">
                    Sign Up
                  </button>
                  <p className="text-center text-[#8B939A] text-[1rem] mx-2 mb-8">
                    By Signing Up You are agree to BuBe Terms of Service as well
                    to receive occasional emails from us.
                  </p>
                  <hr className="my-6" />
                  <h5 className="my-6 text-center font-medium">
                    Already have an account?{" "}
                    <span className="text-sec px-2">
                      <Link href="./login"> Sign In</Link>
                    </span>
                  </h5>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );

  return <Layout children={page} />;
}
