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
  AddItemHandler: () => void;
  itemBuffer: Item;
}
export function Form({
  changeItemBufferHandler,
  AddItemHandler,
  itemBuffer,
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
      <button onClick={AddItemHandler} data-testid="addButton">
        Add
      </button>
    </StyledForm>
  );
}
