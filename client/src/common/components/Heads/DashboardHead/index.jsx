import React from "react";
import {RiAddCircleLine} from "react-icons/ri";
import {Spinner} from "reactstrap";

const DashboardHead = ({head, loading, toggleCreateModal}) => {
  return (
    <div className="dashboard-head d-flex align-items-center justify-content-between mb-4">
      <h4 className="mb-0 d-flex align-items-center">
        <span>{head}</span>
        {loading && <Spinner size={"sm"} className="ms-2" />}
      </h4>
      {toggleCreateModal && (
        <RiAddCircleLine onClick={toggleCreateModal} size={40} />
      )}
    </div>
  );
};

export default DashboardHead;
