import { Field, Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";
import { useRef, useState } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import ApiService from "../../../services/ApiService";
import notify from "../../../utils/toast";

const InputContainer = ({ title, desc, children }: any) => (
  <section className="flex flex-col gap-2">
    <div className="flex flex-wrap gap-2 items-center">
      <label className="text-lg font-bold">{title}</label>
      <p className="text-neutral-600">({desc})</p>
    </div>
    {children}
  </section>
);

export const CPortfolioProfileCard = ({ portfolioData, profileId }: any) => {
  const fileInputRef = useRef<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  async function handleSubmit(values: any, { setSubmitting }: any) {
    const portfolioData: any = {
      projectName: values.projectName,
      projectDescription: values.projectDescription,
      projectfiles: [],
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
    portfolioData.projectfiles = dataUrls;

    try {
      const url: string = `user-profile/${profileId}`;
      const response = await ApiService.patchData({
        url,
        data: { portfolio: [portfolioData] },
      });
      notify.success("Successful!");
    } catch (err: any) {
      notify.error(err.response.data.message);
    }
    setSubmitting(false);
  }
  const handleInputContainerClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (event: any, setFieldValue: any) => {
    const files = event.target.files;
    setFieldValue("files", [...files]);
    // setUploadedFiles([...uploadedFiles, ...files]);
  };

  const baseStyle =
    "w-full py-4 px-8 m-2 rounded-3xl bg-neutral-100 outline-blue-600 text-neutral-900 font-semibold";

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg flex flex-col gap-8 max-w-5xl shadow-md capitalize">
      <ToastContainer />
      <section className="flex justify-between">
        <h1 className="text-4xl font-bold">Portfolio</h1>
      </section>
      <Formik
        initialValues={{
          projectName: "",
          projectDescription: "",
        }}
        onSubmit={(values, helpers) => handleSubmit(values, helpers)}
      >
        {({ handleChange, setFieldValue }) => (
          <Form className="border-t">
            <div className="w-full m-2 mt-5">
              <label className="text-lg font-bold w-36">Project Name</label>
              <Field
                className={`${baseStyle}`}
                type="text"
                name="projectName"
                id="projectName-input"
                onChange={handleChange}
                placeholder="Enter Name"
              />
            </div>
            <div className="w-full m-2">
              <label className="text-lg font-bold w-36">
                Project Description
              </label>
              <Field
                className={`${baseStyle} resize-none min-h-[12rem]`}
                type="text"
                name="projectDescription"
                id="projectDescription-input"
                onChange={handleChange}
                placeholder="Enter Description"
              />
            </div>
            <div
              className={`${baseStyle} min-h-[15rem] flex flex-col justify-center items-center`}
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
                  handleFileUpload(e, setFieldValue);
                }}
                ref={fileInputRef}
                className=" hidden"
              />
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-bold">Uploaded Files</h2>
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
            <section className="flex mt-5">
              <div className="flex gap-3 text-xl font-medium flex-col md:flex-row md:items-center">
                <button
                  className="w-44 rounded-3xl py-2 text-white bg-blue-600"
                  type="submit"
                >
                  Save Changes
                </button>
                <button
                  className="w-56 rounded-3xl py-2 text-blue-600 border-2 border-blue-600"
                  type="button"
                >
                  Feature Your Profile
                </button>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </div>
  );
};
