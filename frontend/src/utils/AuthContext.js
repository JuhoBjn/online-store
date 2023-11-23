import { createContext } from "react";

export const AuthContext = createContext({
  id: "",
  role: "",
  firstname: "",
  lastname: "",
  email: "",
  email_hash: "",
  postalcode: "",
  city: "",
  country: "",
  phone: "",
  premium: false,
  token: "",
  signup: () => {},
  login: () => {},
  updateProfile: () => {},
  logout: () => {}
});
