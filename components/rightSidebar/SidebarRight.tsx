import Notifications from "./Notifications";

const SidebarRight = () => {
  return (
    <div className="p-5 border-r border-gray-200 xl:w-72 sm:block hidden overflow-auto sticky top-[6.5%] w-[95px] h-[40rem] min-h-[200px]">
      {/* @ts-expect-error Server Component */}
      <Notifications />
    </div>
  );
};

export default SidebarRight;
