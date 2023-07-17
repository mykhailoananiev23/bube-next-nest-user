import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Field, Form, Formik, isEmptyArray } from "formik";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import ApiService from "../../../services/ApiService";
import notify from "../../../utils/toast";
import Downshift, { useSelect } from "downshift";
import { country } from "../../../hooks/countries";
import { CreateProfileValidataion } from "../../../utils/formik_validation";
import { FormikInputForm, FormikTextAreaForm } from "../../../components/forms";
import DatePicker from 'react-datepicker'
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
import { addDays } from "../../../utils/addDay";

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
    skill: [{ id: number; name: string }];
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

export const GeneralProfileCard = ({ generalData }: generalDataType) => {
  const newDate = generalData?.birth?.substring(0, 10);

  const [skills, setSkills] = useState<{ id: number; name: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [countries, setCountries] = useState(country.data);
  const [SelectedCountries, setSelectedCountries] = useState<any>("");
  const [cities, setCities] = useState<any>([]);
  const [SelectedCities, setSelectedCities] = useState("");
  const [skillCategory, setSkillCategory] = useState([]);
  const [BirDay, setBirDay] = useState(new Date("01/01/1950"));

  useEffect(() => {
    if (generalData.country) {
      const index = countries.findIndex(
        (country) => country.country === generalData.country
      );
      if (index) {
        const citiesss = countries[index].cities;
        setCities(citiesss);
      }
    }
  }, []);
  // const { isLoading } = useQuery(
  //   ["Countries"],
  //   () => axios.get("https://countriesnow.space/api/v0.1/countries"),
  //   {
  //     keepPreviousData: true,
  //     staleTime: 60000,
  //     onSuccess: (resdata) => setCountries(resdata.data.data as any),
  //   }
  // );

  const { error } = useQuery(
    ["skill_category"],
    () => ApiService.getData({ url: `skills/fetch` }),
    {
      keepPreviousData: true,
      staleTime: 60000,
      onSuccess: (res) => setSkillCategory(res),
    }
  );

  // useEffect(() => {
  //   async function fetchSkill() {
  //     const response = await ApiService.getData({ url: `skills/fetch` });
  //     setSkillCategory(response);
  //   }
  //   fetchSkill();
  // }, []);

  useEffect(() => {
    if (generalData?.skill) {
      setSkills(generalData?.skill);
    }
  }, [generalData?.skill]);

  useEffect(() => {
    if (SelectedCountries) {
      const selected = countries.find(
        (cat) => cat.country === SelectedCountries
      );
      // setCities(selected.cities);
    } else {
      setCities([]);
    }
  }, [SelectedCountries]);

  async function handleInputKeyPress(inputValue: any) {
    if (inputValue.length === undefined) {
      const skillsId = skills.map((skill) => skill.id);

      try {
        const url: string = `user-profile/${generalData?.id}`;
        const response = await ApiService.patchData({
          url,
          data: { skill: [...skillsId, inputValue] },
        });
        setSkills(response.data.skill);
      } catch (err: any) {
        notify.error(err.response.data.message);
      }
    }
  }

  async function handleSubmit(values: any, { setSubmitting }: any) {
    const general: any = {
      firstName: values.firstName,
      lastName: values.lastName,
      aboutMe: values.aboutMe,
      profession: values.profession,
      rate: values.rate,
      country: values.country,
      city: values.city,
      birth: BirDay,
    };
    try {
      const url: string = `user-profile/${generalData?.id}`;
      const response = await ApiService.patchData({ url, data: general });
      notify.success("Successful!");
    } catch (err: any) {
      notify.error(err.response.data.message);
    }
    setSubmitting(false);
  }

  async function handleSkillRemove(skill: string) {
    const remSkill = skills.filter((s) => s.name !== skill);
    const remId = remSkill.map((skill) => skill.id);
    try {
      const url: string = `user-profile/${generalData?.id}`;
      const response = await ApiService.patchData({
        url,
        data: { skill: remId },
      });
      setSkills(response.data.skill);
    } catch (err: any) {
      notify.error(err.response.data.message);
    }
  }
  const baseStyle =
    "w-full py-4 px-8 m-2 rounded-3xl bg-neutral-100 outline-blue-600 text-neutral-900 font-semibold";

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
          country: `${generalData?.country}`,
          city: `${generalData?.city}`,
          dob: `${newDate}`,
        }}
        validationSchema={CreateProfileValidataion}
        onSubmit={(values, helpers) => handleSubmit(values, helpers)}
      >
        {({ handleChange, setFieldValue }) => (
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
              <div className="w-full m-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="text-lg font-bold">First Name</label>
                </div>
                <FormikInputForm
                  className={`${baseStyle}`}
                  type="text"
                  name="firstName"
                  id="firstName-input"
                  onChange={handleChange}
                  placeholder="Enter First Name"
                />
              </div>
              <div className="w-full m-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="text-lg font-bold">last Name</label>
                </div>
                <FormikInputForm
                  className={`${baseStyle}`}
                  name="lastName"
                  id="lastName-input"
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </div>
            </div>
            <InputContainer title="About Me" desc="Max 1000">
              <FormikTextAreaForm
                className={`${baseStyle} min-h-[12rem]`}
                name="aboutMe"
                id="aboutme-input"
                onChange={handleChange}
                placeholder="About me"
              />
            </InputContainer>
            <div className="grid md:grid-cols-2 justify-between">
              <div className="w-full m-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="text-lg font-bold">Profession</label>
                </div>
                <FormikInputForm
                  className={`${baseStyle}`}
                  name="profession"
                  id="profession-input"
                  onChange={handleChange}
                  placeholder="Enter Profession"
                />
              </div>
              <div className="w-full m-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="text-lg font-bold">Rate</label>
                </div>
                <FormikInputForm
                  className={`${baseStyle}`}
                  name="rate"
                  id="rate-input"
                  onChange={handleChange}
                  placeholder="Rate"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 justify-between">
              <div className="w-full m-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="text-lg font-bold">Country</label>
                </div>
                <Field
                  as="select"
                  className={`${baseStyle} appearance-none`}
                  name="country"
                  id="country-category-selector"
                  onChange={(e: any) => {
                    handleChange(e);
                    setSelectedCountries(e.target.value);
                  }}
                >
                  <option defaultValue="">{generalData?.country}</option>
                  {countries?.map((country, index) => (
                    <option key={index}>{country.country}</option>
                  ))}
                </Field>
              </div>
              <div className="w-full m-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="text-lg font-bold">City</label>
                </div>
                <Field
                  as="select"
                  className={`${baseStyle} appearance-none`}
                  name="city"
                  id="city-category-selector"
                  placeholder="Enter a city name"
                  onChange={handleChange}
                >
                  <option defaultValue="">{generalData?.city}</option>
                  {generalData.city &&
                    cities.length > 0 &&
                    cities.map((city: string) => (
                      <option
                        value={city}
                        key={city}
                        selected={generalData.city == city}
                      >
                        {city}
                      </option>
                    ))}
                </Field>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <label className="text-lg font-bold">Date Of Birth</label>
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
            <div className="flex flex-wrap gap-2 items-center">
              <label className="text-lg font-bold">Skills</label>
            </div>
            <div>
              <Downshift
                onChange={(selectedItem) => {
                  setInputValue(selectedItem ? selectedItem.name : "");
                  handleInputKeyPress(selectedItem ? selectedItem.id : "");
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
                            // value: inputValue,
                          })}
                        />
                      </div>
                    </div>
                    <ul
                      className={`w-full bg-white mt-1 shadow-md max-h-40 overflow-y-auto p-0 ${
                        !(isOpen && skillCategory.length) && "hidden"
                      }`}
                      {...getMenuProps()}
                    >
                      {isOpen
                        ? skillCategory
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
                              >
                                <span>{item.name}</span>
                              </li>
                            ))
                        : null}
                    </ul>
                  </div>
                )}
              </Downshift>

              {/* <input
                className={`${baseStyle}`}
                type="text"
                id="skills-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyUp={handleInputKeyPress}
              /> */}
              <div className="mt-5">
                {skills?.map((skill) => (
                  <div
                    key={skill.id}
                    className="inline-block bg-gray-200 text-md font-bold px-2 py-1 rounded-full mr-2 mb-2"
                  >
                    {skill.name}
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(skill.name)}
                      className="ml-2"
                    >
                      &#134;
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
