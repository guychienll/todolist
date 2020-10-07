import React from "react";
import styled from "styled-components";
import { ENUM_ITEM_PROCESS_TYPE } from "../enum/ENUM_ITEM_PROCESS_TYPE";

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

interface IProps {
  clickTabHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Tabs({ clickTabHandler }: IProps) {
  return (
    <StlyedTabs>
      <button
        onClick={clickTabHandler}
        value={ENUM_ITEM_PROCESS_TYPE.UNDONE}
        data-testid="undoneButton"
      >
        Undone
      </button>
      <button
        onClick={clickTabHandler}
        value={ENUM_ITEM_PROCESS_TYPE.DONE}
        data-testid="doneButton"
      >
        Done
      </button>
      <button
        onClick={clickTabHandler}
        value={ENUM_ITEM_PROCESS_TYPE.ARCHIVED}
        data-testid="archivedButton"
      >
        Archived
      </button>
    </StlyedTabs>
  );
}
