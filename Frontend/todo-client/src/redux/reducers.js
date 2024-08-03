import {
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAIL,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAIL,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAIL,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAIL,
} from "./actions";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TODOS_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case FETCH_TODOS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ADD_TODO_REQUEST:
      return { ...state, loading: true };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      };
    case ADD_TODO_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_TODO_REQUEST:
      return { ...state, loading: true };
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        ),
      };
    case UPDATE_TODO_FAIL:
      return { ...state, loading: false, error: action.payload };

    case DELETE_TODO_REQUEST:
      return { ...state, loading: true };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter((todo) => todo._id !== action.payload),
      };
    case DELETE_TODO_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default todoReducer;
