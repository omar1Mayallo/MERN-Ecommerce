import styled from "styled-components";

export const ProductItemStyled = styled.div`
  position: relative;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  .sold-out {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -15%);
    width: 120px;
    height: 120px;
    background-color: rgba(0, 0, 0, 0.4);
    font-weight: 900;
    text-transform: uppercase;
    color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
  }
`;
