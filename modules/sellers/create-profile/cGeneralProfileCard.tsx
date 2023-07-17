import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ApiService from "../../../services/ApiService";
import notify from "../../../utils/toast";
import Downshift from "downshift";
import { country } from "../../../hooks/countries";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { addDays } from "../../../utils/addDay";

import { CreateProfileValidataion } from "../../../utils/formik_validation";
import { FormikInputForm } from "../../../components/forms";

import DatePicker from "react-datepicker";
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";

interface generalDataType {
  generalData: {
    id: number;
    user: { firstName: string; lastName: string };
    aboutMe: string;
    profession: string;
    country: string;
    rate: string;
    city: string;
    birth: string;
  };
}

const InputContainer = ({ title, desc, children }: any) => (
  <section className="flex flex-col gap-2">
    <div className="flex flex-wrap gap-2 items-center">
      <label className="text-lg font-bold">{title}</label>
      <p className="text-neutral-600">({desc})</p>
    </div>
    {children}
  </section>
);

export const CGeneralProfileCard = ({ generalData }: generalDataType) => {
  const router = useRouter();
  const newDate = generalData?.birth?.substring(0, 10) || new Date();

  const [SelectedSkills, setSelectedSkills] = useState<
    { id: number; name: string }[]
  >([]);
  const [skills, setSkills] = useState<{ id: number; name: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [countries, setCountries] = useState(country.data);
  const [SelectedCountries, setSelectedCountries] =
    useState<any>("country");
  const [cities, setCities] = useState<any>([]);
  const [SelectedCity, setSelectedCity] = useState<any>();

  // const { isLoading } = useQuery(
  //   ["Countries"],
  //   () => axios.get("https://countriesnow.space/api/v0.1/countries"),
  //   {
  //     keepPreviousData: true,
  //     staleTime: 60000,
  //     onSuccess: (resdata) => setCountries(resdata.data.data as any),
  //   }
  // );

  // const { error } = useQuery(
  //   ["skill_category"],
  //   () => ApiService.getData({ url: `skills/fetch` }),
  //   {
  //     keepPreviousData: true,
  //     staleTime: 60000,
  //     onSuccess: (res) => setSkills(res),
  //   }
  // );

  useEffect(() => {
    async function fetchSkill() {
      const response = await ApiService.getData({ url: `skills/fetch` });
      setSkills(response);
    }
    fetchSkill();
  }, []);

  useEffect(() => {
    if (!!SelectedCountries && SelectedCountries !== "country") {
      const index = countries.findIndex(
        (country) => country.country === SelectedCountries
      );
      if (index) {
        const citiesss = countries[index].cities;
        setCities(citiesss);
      }
    }
  }, [SelectedCountries]);

  async function handleSubmit(values: any, { setSubmitting }: any) {
    setCookie("profileId", generalData?.id, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    const skillArr = SelectedSkills.map((item: any) => {
      return item.id;
    });
    const general: any = {
      firstName: values.firstName,
      lastName: values.lastName,
      aboutMe: values.aboutMe,
      birth: BirDay,
      city: values.city,
      country: values.country,
      profession: values.profession,
      portfolio: [],
      rate: 0,
      socialMediaLinks: {},
      experience: [],
      user: generalData?.id,
      skill: skillArr,
    };
    try {
      const url: string = `user-profile/create`;
      const response = await ApiService.postData({ url, data: general });
      notify.success("Successful!");
      if (response) {
        router.push("/sellers/jobs");
      }
    } catch (err: any) {
      notify.error(err.response.data.message);
    }
    setSubmitting(false);
  }

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

  const baseStyle =
    "w-full py-4 px-8 m-2 rounded-[40px] bg-neutral-100 outline-blue-600 text-neutral-900 font-semibold";

  const [BirDay, setBirDay] = useState(new Date("01/01/1950"));

  return (
    <div className="bg-white mb-5 p-6 sm:p-8 rounded-lg gap-8 max-w-5xl shadow-md capitalize">
      <ToastContainer />
      <Formik
        initialValues={{
          firstName: `${generalData?.user?.firstName}`,
          lastName: `${generalData?.user?.lastName}`,
          aboutMe: `${generalData?.aboutMe}`,
          profession: `${generalData?.profession}`,
          rate: `${generalData?.rate}`,
          // country: `${generalData?.country}`,
          country: "",
          city: `${generalData?.city}`,
          dob: `${newDate}`,
        }}
        validationSchema={CreateProfileValidataion}
        onSubmit={(values, helpers) => handleSubmit(values, helpers)}
      >
        {({ handleChange, setFieldValue, errors, touched, values }) => (
          <Form
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
              }
            }}
          >
            <section className="flex justify-between">
              <h1 className="text-4xl font-bold">General Info</h1>
              <button
                className="w-32 rounded-3xl py-2 text-white bg-blue-600"
                type="submit"
              >
                Save Changes
              </button>
            </section>
            <div className="grid md:grid-cols-2 justify-between mt-5 border-t">
              <div className="m-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="text-lg font-bold">First Name</label>
                </div>
                <FormikInputForm
                  className={`${baseStyle}`}
                  type="text"
                  name="firstName"
                  id="firstName-input"
                  onChange={handleChange}
                  placeholder="First Name"
                  value={values.firstName}
                />
              </div>
              <div className="m-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="text-lg font-bold">last Name</label>
                </div>
                <FormikInputForm
                  className={`${baseStyle}`}
                  name="lastName"
                  id="lastName-input"
                  onChange={handleChange}
                  placeholder="Last Name"
                  value={values.lastName}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 justify-between">
              <div className="w-full m-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="text-lg font-bold">Profession</label>
                </div>
                <FormikInputForm
                  className={`${baseStyle}`}
                  type="text"
                  name="profession"
                  id="profession-input"
                  onChange={handleChange}
                  placeholder="Enter Profession"
                  value={values.profession}
                />
              </div>
              <div className="w-full m-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="text-lg font-bold">
                    Date Of Birth{" "}
                  </label>
                  <span className="text-[14px] text-[#a8a8a8]">
                    ( You can set your birthday to input Date. )
                  </span>
                </div>
                <DatePicker
                  className={`${baseStyle}`}
                  selected={BirDay}
                  onChange={(date: any) => setBirDay(date)}
                  maxDate={addDays(new Date(), -365 * 8)}
                  minDate={new Date("01/01/1950")}
                  showMonthDropdown
                  showYearDropdown
                  disabledKeyboardNavigation
                  dropdownMode="select"
                  placeholderText="This has disabled keyboard navigation"
                />
              </div>
            </div>
            <InputContainer title="About Me" desc="Max 1000">
              <FormikInputForm
                as="textarea"
                className={`${baseStyle} resize-none min-h-[12rem]`}
                name="aboutMe"
                id="aboutme-input"
                onChange={handleChange}
                placeholder="About me"
                value={values.aboutMe}
              />
            </InputContainer>
            <div className="grid md:grid-cols-2 justify-between">
              <div className="w-full m-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="text-lg font-bold">Country</label>
                </div>
                <FormikInputForm
                  as="select"
                  className={`${baseStyle} appearance-none`}
                  name="country"
                  id="country-category-selector"
                  onChange={(e: any) => {
                    handleChange(e);
                    setSelectedCountries(e.target.value);
                  }}
                  value={values.country}
                >
                  <option value="">{generalData?.country}</option>
                  {countries?.map((country, index) => (
                    <option key={index}>{country.country}</option>
                  ))}
                </FormikInputForm>
              </div>
              <div className="w-full m-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="text-lg font-bold">City</label>
                </div>
                <FormikInputForm
                  as="select"
                  className={`${baseStyle} appearance-none`}
                  name="city"
                  id="city-category-selector"
                  placeholder="Enter a city name"
                  onChange={handleChange}
                  disabled={!values.country ? true: false}
                >
                  <option
                    defaultValue=""
                    onChange={(e: any) => setSelectedCity(e.target.value)}
                  >
                    {SelectedCity}
                  </option>
                  {cities.length > 0 &&
                    cities.map((city: string) => (
                      <option value={city} key={city}>
                        {city}
                      </option>
                    ))}
                </FormikInputForm>
              </div>
            </div>

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
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
