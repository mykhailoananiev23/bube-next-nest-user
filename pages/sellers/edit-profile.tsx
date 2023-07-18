/* eslint-disable react/no-children-prop */
import { MainFooter } from "../../components/footer/MainFooter";
import { AccountHeader } from "../../components/header/AccountHeader";
import { MainBody } from "../../components/mainbody";
import { GeneralProfileCard } from "../../modules/sellers/edit-profile/GeneralProfileCard";
import { SocialProfileCard } from "../../modules/sellers/edit-profile/SocialProfileCard";
import ExperienceProfileCard from "../../modules/sellers/edit-profile/ExperienceProfileCard";
import { PortfolioProfileCard } from "../../modules/sellers/edit-profile/PortfolioProfileCard";
import { getSession, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import ApiService from "../../services/ApiService";
import { ReactElement, useState } from "react";
import Loader from "../../components/Loaders/jobs";
import { GetServerSidePropsContext } from 'next';
import { Session } from "../../types/session";
import { Loading } from "../../components/loading/loading";
import { NextPageWithLayout } from "../_app";
import { AccountLayout } from "../../components/layout/AccountLayout";
import { getCookie } from "cookies-next";

const Editprofile: NextPageWithLayout= () => {
  const userId = Number(getCookie("NewUserId"))

  const { data: userProfileData } = useQuery(
    ["profile", userId],
    () => ApiService.getData({ url: `user-profile/fetch?userId=${userId}` }),
    { keepPreviousData: true, staleTime: 60000, enabled: !!userId }
  );

  const mainChildren = userProfileData && (
    <main className="flex justify-center">
      <div className="container w-full py-16 px-6">
        <GeneralProfileCard generalData={userProfileData?.data[0]} />
        <SocialProfileCard socialData={ userProfileData?.data[0]?.socialMediaLinks} profileId={userProfileData?.data[0]?.id} />
        <ExperienceProfileCard experienceData={ userProfileData?.data[0]?.experience} profileId={ userProfileData?.data[0]?.id} />
        <PortfolioProfileCard portfolioData={ userProfileData?.data[0]?.portfolio} profileId={ userProfileData?.data[0]?.id } />
      </div>
    </main>
  );

  return <MainBody children={mainChildren} />;
}

Editprofile.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default Editprofile;