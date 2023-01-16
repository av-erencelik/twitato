"use client";

const SearchBar = () => {
  return (
    <div className=" flex-grow flex justify-center items-center">
      <input
        type="text"
        placeholder="Explore Twitato..."
        className="border-gray-300 border-2 px-3 py-1 placeholder:text-xs focus:border-sky-600 outline-none focus:border-2 rounded-2xl lg:w-80"
      />
    </div>
  );
};

export default SearchBar;
