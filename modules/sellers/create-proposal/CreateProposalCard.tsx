import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import ApiService from "../../../services/ApiService";
import { Category } from "../../../types/category";
import { User } from "../../../types/user";
import { SubCategory } from "../../../types/subCategory";
import apiClient from "../../../utils/axios";
import notify from "../../../utils/toast";
import { ToastContainer } from "react-toastify";
import { FormikInputForm } from "../../../components/forms";
import { CreateProposalValidation } from "../../../utils/formik_validation";
import { addDays } from "../../../utils/addDay";
import DatePicker from 'react-datepicker'
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
import { getCookie } from "cookies-next";

const InputContainer = ({ title, desc, children }: any) => (
  <section className="flex flex-col gap-2">
    <div className="flex flex-wrap gap-2 items-center">
      <label className="text-lg font-bold">{title}</label>
      <p className="text-neutral-600">({desc})</p>
    </div>
    {children}
  </section>
);

export const CreateProposalCard = () => {
  const userId = Number(getCookie("NewUserId"))
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef<any>(null);
  const router = useRouter();
  const [jobid, setId] = useState<any>(router.query.id);
  const [ExpireDay, setExpireDay] = useState(new Date());

  useEffect(() => {
    setId(router.query.id);
  }, [router.query.id]);

  const handleFileUpload = (event: any) => {
    const files = event.target.files;
    setUploadedFiles(uploadedFiles.concat(...files));
  };

  async function handleSubmit(values: any, { setSubmitting }: any) {
    //   todo   User from session
    const user = await ApiService.getData({ url: `users/rajesh@cal.com` });

    const proposal: any = {
      title: values.title,
      coverletter: values.coverletter,
      price: String(values.price),
      expectedDeliveryTime: String(ExpireDay),
      files: [],
      jobrequests: parseInt(jobid),
      user: userId,
    };

    //   ?   File Conversion to base64 code
    const files = values.files;
    const promises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const promise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
      });
      promises.push(promise);
    }
    const dataUrls = await Promise.all(promises);
    proposal.files = dataUrls;

    try {
      const url: string = `proposal/create`;
      const response = await ApiService.postData({ url, data: proposal });
      notify.success("Your Application Was Successfully Sent");
      router.push("/sellers/proposals");
    } catch (err) {
      // notify.error(err.response.data.message);
    }
    setSubmitting(false);
  }

  const baseStyle =
    "w-full py-4 px-8 rounded-3xl bg-neutral-100 outline-blue-600 text-neutral-900 font-semibold";

  return (
    <div>
      <ToastContainer />
      <Formik
        initialValues={{
          title: "",
          coverletter: "",
          price: "",
          paymentMethod: "",
          files: [],
          time: "",
        }}
        validationSchema={CreateProposalValidation}
        onSubmit={(values, helpers) => handleSubmit(values, helpers)}
      >
        {({ handleChange, setFieldValue }) => (
          <Form className="bg-white p-6 sm:p-8 rounded-lg flex flex-col gap-8 max-w-5xl shadow-md capitalize">
            <section className="flex flex-col gap-2 mb-4">
              <h1 className="text-4xl font-bold">Submit A Proposal</h1>
              <p className="text-neutral-600 font-semibold">
                When you submit this proposal, you'll have ${`16`} Connects
                Remaining.
              </p>
            </section>
            <InputContainer
              title="Title"
              desc="Your title should be short and clear"
            >
              <FormikInputForm
                className={`${baseStyle}`}
                type="text"
                name="title"
                id="proposal-title-input"
                onChange={handleChange}
                placeholder="Enter title"
              />
            </InputContainer>
            <InputContainer
              title="Cover Letter"
              desc="Your title should be short and clear"
            >
              <FormikInputForm
                as="textarea"
                className={`${baseStyle} resize-none min-h-[12rem]`}
                name="coverletter"
                id="proposal-coverletter-input"
                onChange={handleChange}
                placeholder="Cover Letter"
              />
            </InputContainer>
            <InputContainer title="Price $" desc="Set A Price For This Job">
              <FormikInputForm
                className={`${baseStyle}`}
                type="text"
                name="price"
                id="proposal-price-input"
                onChange={handleChange}
                placeholder="Set Price"
              />
            </InputContainer>
            <InputContainer
              title="Time"
              desc="Set A TImeframe For This Project"
            >
              <DatePicker
                className={`${baseStyle}`}
                selected={ExpireDay}
                onChange={(date: any) => setExpireDay(date)}
                maxDate={addDays(new Date(), 365 * 3)}
                minDate={new Date()}
                showMonthDropdown
                showYearDropdown
                disabledKeyboardNavigation
                dropdownMode="select"
                placeholderText="This has disabled keyboard navigation"
              />
            </InputContainer>
            <InputContainer
              title="Select Payment Method"
              desc="Choose which cryptocurrency you will prefer for your payment"
            >
              <FormikInputForm
                as="select"
                className={`${baseStyle} appearance-none`}
                name="paymentMethod"
                id="proposal-sub-category-selector"
                onChange={handleChange}
              >
                <option value="">Please select payment method</option>
                <option value="Cryptocurrency">Cryptocurrency</option>
                <option value="Credit Card">Credit Card</option>
              </FormikInputForm>
            </InputContainer>
            <InputContainer
              title="Image"
              desc="Add relevant images to your Job. Optional, 5 max. Formats: JPEG, PNG, GIF"
            >
              <div
                className={`${baseStyle} min-h-[15rem] flex flex-col justify-center items-center relative`}
              >
                <CloudArrowUpIcon width={60} />
                <p className="text-lg">Drag and upload your files here</p>
                <input
                  type="file"
                  id="files"
                  name="files[]"
                  multiple
                  onDrop={(e) => {
                    handleFileUpload(e);
                  }}
                  ref={fileInputRef}
                  className="w-full h-full opacity-0 absolute"
                />
              </div>
              <div>
                <ul className="flex flex-wrap gap-2">
                  {uploadedFiles.map((file: any, index) => (
                    <li key={index} className="flex flex-col items-center">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="h-24 w-24 object-cover"
                      />
                      <p className="text-xs mt-1 max-w-[6rem] overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {file.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </InputContainer>
            <section className="flex">
              <div className="flex gap-3 text-xl font-medium">
                <button
                  className="w-32 rounded-3xl py-2 text-white bg-blue-600"
                  type="submit"
                >
                  Submit
                </button>
                <button
                  className="w-32 rounded-3xl py-2 text-blue-600 border-2 border-blue-600"
                  type="reset"
                >
                  Cancel
                </button>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </div>
  );
};
