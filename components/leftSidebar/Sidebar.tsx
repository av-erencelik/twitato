import Menu from "./Menu";

const Sidebar = () => {
  return (
    <div className="p-5 border-r border-gray-200 lg:w-72 sm:block hidden">
      {" "}
      <Menu />
    </div>
  );
};

export default Sidebar;
