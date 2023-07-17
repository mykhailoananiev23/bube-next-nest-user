import { useField } from "formik";
import { InputProps } from "../../interface";

export const Input = ({ label, ...props }: InputProps): JSX.Element => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label className="block my-2 text-sm text-black font-bold ">
        {label}
      </label>
      <input
        {...field}
        {...props}
        className=" text-gray-900 text-sm px-3 rounded-full bg-input-color bg-[#F6F6F9]
           block w-full p-3 my-1 text-black focus:outline-[#0071BC]"
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 mb-4 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};
