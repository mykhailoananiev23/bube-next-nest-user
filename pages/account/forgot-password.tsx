import { Form, Formik } from "formik";
import * as yup from "yup";
import { Input } from "../../components/input";
import { Layout } from "../../components/layout";
import Link from "next/link";

function ResetPassword() {
  function handleSubmit(values: any, { setSubmitting, setFieldError }: any) {}

  const page = (
    <div className="flex justify-center bg-[#F6F7FB] border h-full-screen">
      <div className={"container mx-auto flex justify-center my-2"}>
        <div className="my-20 bg-white rounded-2xl w-[90%] md:w-[66%] lg:w-[40%] xl:w-[33%] p-5 md:p-12">
          <div className={"py-2"}>
            <h1 className="text-center leading-normal text-black decoration-4 font-inter font-medium text-4xl my-2 max-[639px]:text-[30px] md:text-[40px] max-[639px]:text-center">
              Reset Password
            </h1>
            <div className="flex-col justify-center">
              <p className="text-center text-[#8B939A] text-[0.8rem] mx-2 mb-8">
                Please enter your Email address and we will send you a link to
                reset your Password
              </p>
              <Formik
                initialValues={{
                  email: "",
                }}
                validationSchema={yup.object({
                  email: yup
                    .string()
                    .email("Email address is not valid")
                    .required("Email address is required."),
                })}
                onSubmit={(values, helpers) => handleSubmit(values, helpers)}
              >
                {({ isSubmitting, values: { email } }) => (
                  <Form>
                    <Input
                      id="email"
                      name="email"
                      label="Email Address "
                      placeholder="Enter Email Address"
                    />

                    <button className="border rounded-full w-full my-4 bg-primary p-3 text-white">
                      Submit
                    </button>

                    <hr className="my-6" />
                    <span className="flex justify-center my-6 text-sec font-medium">
                      <Link href="./login">Back To Login</Link>
                    </span>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // eslint-disable-next-line react/no-children-prop
  return <Layout children={page} />;
}

export default ResetPassword;
