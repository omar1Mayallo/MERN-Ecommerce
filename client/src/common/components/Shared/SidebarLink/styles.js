import styled from "styled-components";

export const SidebarLinkStyled = styled.div`
  cursor: pointer;
  transition: all 0.5s;
  background-color: white;
  padding: 10px 5px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  &:hover {
    background-color: rgb(247 247 247/1);
  }
`;
