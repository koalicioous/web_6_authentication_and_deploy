import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TodoList } from "./pages/TodoList";
import { AddTodoList } from "./pages/AddList";
import { Register } from "./pages/Authentication/register";
import { Login } from "./pages/Authentication/login";
import { ProtectedRoute } from "./components/Route/ProtectedRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import { Logout } from "./pages/Authentication/logout";

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <TodoList />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/add"
          element={
            <ProtectedRoute user={user}>
              <AddTodoList />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/auth/register" element={<Register />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route
          path="/auth/logout"
          element={
            <ProtectedRoute user={user}>
              <Logout />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<h1>404 Not Found</h1>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
