/* eslint-disable react/no-children-prop */

import { MainBody } from "../../components/mainbody";
import { CGeneralProfileCard } from "../../modules/sellers/create-profile/cGeneralProfileCard";
import ApiService from "../../services/ApiService";
import { useState, useEffect, ReactElement } from "react";
import axios from "axios";
import { AccountLayout } from "../../components/layout/AccountLayout";
import { NextPageWithLayout } from "../_app";
import { Loading } from "../../components/loading/loading";
import { useSession } from "next-auth/react";
import { getCookie } from "cookies-next";

const CreateProfile:NextPageWithLayout = () => {
  const userId = Number(getCookie("NewUserId"))
  const [country, setCountry] = useState(null);
  const [UserInfo, setUserInfo] = useState<any>();
  const [IsLoading, setIsLoading] = useState(true);
  
  const getUserInfo = async () => {
    const res = await ApiService.getData({url: `users/getById/${userId}`})
    setUserInfo(res)
    res && setIsLoading(false)
  }

  useEffect(() => {
    getUserInfo()
  }, []);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v2/alpha/US`);
        setCountry(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // window.navigator.geolocation.getCurrentPosition((position) => {
    //   console.log(position.coords.latitude, position.coords.longitude);
    //   fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`)
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log(data);
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // })

    fetchCountry();
  }, []);

  if (IsLoading) {
    return <Loading title="Loading... create-profile" />;
  }

  const userProfileData = {
    id: userId,
    user: { firstName: UserInfo.firstName, lastName: UserInfo.lastName },
    aboutMe: "",
    profession: "",
    country: "country",
    rate: "",
    city: "",
    birth: "",
  };

  const mainChildren = userProfileData && (
    <main className="flex justify-center">
      <div className="container w-full py-16 px-6">
        <CGeneralProfileCard generalData={userProfileData} />
      </div>
    </main>
  );

  return <MainBody children={mainChildren} />;
}

CreateProfile.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default CreateProfile;