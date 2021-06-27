const todosReducer = (state = [], action) => {
  switch (action.type) {
    case "addTodo":
      return action.payload;
    case "deleteTodo":
      return action.payload;
    case "updateTodo":
      return action.payload;
    case "getTodo":
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
