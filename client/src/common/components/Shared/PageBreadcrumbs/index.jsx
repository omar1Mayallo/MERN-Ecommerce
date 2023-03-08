import React from "react";
import {Link} from "react-router-dom";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
const PageBreadcrumbs = ({pages}) => {
  return (
    <Breadcrumb className="mb-4 ">
      {pages.map((pg, idx) =>
        !pg.isActive ? (
          <BreadcrumbItem key={idx}>
            <Link to={pg.link}>{pg.page}</Link>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem key={idx} active>
            {pg.page}
          </BreadcrumbItem>
        )
      )}
    </Breadcrumb>
  );
};

export default PageBreadcrumbs;
