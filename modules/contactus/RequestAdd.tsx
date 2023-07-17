import React, { useRef, useState } from "react";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import ApiService from "../../services/ApiService";
import notify from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

interface RequestaddProps {
  setRequestModal: (showRequestModal: boolean) => void;
  userId: number;
}

export default function RequestAdd({
  setRequestModal,
  userId,
}: RequestaddProps) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef<any>(null);

  const loginSchema = Yup.object().shape({
    subject: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const styles = {
    label: "block text-gray-700 text-sm font-bold pt-2 pb-1",
    field:
      "bg-[#f4f5f9] text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none",
    button:
      " bg-[#f4f5f9] text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600",
    errorMsg: "text-red-500 text-sm",
  };

  const baseStyle =
  "w-full py-4 px-8 rounded-3xl bg-neutral-100 outline-blue-600 text-neutral-900 font-semibold";

  async function handleRequest(values: any, { setSubmitting, resetForm }: any) {
    console.log('object');
    const request: any = {
      subject: values.subject,
      description: values.description,
      status: "in progress",
      user: userId,
      files: [],
    };

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
    request.files = dataUrls;

    try {
      const url: string = `tickets/create`;
      const response = await ApiService.postData({ url, data: request });
      notify.success("Your Request Was Successfully Sent");
    } catch (err) {
      // notify.error(err.response.data.message);
    }
    setSubmitting(false);
    setTimeout(() => {
      resetForm();
      setRequestModal(false);
    }, 1000);
  }

  const handleInputContainerClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // const handleFileUpload = (event, setFieldValue) => {
  //   const files = event.target.files;
  //   setFieldValue("files", [...files]);
  //   // setUploadedFiles([...uploadedFiles, ...files]);
  // };


  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg flex flex-col shadow-md lg:w-1/2 md:w-full m-2">
      <ToastContainer/>
      <div className="text-gray-900 text-center flex justify-between text-lg border-b mb-4 font-bold">
        <span className="p-2 pl-0"> Send Request </span>
        <button
          onClick={() => setRequestModal(false)}
          className="p-2 lg:pr-0 lg:px-8 md:mx-2 text-center"
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <div>
        <Formik
          initialValues={{
            subject: "",
            description: "",
            files:[]
          }}
          validationSchema={loginSchema}
          onSubmit={(values, helpers) => handleRequest(values, helpers)}
        >
          {({handleChange ,setFieldValue }) => (
            <Form>
              <label className={styles.label} htmlFor="Email">
                Subject
              </label>
              <Field className={styles.field} onChange={handleChange} id="subject" name="subject" />
              <ErrorMessage
                component="a"
                className={styles.errorMsg}
                name="subject"
              />
              <label className={styles.label} htmlFor="Email">
                Description
              </label>
              <Field
                onChange={handleChange}
                component="textarea"
                className={styles.field}
                id="description"
                name="description"
              />
              <ErrorMessage
                component="a"
                className={styles.errorMsg}
                name="description"
              />
              <div
                className={`${baseStyle} min-h-[15rem] flex flex-col justify-center items-center mt-4`}
                onClick={handleInputContainerClick}
              >
                <CloudArrowUpIcon width={60} />
                <p className="text-lg">Drag and upload your files here</p>
                <input
                  type="file"
                  id="files"
                  name="files"
                  multiple
                  onChange={(e) => {
                    // handleFileUpload(e, setFieldValue);
                  }}
                  ref={fileInputRef}
                  className=" hidden"
                />
              </div>
              <div className={`mt-4 ${styles.field}`}>
                {uploadedFiles && <label htmlFor="">Uploaded FIle:</label>}
                <ul className="flex flex-wrap gap-2">
                  {uploadedFiles.map((file, index) => (
                    <li key={index} className="flex flex-col items-center font-bold">
                      <p className="text-xs mt-1 max-w-[6rem] overflow-hidden overflow-ellipsis font-medium whitespace-nowrap">
                      {/*<FontAwesomeIcon icon={faFileUpload} /> {file.name}*/}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="p-2 lg:px-8 md:mx-2 text-white text-center bg-[#1e50d7] rounded-3xl mt-3 md:mt-0"
                >
                  Send Request
                </button>
                <button
                  type="button"
                  onClick={() => setRequestModal(false)}
                  className="p-2 lg:px-8 md:mx-2 text-[#1e50d7] text-center border border-solid border-[#1e50d7] rounded-3xl"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
