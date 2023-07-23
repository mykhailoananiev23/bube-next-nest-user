import { AccountHeader } from "../header/AccountHeader";
import { MainFooter } from "../footer/MainFooter";
import { LayoutProps } from "../../interface";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Loading } from "../loading/loading";
import { getCookie, setCookie, setCookies } from "cookies-next";
import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export async function getInitialProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  } else {
    const { user } = session;
    if (user?.id === "" || user?.email === "") {
      return {
        redirect: {
          destination: "/account/login",
          permanent: false,
        },
      };
    }
  }

  return {
    props: { session },
  };
}

export const AccountLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [IsLoading, setIsLoading] = useState(false);
  const oldUserId = Number(getCookie("userID"));
  const oldProfileId = Number(getCookie("profileId"));
  const NewUserId = Number(getCookie("NewUserId"));

  const getNewUserId = async (session: any) => {
    if (session?.user?.email && router.pathname === "/buyers") {
      if (oldUserId !== NewUserId) {
        setIsLoading(true);
        const UserInfo = await ApiService.getData({
          url: `/users/${session.user.email}`,
        });
        const newUserId = UserInfo.id;
        if (newUserId === oldUserId) {
          setIsLoading(false);
          return null;
        } else {
          setCookie("userID", newUserId, {
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          });
          setCookie("NewUserId", newUserId, {
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          });
          return newUserId;
        }
      }
    }
    return null;
  };

  const getProfileId = async (id: number) => {
    if (router.pathname !== "/account/create-profile") {
      if (
        router.asPath.startsWith("/sellers") &&
        (!oldProfileId || id !== oldProfileId)
      ) {
        const res = await ApiService.getData({
          url: `user-profile/fetch?userId=${id}`,
        });
        const newProfileId = res?.data?.[0]?.user?.id;
        if (id !== newProfileId) {
          setIsLoading(false);
          router.push("/account/create-profile");
        } else {
          setCookie("userID", newProfileId, {
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          });
          setIsLoading(false);
        }
      }
    }
  };

  const [NewPath, setNewPath] = useState<any>();
  const [OldPath, setOldPath] = useState();

  useEffect(() => {
    if (NewPath !== OldPath) {
      getNewUserId(session);
      getProfileId(NewUserId);
    }
  }, [session, NewPath]);

  useEffect(() => {
    setOldPath(NewPath);
    setNewPath(router.pathname);
  }, [router.pathname]);

  if (status === "unauthenticated") {
    router.push("/account/login");
  }

  if (status === "authenticated") {
    return (
      <div className="bg-[#F6F7FB] max-w-full overflow-x-hidden">
        <ToastContainer />
        <AccountHeader />
        {children}
        {!router.pathname.startsWith("/inbox") &&
          !router.pathname.startsWith("/support") && <MainFooter />}
      </div>
    );
  }

  return <Loading title="IsLoading..." />;
};
