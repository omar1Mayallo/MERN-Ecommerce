import styled from "styled-components";
import {flexCentering} from "../../../../styles/customStyles";

export const OverlayLoaderStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  ${flexCentering}
  display:  ${(props) => !props.active && "none"};
`;
