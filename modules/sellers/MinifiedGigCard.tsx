import { PlusCircleIcon } from "@heroicons/react/20/solid"
import Image from "next/image"
import Link from "next/link"

export const NewGigCard = () => (
    <div
        className="max-w-md mx-auto mt-4  border-dashed border-2 border-[#8B939A] bg-white w-full flex justify-center items-center rounded-md duration-300 hover:shadow-sm"
        key="xy"
    >
        <div className="flex-col text-center">
            <Link href="/sellers/create-gig">
                <button>
                    <PlusCircleIcon
                    className="h-30 w-30"
                    aria-hidden="true"
                    />
                    <h1 className="text-darkText mt-4 text-lg">
                    Create A New Gig
                    </h1>
                </button>
            </Link>
        </div>
    </div>
)

export const MinifiedGigCard = ({img, title, price}:any) => {
    return (
        <article
            className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
        >
            <Image
                src={img}
                loading="lazy"
                alt={title}
                className="w-full h-48 rounded-t-md"
            />
            <div className="flex items-center mt-2 pt-3 ml-4 mr-2"></div>
                <div className="pt-3 ml-4 mr-2 mb-3">
                <h3 className="text-xl text-gray-900">{title}</h3>
                <div className="flex justify-between">
                    <p className="text-gray-400 text-sm mt-1">
                    Starting At
                    </p>
                    <Link href="#">
                        <a className="mr-4">...</a>
                    </Link>
                </div>
                <h1 className="text-darkText text-2xl">{`$ ${price}`}</h1>
            </div>
        </article>
    )
}