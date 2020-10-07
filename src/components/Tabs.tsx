import React from "react";
import styled from "styled-components";

const StlyedTabs = styled.div`
  display: flex;
  width: 280px;
  height: 44px;
  align-items: center;
  justify-content: start;
  position: absolute;
  top: -39px;
  left: -2px;
  button {
    height: 34px;
    border: 2px solid #000;
    border-bottom: none;
    border-radius: 3px 3px 0 0;
    margin-right: 2px;
    outline: none;
    :hover {
      font-size: 1.5rem;
      outline: none;
    }
  }
`;
export function Tabs() {
  return (
    <StlyedTabs>
      <button data-testid="doneButton">Done</button>
      <button data-testid="undoneButton">Undone</button>
      <button data-testid="archivedButton">Archived</button>
    </StlyedTabs>
  );
}
