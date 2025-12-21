import { useState, createContext } from "react";
import { login, signup } from "../api/users-api";

export const AuthContext = createContext(null); //eslint-disable-line

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken); //eslint-disable-line
  const [userName, setUserName] = useState("");
  const [authError, setAuthError] = useState("");

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const authenticate = async (username, password) => {
  try {
    setAuthError("");
    const result = await login(username, password);

    if (result.token) {
      setToken(result.token);
      setIsAuthenticated(true);
      setUserName(username);
      return true;
    }

    setAuthError("Login failed");
    return false;
  } catch (err) {
    setAuthError(err.message);
    setIsAuthenticated(false);
    return false;
  }
};


  const register = async (username, password) => {
  try {
    setAuthError("");
    const result = await signup(username, password);
    return result.success === true;
  } catch (err) {
    setAuthError(err.message);
    return false;
  }
};

  const signout = () => {
    setTimeout(() => setIsAuthenticated(false), 100);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName,
        authError
      }}
    >
      {props.children} {/* eslint-disable-line */}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
