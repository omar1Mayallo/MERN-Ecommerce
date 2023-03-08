import styled from "styled-components";
import {flexCentering} from "../../styles/customStyles";

export const Nav = styled.nav`
  ${flexCentering}
  gap: 20px;
  svg {
    font-size: 24px;
  }
`;

export const NavLinks = styled.ul`
  ${flexCentering}
  gap: 20px;
  @media (max-width: 767px) {
    display: ${(props) => (props.isOpen ? `flex` : `none`)};
    position: fixed;
    top: 25px;
    bottom: 25px;
    left: 25px;
    right: 25px;
    background-color: white;
    color: black;
    box-shadow: 20px 20px 10px 100px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    flex-direction: column;
    gap: 30px;
    z-index: 9999;
  }
  span {
    position: absolute;
    top: 20px;
    right: 20px;
    color: gray;
  }
`;

export const IconLinks = styled.ul`
  ${flexCentering}
  gap: 20px;
`;
