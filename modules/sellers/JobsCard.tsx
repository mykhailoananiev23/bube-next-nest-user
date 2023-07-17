import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface bg {
  jobs: any[];
}

export const JobsCard = ({ jobs }: bg) => {
  return (
    <div>
      <div className="mt-2 grid gap-x-6 gap-y-6 lg:grid-cols-3">
        {jobs.map((items: any) => (
          <article
            key={items.id}
            className="mt-4 w-[90%] mx-auto md:w-full drop-shadow-md bg-white rounded-md duration-300 hover:shadow-sm"
          >
            <div className="pt-3 ml-4 mr-2 mb-3">
              <div className="flex justify-between mb-4">
                <h2 className="text-[#050931] text-xl font-medium">
                  {items.category}
                </h2>
                <h4 className={"text-[#8B939A]"}>{items.date}</h4>
              </div>
              <h3 className="text-[#050931] text-2xl font-medium">
                {items.title}
              </h3>
              <h3 className="text-[#8B939A]">Job Type -{items.JobType}</h3>
              <hr className="my-4" />

              <div className="flex py-[2%]">
                <div>
                  <p className="text-[#8B939A] text-sm">Price</p>
                  <p className="text-[#050931] font-medium text-[1.2rem]">
                    ${items.budget}
                  </p>
                </div>

                <Link href={`/sellers/job`}>
                  <a className="text-[#0071BC] text-[0.95rem] font-medium my-auto ml-auto mr-0">
                    Apply Now
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="fa-solid fa-arrow-right ml-2"
                    />
                  </a>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
