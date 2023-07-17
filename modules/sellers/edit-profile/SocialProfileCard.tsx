import { Field, Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faCodepen,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import notify from "../../../utils/toast";
import ApiService from "../../../services/ApiService";

const InputContainer = ({ title, desc, children }: any) => (
  <section className="flex flex-col gap-2">
    <div className="flex flex-wrap gap-2 items-center">
      <label className="text-lg font-bold">{title}</label>
      <p className="text-neutral-600">({desc})</p>
    </div>
    {children}
  </section>
);

export const SocialProfileCard = ({ socialData, profileId }: any) => {

  async function handleSubmit(values: any, { setSubmitting }: any) {
    const links: any = {
      linkedIn: values.linkedin,
      facebook: values.facebook,
      twitter: values.twitter,
      blog: values.blog,
    };
    try {
      const url: string = `user-profile/${profileId}`;
      const response = await ApiService.patchData({ url, data:{socialMediaLinks: links} });
      notify.success("Successful!")
    } catch (err: any) {
      notify.error(err.response.data.message);
    }
    setSubmitting(false);
  }

  const baseStyle =
    "w-full py-4 px-8 m-2 rounded-3xl bg-neutral-100 outline-blue-600 text-neutral-900 font-semibold";

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg flex flex-col gap-8 max-w-5xl shadow-md capitalize">
      <ToastContainer />
      <Formik
        initialValues={{
          linkedin: `${socialData?.linkedIn}`,
          facebook: `${socialData?.facebook}`,
          twitter: `${socialData?.twitter}`,
          blog: `${socialData?.blog}`,
        }}
        onSubmit={(values, helpers) => handleSubmit(values, helpers)}
      >
        {({ handleChange, setFieldValue }) => (
          <Form>
            <section className="flex justify-between">
              <h1 className="text-4xl font-bold">Social Media</h1>
              <button
                className="w-32 rounded-3xl py-2 text-white bg-blue-600"
                type="submit"
              >
                Save Changes
              </button>
            </section>
            <div className="w-full flex items-center mt-5">
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="fa-brands fa-linkedin-in border border-solid border-[#0071BC] mr-2 py-[0.5rem] px-[0.55rem] rounded-full"
              />
              <label className="text-lg font-bold w-36">Linkedin</label>
              <Field
                className={`${baseStyle}`}
                type="text"
                name="linkedin"
                id="linkedin-input"
                onChange={handleChange}
                placeholder="Paste The Link"
              />
            </div>
            <div className="w-full flex items-center">
              <FontAwesomeIcon
                icon={faTwitter}
                className="fa-brands fa-linkedin-in border border-solid border-[#0071BC] mr-2 py-[0.5rem] px-[0.55rem] rounded-full"
              />
              <label className="text-lg font-bold w-36">Twitter</label>
              <Field
                className={`${baseStyle}`}
                type="text"
                name="twitter"
                id="twitter-input"
                onChange={handleChange}
                placeholder="Paste The Link"
              />
            </div>
            <div className="w-full flex items-center">
              <FontAwesomeIcon
                icon={faFacebookF}
                className="fa-brands fa-linkedin-in border border-solid border-[#0071BC] mr-2 py-[0.5rem] px-[0.7rem] rounded-full"
              />
              <label className="text-lg font-bold w-36">Facebook</label>
              <Field
                className={`${baseStyle}`}
                type="text"
                name="facebook"
                id="facebook-input"
                onChange={handleChange}
                placeholder="Paste The Link"
              />
            </div>
            <div className="w-full flex items-center">
              <FontAwesomeIcon
                icon={faCodepen}
                className="fa-brands fa-linkedin-in border border-solid border-[#0071BC] mr-2 py-[0.5rem] px-[0.55rem] rounded-full"
              />
              <label className="text-lg font-bold w-36">Blog</label>
              <Field
                className={`${baseStyle}`}
                type="text"
                name="blog"
                id="blog-input"
                onChange={handleChange}
                placeholder="Paste The Link"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
