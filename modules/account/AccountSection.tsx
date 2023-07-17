import { useState } from "react";
import AccountForm from "./AccountForm";
import PaymentMethodsForm from "./PaymentMethodsForm";
import SecurityForm from "./SecurityForm";
import Sidebar from "./Sidebar";

export default function AccountSection() {
  const [currentOption, setCurrentOption] = useState("account");

  const AccountLayout = ({ children }: any) => (
    <main className="bg-gray-100 flex justify-center px-6 py-20">
      <div className="flex flex-col items-center max-w-7xl w-full gap-8 md:flex-row md:items-start">
        <Sidebar
          currentOption={currentOption}
          setCurrentOption={setCurrentOption}
        />
        {children}
      </div>
    </main>
  );

  switch (currentOption) {
    case "account":
      return (
        <AccountLayout>
          <AccountForm />
        </AccountLayout>
      );
    case "security":
      return (
        <AccountLayout>
          <SecurityForm />
        </AccountLayout>
      );
    case "payment-methods":
      return (
        <AccountLayout>
          <PaymentMethodsForm />
        </AccountLayout>
      );
    default:
      return <div>No matching case found</div>;
  }
}
