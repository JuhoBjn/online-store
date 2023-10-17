import { useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";

import { AuthContext } from "./utils/AuthContext";
import { signup, login } from "./utils/UsersAPI";
import Home from "./pages/home/Home";
import Authorization from "./pages/authorization/Authorization";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/auth",
    element: <Authorization />
  },
  {
    path: "*",
    element: <Navigate to="/" replace="true" />
  }
]);

function App() {
  const [currentUser, setCurrentUser] = useState({
    id: "",
    role: "",
    firstname: "",
    lastname: "",
    email: "",
    postalcode: "",
    city: "",
    country: "",
    phone: "",
    premium: "",
    token: ""
  });

  const signupUser = async (email, password) => {
    try {
      const response = await signup(email, password);
      localStorage.setItem("currentUser", JSON.stringify(response));
      setCurrentUser({ ...response });
    } catch (error) {
      console.log(`Signup failed: ${error.message}`);
      throw error;
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await login(email, password);
      localStorage.setItem("currentUser", JSON.stringify(response));
      setCurrentUser({ ...response });
    } catch (error) {
      console.log(`Login failed: ${error.message}`);
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser({
      id: "",
      role: "",
      firstname: "",
      lastname: "",
      email: "",
      postalcode: "",
      city: "",
      country: "",
      phone: "",
      premium: "",
      token: ""
    });
  };

  return (
    <AuthContext.Provider
      value={{
        id: currentUser.id,
        role: currentUser.role,
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        email: currentUser.email,
        postalcode: currentUser.postalcode,
        city: currentUser.city,
        country: currentUser.country,
        phone: currentUser.phone,
        premium: currentUser.premium,
        token: currentUser.token,
        signup: signupUser,
        login: loginUser,
        logout: logoutUser
      }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
