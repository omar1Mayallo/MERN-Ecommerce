import React, {useState} from "react";
import {
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import {LinkContainer} from "react-router-bootstrap";
import logo from "../../assets/imgs/dark-logo.png";
import {Nav, NavLinks, IconLinks} from "./styles";
import {BsPersonFill} from "react-icons/bs";
import {TfiMenu} from "react-icons/tfi";
import {MdOutlineClose} from "react-icons/md";
import BadgedCartIcon from "../../common/components/Icons/BadgedCartIcon";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../features/user/userSlice";
import useUserCart from "../../common/hooks/cart/useUserCart";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const {userProfile} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userCart} = useUserCart();

  return (
    <header className="bg-light">
      <Container>
        <div className="navbar py-2">
          {/* Logo */}
          <LinkContainer style={{cursor: "pointer"}} to={"/"}>
            <img src={logo} alt="Logo" width={50} height={50} />
          </LinkContainer>

          {/* Navbar */}
          <Nav>
            <NavLinks isOpen={isOpen}>
              {["home", "shop", "categories"].map((el, idx) => (
                <NavItem key={idx} toggle={toggle}>
                  <NavLink
                    className={"nav-link"}
                    to={el === "home" ? "/" : `/${el}`}
                  >
                    {el}
                  </NavLink>
                </NavItem>
              ))}
              <span className="d-block d-md-none bg-light p-2 rounded-circle">
                <MdOutlineClose onClick={toggle} size={25} />
              </span>
            </NavLinks>
            <IconLinks>
              <li>
                <NavLink className={"nav-link"} to={"/cart"}>
                  <BadgedCartIcon
                    numOfItems={userCart?.cart?.cartItems?.length}
                  />
                </NavLink>
              </li>
              {!userProfile.loading &&
                (userProfile.user ? (
                  <li>
                    <UncontrolledDropdown>
                      <DropdownToggle
                        className="p-0 bg-secondary"
                        color="light"
                      >
                        <img
                          src={userProfile?.user?.image}
                          alt="user-img"
                          width={40}
                          className="rounded-circle"
                        />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => navigate("/profile")}>
                          Profile
                        </DropdownItem>
                        {userProfile.user?.role === "admin" && (
                          <>
                            <DropdownItem divider />
                            <DropdownItem
                              onClick={() => navigate("/admin/products")}
                            >
                              Dashboard
                            </DropdownItem>
                          </>
                        )}
                        <DropdownItem divider />
                        <DropdownItem onClick={() => dispatch(logout())}>
                          Logout
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </li>
                ) : (
                  <li>
                    <NavLink className={"nav-link"} to={"/login"}>
                      <BsPersonFill />
                    </NavLink>
                  </li>
                ))}

              <li
                className="d-block d-md-none bg-light p-2 rounded-circle"
                style={{cursor: "pointer"}}
                onClick={toggle}
              >
                <TfiMenu />
              </li>
            </IconLinks>
          </Nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;

function NavItem({toggle, children}) {
  return <li onClick={toggle}>{children}</li>;
}
