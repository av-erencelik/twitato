import Menu from "./Menu";

const Sidebar = () => {
  return (
    <div className="p-5 border-r border-gray-200 xl:w-72 sm:block hidden overflow-auto sticky top-[6.5%] w-[95px] h-80 min-h-[200px]">
      {" "}
      <Menu />
    </div>
  );
};

export default Sidebar;
