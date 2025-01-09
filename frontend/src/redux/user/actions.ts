import * as actionTypes from "../ActionTypes";
import { apiGet, apiPost } from "../axios";

export const GetAllUsers: any = (): Promise<any> => {
  const token = localStorage.getItem("token");

  return async (dispatch: any) => {
    // Dispatch the INIT action
    dispatch({
      type: actionTypes.GET_ALL_USER_INIT,
    });

    try {
      // Perform the GET request
      const response = await apiGet<User>(`all`, token);

      if (response.status === 200) {
        // Dispatch success action with user data
        dispatch({
          type: actionTypes.GET_ALL_USER_SUCCESS,
          payload: response.data,
        });
        return response.data; // Return user data
      } else {
        // Dispatch fail action if response status is not 200
        dispatch({
          type: actionTypes.GET_ALL_USER_FAIL,
          payload: response?.data?.message || "Unknown error",
        });
        return response.data; // Return error message
      }
    } catch (error) {
      console.log("error", error);

      // Handle unauthorized error (status 401)
      if (error?.status === 401) {
        dispatch({
          type: actionTypes.GET_ALL_USER_FAIL,
          payload: error?.data?.message || "Unauthorized access",
        });
      }

      return error; // Return error object
    }
  };
};

export const login = (payload: any, dispatch: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: actionTypes.LOGIN_INIT,
    });

    try {
      const response: any = await apiPost("login", payload);
      if (response.status === 201) {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: response.data,
        });
        return response.data;
      } else {
        dispatch({
          type: actionTypes.LOGIN_FAIL,
          payload: response?.data?.message,
        });
        return response.data;
      }
    } catch (error: any) {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        payload: error?.data?.message,
      });
      return error;
    }
  };
};

export const register = (payload: any, dispatch: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: actionTypes.LOGIN_INIT,
    });

    try {
      const response: any = await apiPost("register", payload);
      if (response.status === 201) {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: response.data,
        });
        return response.data;
      } else {
        dispatch({
          type: actionTypes.LOGIN_FAIL,
          payload: response?.data?.message,
        });
        return response.data;
      }
    } catch (error: any) {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        payload: error?.data?.message,
      });
      return error;
    }
  };
};

export const me = (payload: any, dispatch: any) => {
  const token = localStorage.getItem("token");
  return async (dispatch: any) => {
    dispatch({
      type: actionTypes.LOGIN_INIT,
    });

    try {
      const response: any = await apiGet("me", token);
      console.log("response", response);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.AUTH_SUCCESS,
          payload: response.data,
        });
        return response.data;
      } else {
        dispatch({
          type: actionTypes.AUTH_FAIL,
          payload: response?.data?.message,
        });
        return response.data;
      }
    } catch (error: any) {
      dispatch({
        type: actionTypes.AUTH_FAIL,
        payload: error?.data?.message,
      });
      return error;
    }
  };
};
