import './App.css';
import { dummyNotesList } from './constants';
import React, { useEffect, useState } from 'react';
import { ThemeContext, themes } from './themeContext';
import { Note, Label } from './types';

function App() {

  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    isLiked: false,
    isDeleted: false
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
  const [likedNotes, setLikedNotes] = useState<String[]>([]);
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleLike = (id: number) => {
    const updatedNotes = notes.map((note) => {
      if(note.id === id) {
        note.isLiked = !note.isLiked;
      }
      return note;
    });

    setNotes(updatedNotes);
    const updatedLikedNotes = updatedNotes.filter((note) => note.isLiked).map((note) => note.title);
    
    setLikedNotes(updatedLikedNotes);
  };

  const toggleDeletion = (id: number) => {
    const updatedNotes = notes.map((note) => {
      if(note.id === id) {
        note.isDeleted = !note.isDeleted;
        console.log(note.isDeleted);
      }
      return note;
    });

    setNotes(updatedNotes);
  }

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  }

  useEffect(() => {
    const style = document.documentElement;
    style.style.setProperty('--background-color', currentTheme.background);
    style.style.setProperty('--foreground-color', currentTheme.foreground);
    style.style.setProperty('--note-border', currentTheme.note_border);
    style.style.setProperty('--note-background', currentTheme.note_background);
    style.style.setProperty('--text-color', currentTheme.text_color);
  }, [currentTheme]);
  
  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className='app-container'>
        <div className='note-form'>
          <form className='note-form' onSubmit={createNoteHandler}>
            <div>
              <input placeholder='Note Title' onChange={(event) => {
                setCreateNote({...createNote, title: event.target.value})}} 
              required>
              </input>
            </div>
            <div>
              <textarea onChange={(event) => setCreateNote({...createNote, content: event.target.value})}
                required>
              </textarea>
            </div>
            <div>
            <select name="label" id="label" onChange={(event) =>
              setCreateNote({...createNote, label: event.target.value as Label})}
            required>
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Work</option>
              <option value={Label.work}>Study</option>
              <option value={Label.other}>Other</option>
            </select>
            </div>
            <div><button type='submit'>Create Note</button></div>
          </form>

          <div className='theme-button'>
            <button onClick={toggleTheme}>
              Toggle Theme
            </button>
          </div>
          <div className='favorites-list'>
            <h2>List of favorites:</h2>
            <ul>
              {likedNotes.map((noteTitle) => <li>{noteTitle}</li>)}
            </ul>
          </div>
        </div>
        
        <div className='note-grid'>
          {notes.filter(note => !note.isDeleted)
          .map((note) => (
            <div key={note.id} className='note-item'>
              <div className='notes-header'>
                <button
                onClick={() => toggleLike(note.id)}>
                  {note.isLiked ? "❤️" : "♡"}
                </button>
                <button
                onClick={() => toggleDeletion(note.id)}>
                  x
                </button>
              </div>
              <h2 
              contentEditable
              onInput={(e) => {
                setSelectedNote({
                  ...note, title: e.currentTarget.textContent || ""
                });
              }}>
                {note.title}
              </h2>
              <p 
              contentEditable
              onInput={(e) => {
                setSelectedNote({
                  ...note, content: e.currentTarget.textContent || ""
                });
              }}> {note.content} </p>
              <p 
              contentEditable
              onInput={(e) => {
                setSelectedNote({
                  ...note, label: e.currentTarget.textContent as Label || Label.other
                });
              }}> {note.label} </p>
            </div>
          ))}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
