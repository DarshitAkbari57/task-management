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
import { useDispatch } from "react-redux";
import { me } from "./redux/user/actions";
import User from "./pages/user";
import Header from "./components/header";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const res = await dispatch(me());
        if (res?.status === 200) {
          setIsLoggedIn(true);
        } else {
          localStorage.clear();
          setIsLoggedIn(false);
        }
      }
    };
    fetchUser();
  }, [dispatch, token]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <div className="flex h-screen w-full">
          {/* Show Sidebar only if user is logged in */}
          {isLoggedIn && <Sidebar setIsLoggedIn={setIsLoggedIn} />}

          <div
            className={`bg-gray-100 h-screen overflow-y-auto ${
              isLoggedIn ? "w-[calc(100%-250px)]" : "w-full"
            }`}
          >
            {isLoggedIn && <Header />}
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
              <Route
                path="/users"
                element={isLoggedIn ? <User /> : <Navigate to="/" />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
