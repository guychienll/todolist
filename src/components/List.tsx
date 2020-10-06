import React from "react";
import styled from "styled-components";
import { Item } from "../interface/Item";

interface IProps {
  items: Item[];
  clickItemHandler: (id: string) => void;
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
    &::before {
      content: "。";
    }
  }
`;
export function List({ items, clickItemHandler }: IProps) {
  return (
    <StyledList>
      {items
        .sort((a, b) => {
          return parseInt(a.id) - parseInt(b.id);
        })
        .map((item) => {
          return (
            <li
              key={item.id}
              data-testid="item"
              onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                clickItemHandler(item.id);
              }}
            >
              {item.title}
            </li>
          );
        })}
    </StyledList>
  );
}
