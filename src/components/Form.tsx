import React from "react";
import styled from "styled-components";
import { Item } from "../interface/Item";

export const StyledForm = styled.div`
  height: 44px;
  input {
    box-sizing: border-box;
    width: 250px;
    height: inherit;
    padding-left: 10px;
    border-right: none;
  }
  button {
    height: inherit;
  }
`;

interface IProps {
  changeItemBufferHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  saveItemHandler: () => void;
  addItemHandler: () => void;
  itemBuffer: Item;
  isEditing: boolean;
}
export function Form({
  changeItemBufferHandler,
  addItemHandler,
  saveItemHandler,
  itemBuffer,
  isEditing,
}: IProps) {
  return (
    <StyledForm>
      <input
        onChange={changeItemBufferHandler}
        type="text"
        name="title"
        value={itemBuffer.title}
        placeholder="please enter your items..."
        data-testid="todoInput"
      />
      <button
        onClick={isEditing ? saveItemHandler : addItemHandler}
        data-testid={isEditing ? "saveButton" : "addButton"}
      >
        {isEditing ? "Save" : "Add"}
      </button>
    </StyledForm>
  );
}
