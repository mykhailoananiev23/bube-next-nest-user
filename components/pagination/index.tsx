import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const PrevNextButton = ({href, value}:any) => (
  <a
    href={href}
    className="relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
  >
    {value}
  </a>
)

const Index = ({value, href, active=false}:any) => (
  <a
    href={href}
    className={`${active ? "rounded-full bg-blue-500 text-white hover:bg-blue-700" : "text-gray-500 hover:bg-gray-50"} relative inline-flex items-center px-4 py-2 text-sm font-medium focus:z-20`}
  >
    {value}
  </a>
)

export const Pagination = () => {

  return (
    <div className="flex items-center justify-between  px-4 py-3 sm:px-6 my-4">
      <div className="flex flex-1 gap-3 justify-between sm:hidden">
        <PrevNextButton href="#" value="Previous" />
        <PrevNextButton href="#" value="Next" />
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md gap-1"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <Index href="#" value={1} active={true} />
            <Index href="#" value={2} />
            <Index href="#" value={3} />

            <span className="relative inline-flex items-center  px-4 py-2 text-sm font-medium text-gray-700">
              ...
            </span>
            <Index href="#" value={8} />
            <Index href="#" value={9} />
            <Index href="#" value={10} />
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md  px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
