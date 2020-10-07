import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("the element should existed when initialization", () => {
  //arrange
  const { queryByText, queryByTestId } = render(<App></App>);
  const title = queryByText(/TO DO LIST/);
  const input = queryByTestId(/todoInput/);
  const addButton = queryByTestId(/addButton/);
  //assert
  expect(title).not.toBeNull();
  expect(input).not.toBeNull();
  expect(addButton).not.toBeNull();
});

test("when click add button will push an item into item list", () => {
  //arrange
  const { getByTestId, getAllByTestId } = render(<App></App>);
  const input = getByTestId(/todoInput/);
  const addButton = getByTestId(/addButton/);
  //act
  fireEvent.change(input, { target: { value: "go to supermarket" } });
  fireEvent.click(addButton);
  const items = getAllByTestId(/item/);
  //assert
  expect(items).not.toBeNull();
});

test("when the item pushed into item list should clean up the input", () => {
  //arrange
  const { getByTestId } = render(<App></App>);
  const input = getByTestId(/todoInput/) as HTMLInputElement;
  const addButton = getByTestId(/addButton/);
  //act
  fireEvent.change(input, { target: { value: "go to supermarket" } });
  fireEvent.click(addButton);
  //assert
  expect(input.value).toBe("");
});

test("when item be clicked the item checkbox should be checked", () => {
  //arrange
  const { getByTestId, getByText } = render(<App></App>);
  const input = getByTestId(/todoInput/) as HTMLInputElement;
  const addButton = getByTestId(/addButton/);
  //act
  fireEvent.change(input, { target: { value: "go to bank" } });
  fireEvent.click(addButton);

  const itemWouldBeChecked = getByText(/go to bank/)
    .parentElement as HTMLInputElement;
  fireEvent.click(getByText(/go to bank/));
  const checkbox = itemWouldBeChecked.querySelector(
    "input[type='checkbox']"
  ) as HTMLInputElement;
  expect(checkbox.checked).toBe(true);
});

test("when no workingbuffer the delete button should be disabled", () => {
  const { getByTestId, getByText } = render(<App></App>);
  const input = getByTestId(/todoInput/) as HTMLInputElement;
  const addButton = getByTestId(/addButton/);
  const deleteButton = getByTestId(/deleteButton/) as HTMLButtonElement;
  expect(deleteButton.disabled).toBe(true);
  fireEvent.change(input, { target: { value: "go to bank" } });
  fireEvent.click(addButton);
  fireEvent.click(getByText(/go to bank/));
  expect(deleteButton.disabled).toBe(false);
});

test("when one record in workingbuffer the edit button should not be disabled", () => {
  const { getByTestId, getByText } = render(<App></App>);
  const input = getByTestId(/todoInput/) as HTMLInputElement;
  const addButton = getByTestId(/addButton/);
  const editButton = getByTestId(/editButton/) as HTMLButtonElement;
  expect(editButton.disabled).toBe(true);
  fireEvent.change(input, { target: { value: "go to bank" } });
  fireEvent.click(addButton);
  fireEvent.click(getByText(/go to bank/));
  expect(editButton.disabled).toBe(false);
  fireEvent.click(getByText(/go to bank/));
  expect(editButton.disabled).toBe(true);
});

test("when clicked delete button should delete all items in working buffer", () => {
  const { getByTestId, getByText, queryByText } = render(<App></App>);
  const input = getByTestId(/todoInput/) as HTMLInputElement;
  const addButton = getByTestId(/addButton/);
  const deleteButton = getByTestId(/deleteButton/) as HTMLButtonElement;
  fireEvent.change(input, { target: { value: "go to bank" } });
  fireEvent.click(addButton);
  fireEvent.change(input, { target: { value: "go to hospital" } });
  fireEvent.click(addButton);
  fireEvent.click(getByText(/go to bank/));
  fireEvent.click(deleteButton);

  expect(queryByText(/go to hospital/)).not.toBeNull();
  expect(queryByText(/go to bank/)).toBeNull();
});

test("when clicked edit button should take the record into item buffer", () => {
  const { getByTestId, getByText } = render(<App></App>);
  const input = getByTestId(/todoInput/) as HTMLInputElement;
  const addButton = getByTestId(/addButton/) as HTMLButtonElement;
  const editButton = getByTestId(/editButton/) as HTMLButtonElement;
  fireEvent.change(input, { target: { value: "go to bank" } });
  fireEvent.click(addButton);
  fireEvent.click(getByText(/go to bank/));
  fireEvent.click(editButton);
  expect(input.value).toBe("go to bank");
  expect(addButton.innerHTML).toBe("Save");
});

test("when clicked save button should update the change of the items", () => {
  const { getByTestId, getByText, queryByText } = render(<App></App>);
  const input = getByTestId(/todoInput/) as HTMLInputElement;
  const addButton = getByTestId(/addButton/) as HTMLButtonElement;
  const editButton = getByTestId(/editButton/) as HTMLButtonElement;
  fireEvent.change(input, { target: { value: "go to bank" } });
  fireEvent.click(addButton);
  fireEvent.click(getByText(/go to bank/));
  fireEvent.click(editButton);
  const saveButton = getByTestId(/saveButton/) as HTMLButtonElement;
  fireEvent.change(input, { target: { value: "buy a coffee" } });
  fireEvent.click(saveButton);
  expect(input.value).toBe("");
  expect(queryByText(/buy a coffee/)).not.toBeNull();
  expect(queryByText(/go to bank/)).toBeNull();
});
