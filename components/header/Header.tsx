import { GiHummingbird } from "react-icons/gi";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";

const Header = () => {
  return (
    <div className="p-5 border-b border-gray-200 flex items-center justify-between">
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
