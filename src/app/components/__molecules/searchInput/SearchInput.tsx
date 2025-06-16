import { Search } from "../../__atoms";

const SearchInput = () => {
  return (
    <div className="w-full border border-[#E8ECEF] rounded-md py-3 px-4 flex items-center gap-2">
      <div className="w-6 h-6">
        <Search hidden={false} />
      </div>
      <input type="text" placeholder="Search" className="outline-none" />
    </div>
  );
};

export default SearchInput;
