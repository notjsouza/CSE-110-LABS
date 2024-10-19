import './App.css';
import { Route, Routes } from "react-router-dom";
import { ToDoList } from './toDoList';
import { StickyNotes } from './stickyNotes';
import { Navbar } from './navbar';

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<StickyNotes/>} />
        <Route path="/todolist/:name" element={<ToDoList />} />
      </Routes>
    </div>
  );

}

export default App;
