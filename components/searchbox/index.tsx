import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchBox() {
  return (
    <form className="flex bg-white  p-3  w-full md:w-6/12  justify-between rounded-full mb-8 mx-auto">
      <input
        type=""
        name=""
        placeholder="Search for jobs here"
        className="text-center w-full focus:outline-[#0071BC] p-2 rounded-full"
      />
      <FontAwesomeIcon
        icon={faSearch}
        className="text-black my-auto pr-4 ml-4"
      />
    </form>
  );
}
