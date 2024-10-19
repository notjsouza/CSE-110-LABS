import { render, screen, fireEvent, within } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyNotesList } from "./constants";

describe("Create Sticky Note", () => {
  test("renders create note form", () => {
    render(<StickyNotes />);
    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
   });

   test("creates a new note", () => {
    render(<StickyNotes />);
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target:  {value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Note content" } });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");
 
    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
   });

   test("Checks to see if all notes are rendered", () => {
    render(<StickyNotes />);
    const noteGrid = screen.getByTestId("note-grid");
    const notes = within(noteGrid).getAllByTestId(/^note-\d+$/);
    expect(notes).toHaveLength(dummyNotesList.length);

    dummyNotesList.forEach((note) => {
      const noteElement = screen.getByTestId(`note-${note.id}`);
      expect(within(noteElement).getByText(note.title)).toBeInTheDocument();
      expect(within(noteElement).getByText(note.content)).toBeInTheDocument();
    });
   });

   test("Checks to see if note contents can be modified", () => {
    render(<StickyNotes />);
    const noteToUpdate = dummyNotesList[0];
    const noteContent = screen.getByTestId(`note-content-${noteToUpdate.id}`);

    fireEvent.input(noteContent, { target: { textContent: "Updated content" } });

    expect(noteContent.textContent).toBe("Updated content");
   });

   test("Checks the delete button", () => {
    render(<StickyNotes />);
    const initialNotes = screen.getAllByTestId(/^note-\d+$/);
    expect(initialNotes).toHaveLength(dummyNotesList.length);

    const noteToDelete = dummyNotesList[1];
    const deleteButton = screen.getByTestId(`delete-button-${noteToDelete.id}`);

    fireEvent.click(deleteButton);
    
    const remainingNotes = screen.getAllByTestId(/^note-\d+$/);
    expect(remainingNotes).toHaveLength(dummyNotesList.length - 1)
   });
});
