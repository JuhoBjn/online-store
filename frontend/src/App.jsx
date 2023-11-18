import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";

import { AuthContext } from "./utils/AuthContext";
import { signup, login } from "./utils/UsersAPI";
import LoggedOutNavBar from "./components/navbar/LoggedOutNavBar";
import Frontpage from "./pages/frontpage/Frontpage";
import AboutUs from "./pages/about-us/AboutUs";
import ContactUs from "./pages/contact-us/ContactUs";
import Home from "./pages/home/Home";
import Authorization from "./pages/authorization/Authorization";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/frontpage",
    element: (
      <>
        <LoggedOutNavBar />
        <Frontpage />
      </>
    )
  },
  {
    path: "/about-us",
    element: (
      <>
        <LoggedOutNavBar />
        <AboutUs />
      </>
    )
  },
  {
    path: "/contact-us",
    element: (
      <>
        <LoggedOutNavBar />
        <ContactUs />
      </>
    )
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

let logoutTimer;

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
  const [tokenExpiration, setTokenExpiration] = useState(null);

  const signupUser = async (email, password) => {
    try {
      const response = await signup(email, password);
      setCurrentUser({ ...response });
      // Set token expiration time to two hours.
      const expiration = new Date(new Date().getTime() + 1000 * 60 * 60 * 2);
      setTokenExpiration(expiration);
      response.tokenExpiration = expiration;
      localStorage.setItem("currentUser", JSON.stringify(response));
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await login(email, password);
      setCurrentUser({ ...response });
      // Set token expiration time to two hours.
      const expiration = new Date(new Date().getTime() + 1000 * 60 * 60 * 2);
      setTokenExpiration(expiration);
      response.tokenExpiration = expiration;
      localStorage.setItem("currentUser", JSON.stringify(response));
    } catch (error) {
      console.log(error.message);
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
    setTokenExpiration(null);
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    console.log("User logged out");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (
      storedUser &&
      storedUser.token &&
      new Date(storedUser.tokenExpiration) > new Date()
    ) {
      const newTokenExpiration = new Date(
        new Date().getTime() + 1000 * 60 * 60 * 2
      );
      setTokenExpiration(newTokenExpiration);
      storedUser.tokenExpiration = newTokenExpiration;
      localStorage.setItem("currentUser", JSON.stringify(storedUser));
    }
  }, []);

  useEffect(() => {
    if (currentUser.token && tokenExpiration) {
      const remaining = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logoutUser, remaining);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [currentUser, tokenExpiration]);

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
