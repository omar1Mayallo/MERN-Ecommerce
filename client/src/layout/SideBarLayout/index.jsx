import React from "react";
import {Col, Container, Row} from "reactstrap";
import {CgProfile} from "react-icons/cg";
import {AiFillHeart} from "react-icons/ai";
import {FaBoxes} from "react-icons/fa";
import {FiLogOut} from "react-icons/fi";
import SidebarLink from "../../common/components/Shared/SidebarLink";
import {useDispatch} from "react-redux";
import {logout} from "../../features/user/userSlice";
import Sidebar from "../../common/components/Shared/Sidebar";

const SideBarLayout = ({children}) => {
  const dispatch = useDispatch();
  return (
    <Container className="py-4">
      <Row className="position-relative">
        <Col lg={1} md={2} xs={2}>
          <Sidebar>
            <SidebarLink
              Icon={CgProfile}
              name={"Profile"}
              linkUrl={"/profile"}
            />
            <SidebarLink Icon={FaBoxes} name={"Orders"} linkUrl={"/orders"} />
            <SidebarLink
              Icon={AiFillHeart}
              name={"Wishlist"}
              linkUrl={"/wishlist"}
            />
            <SidebarLink
              Icon={FiLogOut}
              name={"Logout"}
              handleClick={() => dispatch(logout())}
            />
          </Sidebar>
        </Col>
        <Col lg={11} md={10} xs={10} className="bg-light p-3 rounded">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default SideBarLayout;
