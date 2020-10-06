import React from "react";
import styled from "styled-components";
import { Item } from "../interface/Item";

interface IProps {
  items: Item[];
  AddItemInWorkingBuffer: (e: React.ChangeEvent<HTMLInputElement>) => void;
  workingBuffer: string[];
}
const StyledList = styled.ul`
  margin: 10px;
  li {
    padding: 5px;
    font-size: 1.2rem;
    cursor: pointer;
    user-select: none;
    width: 200px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    button {
      margin: 0 0 0 20px;
    }
  }
`;
export function List({ items, AddItemInWorkingBuffer, workingBuffer }: IProps) {
  return (
    <StyledList>
      {items
        .sort((a, b) => {
          return parseInt(a.id) - parseInt(b.id);
        })
        .map((item) => {
          return (
            <li key={item.id} data-testid="item">
              <input
                type="checkbox"
                id={item.id}
                value={item.id}
                onChange={AddItemInWorkingBuffer}
                checked={workingBuffer.includes(item.id)}
              />
              <label htmlFor={item.id}>{item.title}</label>
            </li>
          );
        })}
    </StyledList>
  );
}
