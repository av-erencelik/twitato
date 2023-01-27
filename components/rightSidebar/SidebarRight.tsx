import Notifications from "./Notifications";
import Trends from "./Trends";

const SidebarRight = () => {
  return (
    <div className="p-5 border-r border-gray-200 md:w-72 md:block hidden overflow-auto sticky top-[6.5%] h-[40rem] min-h-[200px]">
      {/* @ts-expect-error Server Component */}
      <Notifications />
      {/* @ts-expect-error Server Component */}
      <Trends />
    </div>
  );
};

export default SidebarRight;
