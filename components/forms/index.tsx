import { Formik, Form, useField, Field } from "formik";

import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const people = [{ name: "Select Skills" }];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const style = {
  error: "text-[#000000] ",
};

export const FormikInputForm = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Field {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-[#ff3535] px-[20px]">{meta.error}</div>
      ) : null}
    </>
  );
};
export const FormikSelectForm = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Field {...field} {...props}></Field>
      {meta.touched && meta.error ? (
        <div className="error text-[#ff3535] px-[20px]">{meta.error}</div>
      ) : null}
    </>
  );
};

// export const FormikSelectForm = ({ label, ...props }: any) => {
//   const [selected, setSelected] = useState<any>(props.defaultValue);
//   const [field, meta] = useField(props);

//   useEffect(() => {
//     setSelected(props.defaultValue);
//   },[])

//   return (
//     <>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <Listbox value={selected} onChange={setSelected}>
//         <div className="relative mt-1">
//           <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
//             <span className="block truncate">{selected[props.chldVal]}</span>
//             <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//               <ChevronUpDownIcon
//                 className="h-5 w-5 text-gray-400"
//                 aria-hidden="true"
//               />
//             </span>
//           </Listbox.Button>
//           <Transition
//             as={Fragment}
//             leave="transition ease-in duration-100"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//               {props.data?.map((person: any, personIdx: number) => (
//                 <Listbox.Option
//                   key={personIdx}
//                   className={({ active }) =>
//                     `relative cursor-default select-none py-2 pl-10 pr-4 ${
//                       active ? "bg-amber-100 text-amber-900" : "text-gray-900"
//                     }`
//                   }
//                   value={person}
//                 >
//                   {({ selected }) => (
//                     <>
//                       <span
//                         className={`block truncate ${
//                           selected ? "font-medium" : "font-normal"
//                         }`}
//                       >
//                         {person[props.chldVal]}
//                       </span>
//                       {selected ? (
//                         <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
//                           <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                         </span>
//                       ) : null}
//                     </>
//                   )}
//                 </Listbox.Option>
//               ))}
//             </Listbox.Options>
//           </Transition>
//         </div>
//       </Listbox>
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </>
//   );
// };

export const FormikTextAreaForm = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-[#ff3535] px-[20px]">{meta.error}</div>
      ) : null}
    </>
  );
};

export const FormCheckBox = ({ children, ...props }: any) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <Field {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error text-[#ff3535] px-[20px]">{meta.error}</div>
      ) : null}
    </>
  );
};

export const FormikInputList = ({ children, ...props }: any) => {};
