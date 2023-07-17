import {MainHeader} from "../header/MainHeader";
import {MainFooter} from "../footer/MainFooter";
import { LayoutProps } from "../../interface";

export const LandingLayout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-[#F6F7FB] max-w-full overflow-x-hidden">
      <MainHeader />
      {children}
      <MainFooter />
    </div>
  );
}