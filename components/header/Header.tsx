import { GiHummingbird } from "react-icons/gi";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";

const Header = () => {
  return (
    <div className="py-3 px-5 border-b border-gray-200 flex items-center justify-between sticky top-0 z-50 bg-white opacity-95">
      <div className="flex font-bold text-4xl items-center gap-2 text-sky-600">
        <GiHummingbird />
        <h1 className="hidden lg:block">Twitato</h1>
      </div>
      <SearchBar />
      <UserProfile />
    </div>
  );
};

export default Header;
