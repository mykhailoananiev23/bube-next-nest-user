import { ReactElement, useEffect, useState } from "react";
import { AccountLayout } from "../../components/layout/AccountLayout";
import { NextPageWithLayout } from "../_app";
import { CategoriesMenu } from "../../modules/buyers/CategoriesMenu";
import { GigSection } from "../../modules/buyers/GigSection";
import HeroSection from "../../modules/buyers/heroSection";
import { useLocalStorage } from "../../components/localstorage/uselocalstorage";
import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { useSession } from "next-auth/react";
import { Loading } from "../../components/loading/loading";
import { getCookie, setCookie } from "cookies-next";

const Gigs: NextPageWithLayout = () => {
  const [UserData, setUserData] = useState<any>({firstName: ""});
  const [IsLoading, setIsLoading] = useState(true);
  const {data: session} = useSession();
  const userEmail = session?.user?.email

  const { data: userData, isLoading } = useQuery(
    ["user", userEmail],
    () => ApiService.getData({ url: `users/${userEmail}` }),
    {
      keepPreviousData: true,
      staleTime: 60000,
      enabled: !!userEmail,
    }
  );
  const getUserInfo = async (id: number) => {
    const res = await ApiService.getData({ url: `users/getById/${id}` })
    setCookie("UserInfo", JSON.stringify(res))
    setUserData(res)
    res && setIsLoading(false)
  }

  useEffect(() => {
    const userId = Number(getCookie("NewUserId"))
    getUserInfo(userId)
  }, []);
  
  if (IsLoading) {
    return  <Loading title="Loading... buyers" />
  }

  return (
    <main>
      <ToastContainer />
      <CategoriesMenu />
      {UserData && <HeroSection user={UserData.firstName} />}
      <GigSection />
    </main>
  );
};

Gigs.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default Gigs;