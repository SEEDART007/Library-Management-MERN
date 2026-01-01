import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Books from "./pages/Books";
import BorrowedBooks from "./pages/BorrowedBooks";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";
import Data from "./pages/Data";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/data" element={<Data />} />
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            }
          />
          <Route
            path="/borrowed"
            element={
              <ProtectedRoute>
                <BorrowedBooks />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
