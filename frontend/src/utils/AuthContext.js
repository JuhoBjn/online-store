import { createContext } from "react";

export const AuthContext = createContext({
  id: "",
  role: "",
  firstname: "",
  lastname: "",
  email: "",
  postalcode: "",
  city: "",
  country: "",
  phone: "",
  premium: false,
  token: "",
  signup: () => {},
  login: () => {},
  logout: () => {}
});
