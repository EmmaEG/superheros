import { loginStart, loginSuccess, loginFailure } from "./userSlice";
import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const response = await axios.post("http://challenge-react.alkemy.org/", user);
    // console.log(response)
    dispatch(loginSuccess(response.data));
    const token = response.data.token;
    localStorage.setItem("token", token);
  } catch (error) {
    dispatch(loginFailure());
  }
};
