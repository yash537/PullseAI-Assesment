import axios from "../axiosConfig.js"; // Adjust path as needed

// Action Types
export const FETCH_TODOS_REQUEST = "FETCH_TODOS_REQUEST";
export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
export const FETCH_TODOS_FAIL = "FETCH_TODOS_FAIL";

export const ADD_TODO_REQUEST = "ADD_TODO_REQUEST";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const ADD_TODO_FAIL = "ADD_TODO_FAIL";

export const UPDATE_TODO_REQUEST = "UPDATE_TODO_REQUEST";
export const UPDATE_TODO_SUCCESS = "UPDATE_TODO_SUCCESS";
export const UPDATE_TODO_FAIL = "UPDATE_TODO_FAIL";

export const DELETE_TODO_REQUEST = "DELETE_TODO_REQUEST";
export const DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS";
export const DELETE_TODO_FAIL = "DELETE_TODO_FAIL";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";

export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAIL = "SIGNIN_FAIL";

// Action Creators
export const fetchTodos = () => async (dispatch) => {
  dispatch({ type: FETCH_TODOS_REQUEST });
  try {
    const response = await axios.get("/tasks");
    dispatch({ type: FETCH_TODOS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_TODOS_FAIL, payload: error.message });
  }
};

export const addTodo = (todo) => async (dispatch) => {
  dispatch({ type: ADD_TODO_REQUEST });
  try {
    const response = await axios.post("/tasks", todo);
    dispatch({ type: ADD_TODO_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ADD_TODO_FAIL, payload: error.message });
  }
};

export const updateTodo = (todo) => async (dispatch) => {
  dispatch({ type: UPDATE_TODO_REQUEST });
  try {
    const response = await axios.put(`/tasks/${todo._id}`, todo);
    dispatch({ type: UPDATE_TODO_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_TODO_FAIL, payload: error.message });
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  dispatch({ type: DELETE_TODO_REQUEST });
  try {
    await axios.delete(`/tasks/${id}`);
    dispatch({ type: DELETE_TODO_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_TODO_FAIL, payload: error.message });
  }
};

export const signup = (userData) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const response = await axios.post("/signup", userData);
    dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: SIGNUP_FAIL, payload: error.message });
  }
};

export const signin = (userData) => async (dispatch) => {
  dispatch({ type: SIGNIN_REQUEST });
  try {
    const response = await axios.post("/signin", userData);
    dispatch({ type: SIGNIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: SIGNIN_FAIL, payload: error.message });
  }
};
