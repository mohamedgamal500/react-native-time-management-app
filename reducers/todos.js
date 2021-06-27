const todosReducer = (
  state = [
    {
      text: "study react",
      key: "1",
      completed: false,
    },
    {
      text: "study electron",
      key: "2",
      completed: true,
    },
  ],
  action
) => {
  switch (action.type) {
    case "addTodo":
      return action.payload;
    case "deleteTodo":
      return action.payload;
    case "updateTodo":
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
