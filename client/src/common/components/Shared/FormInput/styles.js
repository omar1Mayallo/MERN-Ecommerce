import styled from "styled-components";

export const FormInputStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 13px;
  input {
    background: transparent;
    font-size: 14px;
    width: 100%;
    color: black;
    padding: 0.5em 1em;
    outline: none;
    border: 2px solid gray;
    border-radius: 5px;
    &:focus {
      border: 2px solid black;
    }
    &.err-input {
      border: 2px solid #f93154;
    }
  }
  p.err-msg {
    color: #f93154;
    font-size: 12px;
    margin-top: 3px;
  }
`;
