import { AccountIcon, SecurityIcon, PaymentMethodsIcon } from "./Icons";

const sidebarOptions = [
  { state: "account", text: "Account", icon: AccountIcon },
  { state: "security", text: "Security", icon: SecurityIcon },
  {
    state: "payment-methods",
    text: "Payment Methods",
    icon: PaymentMethodsIcon,
  },
];

export default function Sidebar({ currentOption, setCurrentOption }: any) {
  return (
    <aside className="w-full bg-white h-max flex flex-col py-2 rounded-2xl max-w-sm sm:max-w-md md:w-[33%] md:max-w-md">
      {sidebarOptions.map((option, i) => (
        <button
          key={option.state}
          className={`flex justify-start items-center align-center p-4 pl-8 border-gray-200 w-full font-bold text-lg ${
            i === sidebarOptions.length - 1 ? "" : "border-b-[1px]"
          } ${
            currentOption === option.state ? "text-primary" : "text-neutral-600"
          }`}
          onClick={() =>
            currentOption === option.state ? {} : setCurrentOption(option.state)
          }
        >
          <span className="w-8 flex">
            <option.icon />
          </span>
          <span>{option.text}</span>
        </button>
      ))}
    </aside>
  );
}
