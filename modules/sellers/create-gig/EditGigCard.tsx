import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import ApiService from "../../../services/ApiService";
import { Category } from "../../../types/category";
import { Gig } from "../../../types/gigs";
import { User } from "../../../types/user";
import { SubCategory } from "../../../types/subCategory";
import apiClient from "../../../utils/axios";
import notify from "../../../utils/toast";
import { ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { CreateGigValidation } from "../../../utils/formik_validation";
import { FormikInputForm } from "../../../components/forms";
import Downshift from "downshift";
import { getCookie } from "cookies-next";
import { Loading } from "../../../components/loading/loading";

const InputContainer = ({ title, desc, children }: any) => (
  <section className="flex flex-col gap-2">
    <div className="flex flex-wrap gap-2 items-center">
      <label className="text-lg font-bold">{title}</label>
      <p className="text-neutral-600">({desc})</p>
    </div>
    {children}
  </section>
);

export const EditGigCard = () => {
  const userId = Number(getCookie("NewUserId"));
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [subcategories, setSubcategories] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef<any>(null);
  const router = useRouter();
  const gigId = router?.query?.gigId
  const [inputValue, setInputValue] = useState("");
  const [skills, setSkills] = useState<{ id: number; name: string }[]>([]);
  const [SelectedSkills, setSelectedSkills] = useState<
    { id: number; name: string }[]
  >([]);
  const [GigData, setGigData] = useState<any>();

  useEffect(() => {
    async function fetchSkill() {
      const response = await ApiService.getData({ url: `skills/fetch` });
      setSkills(response);
    }
    fetchSkill();
    async function fetchCategories() {
      const response = await ApiService.getData({ url: `categories/fetch` });
      setCategories(response.data);
    }
    fetchCategories();

    async function fetchGigData() {
      const res = await ApiService.getData({url: `/gigs/${gigId}`})
      setGigData(res);
    }
    fetchGigData()
  }, [gigId]);

  //?making subcategories reactive to categorize
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

  useEffect(() => {
    if (GigData) {
      setSelectedCategory(GigData.category.id);
    }
  }, [GigData]);

  const handleFileUpload = (event: any, setFieldValue: any) => {
    const files: any = event.target.files;
    setFieldValue("files", [...files]);
    var oldUploadedFiles = uploadedFiles;
    var newUploadFiles: any = oldUploadedFiles.join(files);
    setUploadedFiles(newUploadFiles);
  };

  function handleSkillRemove(index: number, skill: any) {
    setSelectedSkills((prevs) => {
      return prevs.slice(0, index).concat(prevs.slice(index + 1));
    });
    setSkills((prevs) => {
      return prevs
        .slice(0, index)
        .concat(skill)
        .concat(prevs.slice(index + 1));
    });
  }

  function AddSelectedSkills(index: number, item: any) {
    setSkills((prevs) => {
      return prevs.filter((items) => items.name !== item.name);
    });
    setSelectedSkills([...SelectedSkills, item]);
    setInputValue("");
  }

  async function handleSubmit(values: any, { setSubmitting }: any) {
    const gig: any = {
      title: values.title,
      description: values.description,
      price: values.price,
      user: userId,
      category: parseInt(values.category),
      subCategories: [parseInt(values.subcategories)],
      files: [],
      skill: SelectedSkills.map((item: any) => {
        return item.id;
      }),
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
    gig.files = dataUrls;

    try {
      const url: string = `gigs/update/${gigId}`;
      const response = await ApiService.postData({ url, data: gig });
      notify.success("Successful!");
      router.push("/sellers/my-gigs");
    } catch (err) {
      // notify.error(err.response.data.message);
    }
    setSubmitting(false);
  }

  const handleInputContainerClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const baseStyle =
    "w-full py-4 px-8 rounded-3xl bg-neutral-100 outline-blue-600 text-neutral-900 font-semibold";

  if(gigId && !GigData){
    return <Loading title="loading... edit gig card" />
  }
  
  return (
    <div>
      <ToastContainer />
      <Formik
        initialValues={gigId ? {
          title: GigData?.title,
          category: GigData?.category.id,
          subcategories: GigData?.subCategory[0].id,
          description: GigData?.description,
          price: GigData?.price,
          paymentMethod: "",
          files: [],
        } : {
          title: "",
          category: "",
          subcategories: "",
          description: "",
          price: "",
          paymentMethod: "",
          files: [],
        }}
        validationSchema={CreateGigValidation}
        onSubmit={(values, helpers) => handleSubmit(values, helpers)}
      >
        {({ handleChange, setFieldValue, values }) => (
          <Form className="bg-white p-6 sm:p-8 rounded-lg flex flex-col gap-8 max-w-5xl shadow-md capitalize">
            <section className="flex flex-col gap-2 mb-4">
              <h1 className="text-4xl font-bold">Create your own gig</h1>
              <p className="text-neutral-600 font-semibold">
                Create a gig of the service you're offering and staff selling
                instantly
              </p>
            </section>
            <InputContainer
              title="Gig Title"
              desc="Create a gig of the service you're offering and staff selling instantly"
            >
              <FormikInputForm
                className={`${baseStyle}`}
                type="text"
                name="title"
                id="gig-title-input"
                onChange={handleChange}
                placeholder="Gig Title"
              />
            </InputContainer>
            <InputContainer
              title="Category"
              desc="Choose the category most suitable for your gig"
            >
              <FormikInputForm
                as="select"
                className={`${baseStyle} appearance-none`}
                name="category"
                id="gig-category-selector"
                onChange={(e: any) => {
                  handleChange(e);
                  setSelectedCategory(parseInt(e.target.value));
                }}
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
              desc="Choose the sub category most suitable for your gig"
            >
              <FormikInputForm
                as="select"
                className={`${baseStyle} appearance-none`}
                name="subcategories"
                id="gig-sub-category-selector"
                onChange={handleChange}
                disabled={!selectedCategory ? true : false}
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
              title="Description"
              desc="Explain your gig. Be as detailed as possible, make it easy for customers to understand your offer"
            >
              <FormikInputForm
                as="textarea"
                className={`${baseStyle} resize-none min-h-[12rem]`}
                name="description"
                id="gig-description-input"
                onChange={handleChange}
                placeholder="Details aboout gig"
              />
            </InputContainer>
            <InputContainer title="Price $" desc="Set a price for your gig">
              <FormikInputForm
                className={`${baseStyle}`}
                type="text"
                name="price"
                id="gig-price-input"
                onChange={handleChange}
                placeholder="Cost of gig"
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
                id="gig-sub-category-selector"
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
                                highlightedIndex === index ? "bg-blue-300 " : ""
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
              {SelectedSkills?.map((skill, index: number) => (
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
                    &#10060;
                  </button>
                </div>
              ))}
            </div>
            <InputContainer
              title="Image"
              desc="Add relevant images to your gig. Optional, 5 max. Formats: JPEG, PNG, GIF"
            >
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
              <div>
                <ul className="flex flex-wrap gap-2">
                  {uploadedFiles.map((file: any, index: any) => (
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
                  <Link href={"/sellers/jobs"}>Cancel</Link>
                </button>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </div>
  );
};
