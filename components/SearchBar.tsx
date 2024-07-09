import { GoLocation } from "react-icons/go";
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar() {
  return (
    <div className="flex justify-between items-center bg-white rounded-full shadow-lg overflow-hidden w-full max-w-3xl">
      <div className="flex items-center px-4">
        <AiOutlineSearch className="text-luxtix-1 size-6" />
      </div>
      <input
        type="text"
        className="flex-grow py-3 px-4 text-luxtix-1 placeholder-zinc-400 focus:outline-none"
        placeholder="Search Events, Categories, ..."
      />
      <div className="flex flex-center text-luxtix-1">
        <GoLocation />
        <input
          type="text"
          className="flex-1 py-3 px-4 text-luxtix-1 placeholder-zinc-400 border-none focus:outline-none"
          placeholder="City"
        />
      </div>
    </div>
  );
}

export default SearchBar;
