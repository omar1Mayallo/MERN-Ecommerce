import React from "react";
import {Collapse} from "reactstrap";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";

const CollapseItem = ({head, toggle, isOpen, children}) => {
  return (
    <div className="Collapse-Item">
      <div
        className="d-flex align-items-center justify-content-between py-3 px-1"
        onClick={toggle}
        style={{cursor: "pointer"}}
      >
        <h5 className="m-0">{head}</h5>
        <MdOutlineKeyboardArrowDown
          size={25}
          style={{
            transition: "all 0.5s",
            transform: isOpen && "rotate(180deg)",
          }}
        />
      </div>
      <Collapse isOpen={isOpen}>{children}</Collapse>
    </div>
  );
};

export default CollapseItem;
