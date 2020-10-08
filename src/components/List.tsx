import React from "react";
import styled from "styled-components";
import { ENUM_ITEM_PROCESS_TYPE } from "../enum/ENUM_ITEM_PROCESS_TYPE";
import { Item } from "../interface/Item";
import { Tabs } from "./Tabs";

interface IProps {
  items: Item[];
  AddItemInWorkingBuffer: (e: React.ChangeEvent<HTMLInputElement>) => void;
  workingBuffer: string[];
  tabState: ENUM_ITEM_PROCESS_TYPE;
  clickTabHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const StyledList = styled.ul`
  width: 280px;
  min-height: calc(100vh - 280px);
  border: 2px solid #000;
  border-radius: 0 0 5px 5px;
  position: relative;
  margin-top: 40px;
  transition: all ease 0.2s;
  h1 {
    width: 200px;
    text-align: center;
    margin: auto;
    line-height: 280px;
  }
  li {
    display: flex;
    align-items: center;
    padding: 5px;
    font-size: 1.2rem;
    cursor: pointer;
    user-select: none;
    max-width: 260px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    input {
      display: none;
      opacity: 0;
      visibility: hidden;
      :checked ~ .checkbox::after {
        opacity: 1;
      }
    }
    label {
      font-size: 1.5rem;
    }
    .checkbox {
      min-width: 20px;
      height: 20px;
      border: 2px solid #000;
      margin: 0 3px 0 3px;
      position: relative;
      ::after {
        content: "✔";
        position: absolute;
        font-size: 1.2rem;
        top: 0;
        bottom: 0;
        right: 0;
        left: 2px;
        opacity: 0;
      }
    }
    button {
      margin-left: 20px;
    }
  }
  @media screen and (min-width: 414px) {
    width: 350px;
  }
  @media screen and (min-width: 767px) {
    width: 530px;
  }
`;

export function List({
  items,
  AddItemInWorkingBuffer,
  workingBuffer,
  tabState,
  clickTabHandler,
}: IProps) {
  return (
    <StyledList>
      <Tabs clickTabHandler={clickTabHandler} />
      {items.filter((item) => {
        return item.process === tabState;
      }).length === 0 ? (
        <h1>No Items</h1>
      ) : null}
      {items
        .filter((item) => {
          return item.process === tabState;
        })
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
              <label className="checkbox" htmlFor={item.id}></label>
              <label htmlFor={item.id}>{item.title}</label>
            </li>
          );
        })}
    </StyledList>
  );
}
