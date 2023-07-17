import { InputHTMLAttributes } from "react";
import { useField } from "formik";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  name: string;
}

export default function Checkbox({ label, ...props }: InputProps): JSX.Element {
  const [field] = useField(props);

  return (
    <div>
      <div className="flex items-center">
        <input
          {...field}
          {...props}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label className="ml-2 block text-gray-900 font-medium">{label}</label>
      </div>
    </div>
  );
}
