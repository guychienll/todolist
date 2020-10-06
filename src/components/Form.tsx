import React from "react";
import styled from "styled-components";
import { Item } from "../interface/Item";

export const StyledForm = styled.div`
  height: 44px;
  input {
    box-sizing: border-box;
    width: 280px;
    height: inherit;
    padding-left: 10px;
    border-right: none;
  }
  button {
    height: inherit;
  }
`;

interface IProps {
  itemBufferChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  AddClickHandler: () => void;
  itemBuffer: Item;
}
export function Form({
  itemBufferChangeHandler,
  AddClickHandler,
  itemBuffer,
}: IProps) {
  return (
    <StyledForm>
      <input
        onChange={itemBufferChangeHandler}
        type="text"
        name="title"
        value={itemBuffer.title}
        placeholder="please enter your items..."
        data-testid="todoInput"
      />
      <button onClick={AddClickHandler} data-testid="addButton">
        Add
      </button>
    </StyledForm>
  );
}
