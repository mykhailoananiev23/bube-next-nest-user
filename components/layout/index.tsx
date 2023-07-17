import { SecondaryHeader } from "../header/SecondaryHeader";
import { SecondaryFooter } from "../footer/SecondaryFooter";

interface AccountProps {
  children: JSX.Element;
}

export const Layout = ({ children }: AccountProps) => {
  return (
    <>
      <SecondaryHeader />

      {children}
      <footer className="bg-white">
        <div className="lg:flex"></div>
        <div className="border-[#0000001a] border-l-0 border-r-0 border-b-0"></div>
        <SecondaryFooter />
      </footer>
    </>
  );
};
