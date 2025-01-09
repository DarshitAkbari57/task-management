import { apiDelete, apiGet, apiPost, apiPut } from "../axios";
import * as actionTypes from "../ActionTypes";
import { generatePopup } from "../../utility/popup";

export const createTask: any = (payload: any) => {
  const token = localStorage.getItem("token");
  return async (dispatch: any) => {
    dispatch({
      type: actionTypes.ADD_TASK_INIT,
    });

    try {
      const response: any = await apiPost("tasks", payload, token);
      if (response.status === 201) {
        dispatch({
          type: actionTypes.ADD_TASK_SUCCESS,
          payload: response.data,
        });
        generatePopup("success", response?.data?.message);
        return response.data;
      } else {
        dispatch({
          type: actionTypes.ADD_TASK_FAIL,
          payload: response?.data?.message,
        });
        return response.data;
      }
    } catch (error: any) {
      console.log("error", error);
      if (error?.status === 404) {
        dispatch({
          type: actionTypes.ADD_TASK_FAIL,
          payload: error?.data?.message,
        });
        generatePopup("error", error?.data?.message);
      } else if (error?.status === 403) {
        dispatch({
          type: actionTypes.ADD_TASK_FAIL,
          payload: error?.data?.message,
        });
        generatePopup("error", error?.data?.message);
      } else if (error?.status === 400) {
        dispatch({
          type: actionTypes.ADD_TASK_FAIL,
          payload: error?.data?.message,
        });
        generatePopup("error", error?.data?.message);
      }
      return error;
    }
  };
};

export const GetAllTask: any = () => {
  const token = localStorage.getItem("token");
  return async (dispatch: any) => {
    dispatch({
      type: actionTypes.GET_ALL_TASK_INIT,
    });

    try {
      const response: any = await apiGet("tasks", token);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.GET_ALL_TASK_SUCCESS,
          payload: response.data,
        });
        return response.data;
      } else {
        dispatch({
          type: actionTypes.GET_ALL_TASK_FAIL,
          payload: response?.data?.message,
        });
        return response.data;
      }
    } catch (error: any) {
      console.log("error", error);
      if (error?.status === 401) {
        dispatch({
          type: actionTypes.GET_ALL_TASK_FAIL,
          payload: error?.data?.message,
        });
        localStorage.clear();
        generatePopup("error", error?.data?.message);
      }
      return error;
    }
  };
};

export const GetMyTask: any = () => {
  const token = localStorage.getItem("token");
  return async (dispatch: any) => {
    dispatch({
      type: actionTypes.GET_ALL_TASK_INIT,
    });

    try {
      const response: any = await apiGet("tasks/my", token);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.GET_ALL_TASK_SUCCESS,
          payload: response.data,
        });
        return response.data;
      } else {
        dispatch({
          type: actionTypes.GET_ALL_TASK_FAIL,
          payload: response?.data?.message,
        });
        return response.data;
      }
    } catch (error: any) {
      console.log("error", error);
      if (error?.status === 401) {
        dispatch({
          type: actionTypes.GET_ALL_TASK_FAIL,
          payload: error?.data?.message,
        });
        localStorage.clear();
        generatePopup("error", error?.data?.message);
      }
      return error;
    }
  };
};

export const UpdateTask: any = (payload: any, id: any) => {
  const token = localStorage.getItem("token");
  return async (dispatch: any) => {
    dispatch({
      type: actionTypes.UPDATE_TASK_INIT,
    });

    try {
      const response: any = await apiPut(`tasks/${id}`, payload, token);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.UPDATE_TASK_SUCCESS,
          payload: response.data,
        });
        return response.data;
      } else {
        dispatch({
          type: actionTypes.UPDATE_TASK_FAIL,
          payload: response?.data?.message,
        });
        return response.data;
      }
    } catch (error: any) {
      console.log("error", error);
      if (error?.status === 404) {
        dispatch({
          type: actionTypes.UPDATE_TASK_FAIL,
          payload: error?.data?.message,
        });
        generatePopup("error", error?.data?.message);
      } else if (error?.status === 401) {
        dispatch({
          type: actionTypes.UPDATE_TASK_FAIL,
          payload: error?.data?.message,
        });
        localStorage.clear();
        generatePopup("error", error?.data?.message);
      }
      return error;
    }
  };
};

export const UpdateTaskStatus: any = (payload: any, id: any) => {
  console.log("payload", payload);
  const token = localStorage.getItem("token");
  return async (dispatch: any) => {
    dispatch({
      type: actionTypes.UPDATE_TASK_STATUS_INIT,
    });

    try {
      const response: any = await apiPut(`tasks/${id}/status`, payload, token);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.UPDATE_TASK_STATUS_SUCCESS,
          payload: response.data,
        });
        return response.data;
      } else {
        dispatch({
          type: actionTypes.UPDATE_TASK_STATUS_FAIL,
          payload: response?.data?.message,
        });
        return response.data;
      }
    } catch (error: any) {
      console.log("error", error);
      if (error?.status === 404) {
        dispatch({
          type: actionTypes.UPDATE_TASK_STATUS_FAIL,
          payload: error?.data?.message,
        });
        generatePopup("error", error?.data?.message);
      } else if (error?.status === 401) {
        dispatch({
          type: actionTypes.UPDATE_TASK_STATUS_FAIL,
          payload: error?.data?.message,
        });
        localStorage.clear();
        generatePopup("error", error?.data?.message);
      }
      return error;
    }
  };
};

export const DeleteTask: any = (id: any) => {
  const token = localStorage.getItem("token");
  return async (dispatch: any) => {
    dispatch({
      type: actionTypes.DELETE_TASK_INIT,
    });

    try {
      const response: any = await apiDelete(`tasks/${id}`, token);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.DELETE_TASK_SUCCESS,
          payload: response.data,
        });
        return response.data;
      } else {
        dispatch({
          type: actionTypes.DELETE_TASK_FAIL,
          payload: response?.data?.message,
        });
        return response.data;
      }
    } catch (error: any) {
      console.log("error", error);
      if (error?.status === 404) {
        dispatch({
          type: actionTypes.DELETE_TASK_FAIL,
          payload: error?.data?.message,
        });
        generatePopup("error", error?.data?.message);
      } else if (error?.status === 401) {
        dispatch({
          type: actionTypes.DELETE_TASK_FAIL,
          payload: error?.data?.message,
        });
        localStorage.clear();
        generatePopup("error", error?.data?.message);
      }
      return error;
    }
  };
};
