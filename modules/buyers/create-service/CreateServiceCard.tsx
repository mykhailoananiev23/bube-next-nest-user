import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as yup from "yup";
import ApiService from "../../../services/ApiService";
import { Category } from "../../../types/category";
import { User } from "../../../types/user";
import { JobLevel, JobType } from "../../../types/jobs";
import { SubCategory } from "../../../types/subCategory";
import notify from "../../../utils/toast";
import { ToastContainer } from "react-toastify";
import { useDropzone } from "react-dropzone";
import DatePicker from "react-datepicker";
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
import { addDays } from "../../../utils/addDay";
import Downshift, { useSelect } from "downshift";
import { CreateServiceValidateSchema } from "../../../utils/formik_validation";
import { FormikInputForm } from "../../../components/forms";
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

export const CreateServiceCard = () => {
  const userId = Number(getCookie("NewUserId"))
  const [categories, setCategories] = useState([]);
  const [joblevels, setJoblevels] = useState([]);
  const [jobtypes, setJobtypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [subcategories, setSubcategories] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const router = useRouter();
  const [ExpireDay, setExpireDay] = useState(new Date());
  const [SelectedSkills, setSelectedSkills] = useState<any>([]);
  const [inputValue, setInputValue] = useState("");
  const [skills, setSkills] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    async function fetchSkill() {
      const response = await ApiService.getData({ url: `skills/fetch` });
      setSkills(response);
    }
    fetchSkill();
  }, []);

  const onDrop = useCallback((acceptedFiles: any) => {
    setUploadedFiles((prevFiles: any) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  }: {
    getRootProps: any;
    getInputProps: any;
    isDragAccept: any;
    isDragReject: any;
  } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const removeFile = (index: number) => {
    setUploadedFiles((prevFiles: any) => {
      return prevFiles.slice(0, index).concat(prevFiles.slice(index + 1));
    });
  };

  //   ?   Fetching categories
  useEffect(() => {
    async function fetchCategories() {
      const response = await ApiService.getData({ url: `categories/fetch` });
      setCategories(response.data);
    }

    fetchCategories();
  }, []);
  useEffect(() => {
    async function fetchJobtype() {
      const response = await ApiService.getData({ url: `job-types` });
      setJobtypes(response);
    }

    fetchJobtype();
  }, []);
  useEffect(() => {
    async function fetchJoblevel() {
      const response = await ApiService.getData({ url: `job-levels` });
      setJoblevels(response);
    }

    fetchJoblevel();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const selected: any = categories.find(
        (cat: Category) => cat.id === selectedCategory
      );
      setSubcategories(selected.subCategories);
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory]);

  const handleFileUpload = (event: any) => {
    const files = event.target.files;
    const oldUploadFile = uploadedFiles;

    //   setFieldValue("files", [...files]);
    setUploadedFiles(oldUploadFile.concat(...files));
  };

  function AddSelectedSkills(index: number, item: any) {
    setSkills((prevs) => {
      return prevs.filter((items) => items.name !== item.name);
    });
    setSelectedSkills([...SelectedSkills, item]);
    setInputValue("");
  }

  function handleSkillRemove(index: number, skill: any) {
    setSelectedSkills((prevs: any) => {
      return prevs.slice(0, index).concat(prevs.slice(index + 1));
    });
    setSkills((prevs) => {
      return prevs
        .slice(0, index)
        .concat(skill)
        .concat(prevs.slice(index + 1));
    });
  }

  async function handleSubmit(values: any, { setSubmitting }: any) {
    //   todo   User from session
    // const user = await ApiService.getData({ url: `users/rajesh@cal.com` });
    const skillArr = SelectedSkills.map((item: any) => {
      return item.id;
    });
    const service: any = {
      title: String(values.title),
      description: String(values.description),
      price: values.price,
      user: userId,
      category: parseInt(values.category),
      jobType: parseInt(values.joblevel),
      jobLevel: parseInt(values.jobtype),
      expectedDeliveryTime: ExpireDay.toString(),
      subCategories: [parseInt(values.subcategories)],
      files: [],
      skill: skillArr,
    };

    //   ?   File Conversion to base64 code
    if (values.files) {
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
      service.files = dataUrls;
    }

    if (uploadedFiles) {
      const files = uploadedFiles;
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
      service.files = dataUrls;
    }

    try {
      const url: string = `requests/create`;
      const response = await ApiService.postData({ url, data: service });
      notify.success("Successful!");
      setTimeout(() => {
        router.push("/buyers/my-requests");
      }, 1000);
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
          category: "",
          subcategories: "",
          jobtype: "",
          joblevel: "",
          price: "",
          time: "",
          paymentMethod: "",
          files: [],
        }}
        validationSchema={CreateServiceValidateSchema}
        onSubmit={(values, helpers) => {
          handleSubmit(values, helpers);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          isSubmitting,
        }) => (
          <Form
            className="bg-white p-6 sm:p-8 rounded-lg flex flex-col gap-8 max-w-5xl shadow-md capitalize"
            onSubmit={handleSubmit}
          >
            <section className="flex flex-col gap-2 mb-4">
              <h1 className="text-4xl font-bold">
                What Service Are Your Looking For
              </h1>
              <p className="text-neutral-600 font-semibold">
                Describe The Service you're Looking To Purchase - Please Be As
                Detailed As Possible:
              </p>
            </section>
            <InputContainer
              title="Title"
              desc="Your Title Should Be Short And Clear"
            >
              <FormikInputForm
                className={`${baseStyle}`}
                type="text"
                name="title"
                id="service-title-input"
                onChange={handleChange}
                placeholder="Enter Title"
              />
            </InputContainer>
            <InputContainer
              title="Description"
              desc="Explain Your Requirements"
            >
              <FormikInputForm
                as="textarea"
                className={`${baseStyle} resize-none min-h-[12rem]`}
                name="description"
                id="service-description-input"
                onChange={handleChange}
                placeholder="Details aboout Service"
              />
            </InputContainer>
            <InputContainer
              title="Category"
              desc="Choose the Category Related To Your Requirements"
            >
              <FormikInputForm
                as="select"
                className={`${baseStyle} appearance-none`}
                name="category"
                id="service-category-selector"
                onChange={(e: any) => {
                  handleChange(e);
                  setSelectedCategory(parseInt(e.target.value));
                }}
                value={values.category}
              >
                <option value="">Select a Category</option>
                {categories.map((category: Category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </FormikInputForm>
            </InputContainer>
            <InputContainer
              title="Sub Category"
              desc="Choose The Category Related To Your Requirements"
            >
              <FormikInputForm
                as="select"
                className={`${baseStyle} appearance-none`}
                name="subcategories"
                id="service-sub-category-selector"
                onChange={handleChange}
                value={values.subcategories}
                disabled={!values.category?true:false}
              >
                <option value="">Select a Subcategory</option>
                {subcategories.map((subcategory: SubCategory) => (
                  <option value={subcategory.id} key={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </FormikInputForm>
            </InputContainer>
            <InputContainer
              title="Job Type"
              desc="Choose The Category Related To Your Requirements"
            >
              <FormikInputForm
                as="select"
                className={`${baseStyle} appearance-none`}
                name="jobtype"
                id="service-jobtype-selector"
                onChange={handleChange}
                // values={values.jobtype}
              >
                <option value="">Select a Subcategory</option>
                {jobtypes.map((jobtype: JobType) => (
                  <option value={jobtype.id} key={jobtype.id}>
                    {jobtype.name}
                  </option>
                ))}
              </FormikInputForm>
            </InputContainer>
            <InputContainer
              title="Job Level"
              desc="Choose The Category Related To Your Requirements"
            >
              <FormikInputForm
                as="select"
                className={`${baseStyle} appearance-none`}
                name="joblevel"
                id="service-joblevel-selector"
                onChange={handleChange}
              >
                <option value="">Select a Subcategory</option>
                {joblevels.map((joblevel: JobLevel) => (
                  <option value={joblevel.id} key={joblevel.id}>
                    {joblevel.name}
                  </option>
                ))}
              </FormikInputForm>
            </InputContainer>
            <InputContainer
              title="Price $"
              desc="Set a price for your Job Post"
            >
              <FormikInputForm
                className={`${baseStyle}`}
                type="text"
                name="price"
                id="service-price-input"
                onChange={handleChange}
                placeholder="Set Price"
              />
            </InputContainer>
            <InputContainer
              title="Time"
              desc="Set a time frame for your Job Post"
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
                id="service-sub-category-selector"
                onChange={handleChange}
              >
                <option value="">Please select payment method</option>
                <option value="Cryptocurrency">Cryptocurrency</option>
                <option value="Credit Card">Credit Card</option>
              </FormikInputForm>
            </InputContainer>
            <div className="flex flex-wrap gap-2 items-center">
              <label className="text-lg font-bold">Skills</label>
            </div>
            <div>
              <Downshift
                onChange={(selectedItem) => {
                  setInputValue(selectedItem ? selectedItem.name : "");
                }}
                itemToString={(item) => (item ? item.name : "")}
                inputValue={inputValue}
              >
                {({
                  getInputProps,
                  getItemProps,
                  getMenuProps,
                  clearSelection,
                  isOpen,
                  inputValue,
                  selectedItem,
                  highlightedIndex,
                }) => (
                  <div>
                    <div className="">
                      <div className="flex bg-white gap-0.5">
                        <input
                          className={`${baseStyle}`}
                          type="text"
                          id="skills-input"
                          {...getInputProps({
                            onKeyDown: (e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                if (inputValue !== null) {
                                  setTimeout(() => {
                                    clearSelection();
                                  }, 100);
                                }
                              }
                            },
                            onChange: (e: any) => setInputValue(e.target.value),
                          })}
                        />
                      </div>
                    </div>
                    <ul
                      className={`w-full bg-white mt-1 shadow-md max-h-40 overflow-y-auto p-0 ${
                        !(isOpen && skills.length) && "hidden"
                      }`}
                      {...getMenuProps()}
                    >
                      {isOpen
                        ? skills
                            .filter(
                              (item: any) =>
                                !inputValue ||
                                item.name
                                  .toLowerCase()
                                  .includes(inputValue.toLowerCase())
                            )
                            .map((item: any, index) => (
                              <li
                                className={`py-2 px-3 shadow-sm flex flex-col w-full ${
                                  highlightedIndex === index
                                    ? "bg-blue-300 "
                                    : ""
                                }${selectedItem === item ? "font-bold " : ""}`}
                                {...getItemProps({
                                  key: item.id,
                                  index,
                                  item,
                                })}
                                onClick={() => {
                                  AddSelectedSkills(index, item);
                                  inputValue = null;
                                  isOpen = false;
                                }}
                              >
                                <span>{item.name}</span>
                              </li>
                            ))
                        : null}
                    </ul>
                  </div>
                )}
              </Downshift>
              <div className="mt-5">
                {SelectedSkills?.map((skill: any, index: number) => (
                  <div
                    key={skill.id}
                    className="inline-block bg-gray-200 text-md font-bold px-2 py-1 rounded-full mr-2 mb-2"
                  >
                    {skill.name}
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(index, skill)}
                      className="ml-2"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <InputContainer
              title="Image"
              desc="Add relevant images to your job. Optional, 5 max. Formats: JPEG, PNG, GIF"
            >
              <div
                {...getRootProps({
                  className: `{${baseStyle} min-h-[15rem] flex flex-col justify-center items-center relative`,
                })}
              >
                <input multiple {...getInputProps()} />
                <CloudArrowUpIcon width={60} />
                <p className="text-lg">Drag and upload your files here</p>
              </div>

              <div>
                <ul className="flex flex-wrap gap-2">
                  {uploadedFiles.map((file: any, index: number) => (
                    <li key={index} className="flex flex-col items-center">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="h-24 w-24 object-cover"
                      />
                      {isDragAccept && <p>All files will be accepted</p>}
                      {isDragReject && <p>Some files will be rejected</p>}
                      <p className="text-xs mt-1 max-w-[6rem] overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {file.name}
                      </p>
                      <button onClick={() => removeFile(index)}>Remove</button>
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
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
