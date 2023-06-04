import { createContext, useReducer } from "react";
import jwt_decode from "jwt-decode";
import axios from "../api/axios";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        userId: action.payload.userId, // Update userId to match your payload
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
        user: null,
        userId: null,
      };
    case "AUTH_IS_READY":
      return {
        user: action.payload,
        authIsReady: true,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user")),
    userId: localStorage.getItem("userId"),
    authIsReady: false,
  });

  const login_user = (data) => {
    const decodedToken = jwt_decode(data.token);
    const userId = decodedToken.id;

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("userId", userId);
    dispatch({ type: "LOGIN", payload: { ...data, userId } });
  };

  const logout_user = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    dispatch({ type: "LOGOUT", payload: null });
  };

  // Add an axios interceptor to include the token in the request headers
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, login_user, logout_user }}>
      {children}
    </AuthContext.Provider>
  );
};
