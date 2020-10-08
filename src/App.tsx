import { Tools } from "./components/Tools";
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
  const [isEditing, setIsEditing] = useState(false);
  const [tabState, setTabState] = useState(ENUM_ITEM_PROCESS_TYPE.UNDONE);

  const changeItemBufferHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let cloneItemBuffer = { ...itemBuffer };
    cloneItemBuffer.title = value;
    cloneItemBuffer.id = new Date().getTime().toString();
    cloneItemBuffer.process = ENUM_ITEM_PROCESS_TYPE.UNDONE;
    setItemBuffer(cloneItemBuffer);
  };
  const addItemHandler = () => {
    let cloneItems = [...items];
    cloneItems.push(itemBuffer);
    setItems(cloneItems);
    setItemBuffer({
      id: "",
      title: "",
      process: ENUM_ITEM_PROCESS_TYPE.UNKNOWN,
    } as Item);
  };

  const completeItemsHandler = () => {
    workingBuffer.forEach((id) => {
      const cloneItems = items;
      const itemIndexWhichWouldBeCompleted = cloneItems.findIndex((item) => {
        return item.id === id;
      });
      cloneItems[itemIndexWhichWouldBeCompleted].process =
        ENUM_ITEM_PROCESS_TYPE.DONE;
      setItems(cloneItems);
    });
    setWorkingBuffer([]);
  };

  const archiveItemsHandler = () => {
    workingBuffer.forEach((id) => {
      const cloneItems = items;
      const itemIndexWhichWouldBeArchived = cloneItems.findIndex((item) => {
        return item.id === id;
      });
      cloneItems[itemIndexWhichWouldBeArchived].process =
        ENUM_ITEM_PROCESS_TYPE.ARCHIVED;
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
  const clickEditHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    let cloneItemBuffer = { ...itemBuffer };
    const itemWouldBeUpdated = items.filter((item) => {
      return item.id === value;
    })[0];
    cloneItemBuffer.id = itemWouldBeUpdated.id;
    cloneItemBuffer.title = itemWouldBeUpdated.title;
    cloneItemBuffer.process = itemWouldBeUpdated.process;
    setIsEditing(true);
    setItemBuffer(cloneItemBuffer);
  };
  const saveItemHandler = () => {
    let cloneItems = [...items];
    const indexOfEditingItem = cloneItems.findIndex((item) => {
      return item.id === itemBuffer.id;
    });
    cloneItems.splice(indexOfEditingItem, 1, itemBuffer);
    setItems(cloneItems);
    setItemBuffer({
      id: "",
      title: "",
      process: ENUM_ITEM_PROCESS_TYPE.UNKNOWN,
    } as Item);
    setIsEditing(false);
    setWorkingBuffer([]);
  };
  const clickTabHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    setTabState(parseInt(value));
  };

  return (
    <Container>
      <h1>TO DO LIST</h1>
      <Form
        isEditing={isEditing}
        changeItemBufferHandler={changeItemBufferHandler}
        addItemHandler={addItemHandler}
        saveItemHandler={saveItemHandler}
        itemBuffer={itemBuffer}
      />
      <List
        workingBuffer={workingBuffer}
        AddItemInWorkingBuffer={AddItemInWorkingBuffer}
        items={items}
        clickTabHandler={clickTabHandler}
        tabState={tabState}
      />
      <Tools
        completeItemsHandler={completeItemsHandler}
        clickEditHandler={clickEditHandler}
        workingBuffer={workingBuffer}
        archiveItemsHandler={archiveItemsHandler}
        isEditing={isEditing}
      />
    </Container>
  );
}
export default App;
