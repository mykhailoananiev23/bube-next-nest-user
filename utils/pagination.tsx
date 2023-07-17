import Pagination from "react-paginate";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const MyPagination = ({
  pageCount,
  handlePageChange,
}: {
  pageCount: number;
  handlePageChange: (page: any) => void;
}) => {
  return (
    <Pagination
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={handlePageChange}
      containerClassName={
        "flex items-center justify-center text-sm font-medium text-gray-500 mb-5"
      }
      nextLabel={<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />}
      previousLabel={<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />}
      activeClassName={
        "rounded-2xl border border-primary-500 bg-primary text-white"
      }
      pageClassName={"relative inline-flex items-center px-4 py-2 focus:z-20"}
    />
  );
};

export default MyPagination;
