import React from "react";
import styled from "styled-components";
import { Item } from "../interface/Item";

export const StyledForm = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  input,
  button {
    height: inherit;
    transition: width ease 0.2s;
  }
  input {
    width: 250px;
    box-sizing: border-box;
    font-size: 1.5rem;
    border: 2px solid #000;
    padding-left: 10px;
    ::placeholder {
      font-size: 1.5rem;
    }
  }
  button {
    width: 50px;
    margin-left: 5px;
  }
  @media screen and (min-width: 414px) {
    input {
      width: 340px;
    }
  }
  @media screen and (min-width: 767px) {
    input {
      width: 500px;
    }
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
