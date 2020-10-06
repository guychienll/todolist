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

test.skip("when item be clicked should shift from the items", () => {
  //arrange
  const { getByTestId, getByText, queryByText } = render(<App></App>);
  const input = getByTestId(/todoInput/) as HTMLInputElement;
  const addButton = getByTestId(/addButton/);
  //act
  fireEvent.change(input, { target: { value: "go to bank" } });
  fireEvent.click(addButton);
  const itemWouldBeDeleted = getByText(/go to bank/);
  fireEvent.click(itemWouldBeDeleted);
  //assert
  expect(queryByText(/go to bank/)).toBeNull();
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
