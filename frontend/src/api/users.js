const { axiosInstance } = require(".");

// Register a new user
export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/register", payload);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// Login a user
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/login", payload);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const LoginStaff = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/staff/login", payload);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
