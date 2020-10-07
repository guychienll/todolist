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
  archiveItemsHandler: () => void;
  clickEditHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  completeItemsHandler: () => void;
  isEditing: boolean;
  workingBuffer: string[];
}
export function Tools({
  workingBuffer,
  isEditing,
  archiveItemsHandler,
  clickEditHandler,
  completeItemsHandler,
}: IProps) {
  const isArchiveDisabled = workingBuffer.length <= 0 || isEditing;
  const isEditDisabled = workingBuffer.length !== 1 || isEditing;
  return (
    <StyledTools>
      <button
        onClick={completeItemsHandler}
        disabled={workingBuffer.length <= 0 || isEditing}
        data-testid="completeButton"
      >
        complete
      </button>
      <button
        onClick={archiveItemsHandler}
        disabled={isArchiveDisabled}
        data-testid="archiveButton"
      >
        Archive
      </button>
      <button
        onClick={clickEditHandler}
        disabled={isEditDisabled}
        data-testid="editButton"
        value={workingBuffer ? workingBuffer[0] : 0}
      >
        Edit
      </button>
    </StyledTools>
  );
}
