import styled from "styled-components";
import {flexCentering} from "../../../../styles/customStyles";

export const BannerCardStyled = styled.div`
  position: relative;

  .remove-icon {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: whitesmoke;
    border-radius: 100%;
    padding: 10px;

    ${flexCentering}
  }
`;
