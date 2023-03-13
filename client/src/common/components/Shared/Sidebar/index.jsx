import React from "react";

const Sidebar = ({children}) => {
  return (
    <aside className="bg-light rounded d-flex flex-column gap-2 p-2 position-sticky top-0 start-0">
      {children}
    </aside>
  );
};

export default Sidebar;
