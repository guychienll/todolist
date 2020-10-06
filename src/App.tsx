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
  const itemBufferChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let cloneItemBuffer = { ...itemBuffer };
    cloneItemBuffer.title = value;
    cloneItemBuffer.id = new Date().getTime().toString();
    cloneItemBuffer.process = ENUM_ITEM_PROCESS_TYPE.UNDONE;
    setItemBuffer(cloneItemBuffer);
  };
  const AddClickHandler = () => {
    let cloneItems = [...items];
    cloneItems.push(itemBuffer);
    setItems(cloneItems);
    setItemBuffer({
      id: "",
      title: "",
      process: ENUM_ITEM_PROCESS_TYPE.UNKNOWN,
    } as Item);
  };
  const clickedItemHandler = (id: string) => {
    let cloneItems = [...items];
    const itemIndexWhichWouldBeDeleted = cloneItems.findIndex((item) => {
      return item.id === id;
    });
    cloneItems.splice(itemIndexWhichWouldBeDeleted, 1);
    setItems(cloneItems);
  };

  return (
    <Container>
      <h1>TO DO LIST</h1>
      <Form
        itemBufferChangeHandler={itemBufferChangeHandler}
        AddClickHandler={AddClickHandler}
        itemBuffer={itemBuffer}
      />
      <List clickedItemHandler={clickedItemHandler} items={items} />
    </Container>
  );
}
export default App;
