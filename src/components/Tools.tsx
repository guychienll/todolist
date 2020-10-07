import React from "react";
import styled from "styled-components";
const StyledTools = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: 20px;
  width: 200px;
  align-items: center;
  justify-content: space-around;
  button {
    height: 44px;
    width: 60px;
  }
`;
interface IProps {
  deleteItemsHandler: () => void;
  clickEditHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  workingBuffer: string[];
}
export function Tools({
  workingBuffer,
  deleteItemsHandler,
  clickEditHandler,
}: IProps) {
  return (
    <StyledTools>
      <button
        onClick={deleteItemsHandler}
        disabled={workingBuffer.length <= 0}
        data-testid="deleteButton"
      >
        Delete
      </button>
      <button
        onClick={clickEditHandler}
        disabled={workingBuffer.length !== 1}
        data-testid="editButton"
        value={workingBuffer ? workingBuffer[0] : 0}
      >
        Edit
      </button>
    </StyledTools>
  );
}
