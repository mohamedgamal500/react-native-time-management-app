import { createStore } from "redux";
import todosReducer from "./reducers/todos";

// store
const store = createStore(todosReducer);

export default store;
