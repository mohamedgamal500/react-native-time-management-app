export const addTodo = (todos) => {
  return {
    type: "addTodo",
    payload: todos,
  };
};

export const deleteTodo = (todos) => {
  return {
    type: "deleteTodo",
    payload: todos,
  };
};

export const updateTodo = (todos) => {
  return {
    type: "updateTodo",
    payload: todos,
  };
};

export const getTodo = (todos) => {
  return {
    type: "getTodo",
    payload: todos,
  };
};
