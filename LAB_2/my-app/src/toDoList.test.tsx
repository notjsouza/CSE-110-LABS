import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constants";

describe("Create ToDo List", () => {
  test("Checks to see if all items are rendered", () => {
    render(<ToDoList />);
 
    dummyGroceryList.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  test("First checkbox clicked", () => {
    render(<ToDoList />);

    expect(screen.getByText("Items bought: 0")).toBeInTheDocument();

    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);

    expect(screen.getByText("Items bought: 1")).toBeInTheDocument();
  });

  test("Second checkbox clicked", () => {
    render(<ToDoList />);

    expect(screen.getByText("Items bought: 0")).toBeInTheDocument();

    const checkbox = screen.getAllByRole('checkbox')[1];
    fireEvent.click(checkbox);

    expect(screen.getByText("Items bought: 1")).toBeInTheDocument();
  });
});