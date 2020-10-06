import React, { useState } from "react";
import styled from "styled-components";
import { ENUM_ITEM_PROCESS_TYPE } from "./enum/ENUM_ITEM_PROCESS_TYPE";
import { Form } from "./components/Form";
import { Item } from "./interface/Item";
import { List } from "./components/List";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #eee;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  h1 {
    font-size: 4rem;
    padding: 15px;
    font-family: "Amatic SC", cursive;
  }
`;

function App() {
  const [items, setItems] = useState([] as Item[]);
  const [itemBuffer, setItemBuffer] = useState({
    id: "",
    title: "",
    process: ENUM_ITEM_PROCESS_TYPE.UNKNOWN,
  } as Item);
  const [workingBuffer, setWorkingBuffer] = useState([] as string[]);

  const changeItemBufferHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let cloneItemBuffer = { ...itemBuffer };
    cloneItemBuffer.title = value;
    cloneItemBuffer.id = new Date().getTime().toString();
    cloneItemBuffer.process = ENUM_ITEM_PROCESS_TYPE.UNDONE;
    setItemBuffer(cloneItemBuffer);
  };
  const AddItemHandler = () => {
    let cloneItems = [...items];
    cloneItems.push(itemBuffer);
    setItems(cloneItems);
    setItemBuffer({
      id: "",
      title: "",
      process: ENUM_ITEM_PROCESS_TYPE.UNKNOWN,
    } as Item);
  };

  const deleteItemsHandler = () => {
    workingBuffer.forEach((id) => {
      const cloneItems = items;
      const itemIndexWhichWouldBeDeleted = cloneItems.findIndex((item) => {
        return item.id === id;
      });
      cloneItems.splice(itemIndexWhichWouldBeDeleted, 1);
      setItems(cloneItems);
    });
    setWorkingBuffer([]);
  };

  const AddItemInWorkingBuffer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let cloneWorkingBuffer = [...workingBuffer];
    const indexOfWorkingBuffer = cloneWorkingBuffer.findIndex((id) => {
      return id === value;
    });
    if (checked) {
      cloneWorkingBuffer.push(value);
      setWorkingBuffer(cloneWorkingBuffer);
      return;
    }
    cloneWorkingBuffer.splice(indexOfWorkingBuffer, 1);
    setWorkingBuffer(cloneWorkingBuffer);
  };

  return (
    <Container>
      <h1>TO DO LIST</h1>
      <Form
        changeItemBufferHandler={changeItemBufferHandler}
        AddItemHandler={AddItemHandler}
        itemBuffer={itemBuffer}
      />
      <List
        workingBuffer={workingBuffer}
        AddItemInWorkingBuffer={AddItemInWorkingBuffer}
        items={items}
      />
      <button
        onClick={deleteItemsHandler}
        disabled={workingBuffer.length <= 0}
        data-testid="deleteButton"
      >
        Delete
      </button>
    </Container>
  );
}
export default App;
