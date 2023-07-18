import { gigs, skills, user, workExperience } from "../../hooks/data";
import gigsImage from "../../public/images/gigsImage.svg";
import { Tab, Tabs } from "../../components/tabs";
import { AccountLayout } from "../../components/layout/AccountLayout";
import profileSeller from "../../public/images/profileSeller.svg";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { SellerProfileCard } from "../../modules/sellers/SellerProfileCard";
import { SellerSkillsCard } from "../../modules/sellers/SellerSkillsCard";
import { SellerWorkExperience } from "../../modules/sellers/SellerWorkExperience";
import {
  MinifiedGigCard,
  NewGigCard,
} from "../../modules/sellers/MinifiedGigCard";
import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getCookie } from "cookies-next";

const GigsList: NextPageWithLayout = () => {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const { data: userData, isLoading } = useQuery(
    ["user", userEmail],
    () => ApiService.getData({ url: `users/${userEmail}` }),
    { keepPreviousData: true, staleTime: 60000, enabled: !!userEmail }
  );

  const userId = Number(getCookie("NewUserId"));

  const { data: gigsData } = useQuery(
    ["gig", userId],
    () => ApiService.getData({ url: `gigs/fetch?userId=${userId}` }),
    { keepPreviousData: true, staleTime: 60000, enabled: !!userId }
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  async function currentTab(message: string) {
    console.log(message);
  }

  return (
    <>
      <div className="bg-bgcolor h-full-screen text-[#8B939A]">
        <div className="grid grid-cols-4 p-10 gap-4">
          <div className="">
            <SellerProfileCard
              img={profileSeller}
              firstName={userData?.firstName}
              lastName={userData?.lastName}
              service={user.service}
              createdAt={user.createdAt}
              user={user}
              connects={71}
              plan={user.plan}
            />
            <SellerSkillsCard skills={skills} />
            <SellerWorkExperience workExperience={workExperience} />
          </div>
          <div className="col-span-3">
            <Tabs currentTab={currentTab}>
              <Tab title="Active Gigs">
                <section className="mt-12  px-4 max-w-5xl lg:px-8">
                  <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {gigsData?.data?.map((gig: any) => (
                      <MinifiedGigCard
                        key={gig.id}
                        title={gig.title}
                        img={gigsImage}
                        price={gig.price}
                      />
                    ))}
                    <NewGigCard />
                  </div>
                </section>
              </Tab>
              <Tab title="Certifications">
                <h3>Certifications</h3>
              </Tab>

              <Tab title="Portfolio">
                <h3>Portfolio</h3>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

GigsList.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default GigsList;
