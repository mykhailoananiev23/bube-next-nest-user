import type { NextPage } from "next";

import {Hero} from "../modules/index/Hero";
import {Explore} from "../modules/index/Explore";
import {LatestJobs} from "../modules/index/LatestJobs";
import {Freelancers} from "../modules/index/Freelancers";
import {KeyFeatures} from "../modules/index/KeyFeatures";
import {Download} from "../modules/index/Download";
import {GetRide} from "../modules/index/GetRide";
import {RidingFeatures} from "../modules/index/RidingFeatures";
import {StoriesAndIdeas} from "../modules/index/StoriesAndIdeas";
import {PremiumFeatures} from "../modules/index/PremiumFeatures";
import {Application} from "../modules/index/Application";
import {DownloadApp} from "../modules/index/DownloadApp";

import {MainFooter} from "../components/footer/MainFooter";
import {MainHeader} from "../components/header/MainHeader";
import { useEffect } from "react";
import DropdownComponent from "../modules/others/dropdown";

const Home: NextPage = () => {

  return (
    <div className="bg-[#EBEBEB] max-w-full overflow-x-hidden">
      <MainHeader />
      <Hero />
      <Explore />
      <LatestJobs />
      <Freelancers />
      <KeyFeatures />
      <Download />
      <GetRide />
      <RidingFeatures />
      <StoriesAndIdeas />
      <PremiumFeatures />
      <Application />
      <DownloadApp />
      <MainFooter />
    </div>
  );
};

export default Home;
