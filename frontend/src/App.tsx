import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import LoginRegister from "./pages/login";
import Sidebar from "./components/Sidebar";
import TaskPage from "./pages/task";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // User is logged in if token exists
    }
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <div className="flex h-screen w-full">
          {/* Show Sidebar only if user is logged in */}
          {isLoggedIn && <Sidebar />}

          <div
            className={`bg-gray-100 h-screen overflow-y-auto ${
              isLoggedIn ? "w-[calc(100%-250px)]" : "w-full"
            }`}
          >
            <Routes>
              {/* Login/Register Route */}
              <Route
                path="/"
                element={
                  isLoggedIn ? (
                    <Navigate to="/task" />
                  ) : (
                    <LoginRegister setIsLoggedIn={setIsLoggedIn} />
                  )
                }
              />

              {/* Protected Task Route */}
              <Route
                path="/task"
                element={isLoggedIn ? <TaskPage /> : <Navigate to="/" />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
