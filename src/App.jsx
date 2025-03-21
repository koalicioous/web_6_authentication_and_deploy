import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TodoList } from "./pages/TodoList";
import { AddTodoList } from "./pages/AddList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />}></Route>
        <Route path="/add" element={<AddTodoList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
