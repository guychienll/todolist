import React from "react";
import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import App from "./App";

test("the element should existed when initialization", () => {
  //arrange
  const app = render(<App></App>);
  const title = app.queryByText(/TO DO LIST/);
  const input = app.queryByPlaceholderText(/please enter your items.../);
  const button = app.queryByText(/Add/);
  //assert
  expect(title).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
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

test("when item be clicked should shift from the items", () => {
  //arrange
  const { getByTestId, getByText, queryByText } = render(<App></App>);
  const input = getByTestId(/todoInput/) as HTMLInputElement;
  const addButton = getByTestId(/addButton/);
  //act
  fireEvent.change(input, { target: { value: "go to supermarket" } });
  fireEvent.click(addButton);
  fireEvent.change(input, { target: { value: "go to bank" } });
  fireEvent.click(addButton);
  const itemWouldBeDeleted = getByText(/go to bank/);
  fireEvent.click(itemWouldBeDeleted);
  //assert
  expect(queryByText(/go to bank/)).toBeNull();
});
