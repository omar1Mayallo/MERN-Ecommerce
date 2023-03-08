import styled from "styled-components";

export const CenterHeadStyled = styled.h2`
  font-size: 24px;
  font-family: "Roboto", Arial, sans-serif;
  font-weight: 400;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
  line-height: 1.5;
  color: #000;
  position: relative;
  text-transform: uppercase;
  margin-inline: auto;
  text-align: center;

  span {
    &::after {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 2px;
      background: #ffc300;
    }
  }
`;
