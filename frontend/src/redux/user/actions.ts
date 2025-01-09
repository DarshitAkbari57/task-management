import * as actionTypes from "../ActionTypes";
import { apiGet, apiPost } from "../axios";

// export const GetUsers = (
//   dispatch: DispatchType
// ): Promise<User | ErrorResponse | void> => {
//   return async (dispatch) => {
//     // Dispatch the INIT action
//     dispatch({
//       type: actionTypes.GET_USER_INIT,
//     });

//     try {
//       // Perform the GET request
//       const response = await apiGet<User>(`me`);

//       if (response.status === 200) {
//         // Dispatch success action with user data
//         dispatch({
//           type: actionTypes.GET_USER_SUCCESS,
//           payload: response.data,
//         });
//         return response.data; // Return user data
//       } else {
//         // Dispatch fail action if response status is not 200
//         dispatch({
//           type: actionTypes.GET_USER_FAIL,
//           payload: response?.data?.message || "Unknown error",
//         });
//         return response.data; // Return error message
//       }
//     } catch (error) {
//       console.log("error", error);

//       // Handle unauthorized error (status 401)
//       if (error?.status === 401) {
//         dispatch({
//           type: actionTypes.GET_USER_FAIL,
//           payload: error?.data?.message || "Unauthorized access",
//         });
//       }

//       return error; // Return error object
//     }
//   };
// };

export const login = (payload, dispatch) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.LOGIN_INIT,
    });

    try {
      const response = await apiPost("login", payload);
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
    } catch (error) {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        payload: error?.data?.message,
      });
      return error;
    }
  };
};
