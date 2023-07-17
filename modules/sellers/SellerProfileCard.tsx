import { MapPinIcon, UserIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

export const SellerProfileCard = ({img, firstName, lastName, service, user, createdAt, connects, plan}:any) => (
    <article className="  bg-white my-4  sm:pl-0   max-w-2xl w-full rounded-lg drop-shadow-md">
        <div className="pt-8 w-full flex justify-center">
            <Image
                src={img}
                alt="Seller Profile Pic"
                className="rounded-full "
            />
        </div>
        <div className="text-center mt-6 p-2">
            <h2 className="text-[#050931]">{`${firstName} ${lastName}`}</h2>
            <h3 className="">{service}</h3>
        </div>
        <ul className="flex justify-center">
        <li>
            <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="star"
            className="w-4 text-yellow-500 mr-1"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            >
            <path
                fill="currentColor"
                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
            ></path>
            </svg>
        </li>
        <li>
            <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="star"
            className="w-4 text-yellow-500 mr-1"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            >
            <path
                fill="currentColor"
                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
            ></path>
            </svg>
        </li>
        <li>
            <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="star"
            className="w-4 text-yellow-500 mr-1"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            >
            <path
                fill="currentColor"
                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
            ></path>
            </svg>
        </li>
        <li>
            <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="star"
            className="w-4 text-yellow-500 mr-1"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            >
            <path
                fill="currentColor"
                d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
            ></path>
            </svg>
        </li>
        <li>
            <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="star"
            className="w-4 text-yellow-500"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            >
            <path
                fill="currentColor"
                d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
            ></path>
            </svg>
        </li>
        </ul>
        <div className="flex justify-center w-full mt-5">
        <Link href="/sellers/edit-profile">
            <button className="text-primary rounded-full px-8 py-2 border border-primary">
                Edit Profile
            </button>
        </Link>
        </div>

        <hr className="my-8" />
        <div className="flex justify-between m-8 text-xl">
        <h2 className="flex">
            <MapPinIcon className="h-6 w-7 mr-2" aria-hidden="true" />
            From
        </h2>
        <h2 className="text-darkText">{user.country}</h2>
        </div>

        <div className="flex justify-between m-8 text-xl">
        <h2 className="flex">
            <UserIcon className="h-6 w-7 mr-2" aria-hidden="true" />
            Member Since
        </h2>
        <h2 className="text-darkText">{createdAt}</h2>
        </div>
        <hr className="my-8" />
        <h1 className="text-primary ml-8">{connects} Connects Available</h1>
        <div className="flex justify-between mx-8 py-10 text-xl">
        <h2>
            Plan: <span className="text-darkText">{plan}</span>
        </h2>
        <Link href="./plan">
            <button className="rounded-full border text-primary border-primary px-8 py-2">
                Upgrade
            </button>
        </Link>
        </div>
    </article>
)