import React from "react";
import {LinkContainer} from "react-router-bootstrap";
import {UncontrolledTooltip} from "reactstrap";

import {SidebarLinkStyled} from "./styles";

const SidebarLink = ({Icon, name, linkUrl, handleClick}) => {
  const SLink = (
    <SidebarLinkStyled
      id={`UncontrolledTooltip-${name}`}
      onClick={handleClick ? handleClick : null}
    >
      <span className="sidebar-link-icon">
        <Icon size={21} />
      </span>
      <UncontrolledTooltip
        className="sidebar-link-tooltip"
        placement="right"
        target={`UncontrolledTooltip-${name}`}
      >
        {name}
      </UncontrolledTooltip>
      {/* <span className="sidebar-link-text">{name}</span> */}
    </SidebarLinkStyled>
  );
  return linkUrl ? (
    <LinkContainer to={linkUrl} style={{cursor: "pointer"}}>
      {SLink}
    </LinkContainer>
  ) : (
    <>{SLink}</>
  );
};

export default SidebarLink;
