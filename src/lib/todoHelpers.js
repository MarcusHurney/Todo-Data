export const addTodo = (list, item) => [ ...list, item ];

export const generateId = () => Math.floor(Math.random() * 100000);

export const findById = (id, list) => list.find(item => item.id === id);

export const toggleTodo = todo => ({ ...todo, selected: !todo.selected });

export const updateImportance = (todo, newImportance) => ({ ...todo, importance: newImportance });

export const updatePercent = (todo, newPercent) => ({ ...todo, percentComplete: newPercent });

export const updateTime = (todo, newTime) => ({ ...todo, time: newTime });

export const updateTitle = (todo, newTitle) => ({ ...todo, title: newTitle });

export const updateTodos = (list, updatedTodo) => {
  // find out where in the list is the todo thats been updated
  const updatedIndex = list.findIndex(item => item.id === updatedTodo.id);

  // return a new array of all elements up to the updatedTodo,
  // the updatedTodo itself
  // and the rest of the items in the list
  return [
    ...list.slice(0, updatedIndex),
    updatedTodo,
    ...list.slice(updatedIndex + 1)
  ];
};

export const removeTodo = (list, id) => {
  const removeIndex = list.findIndex(item => item.id === id);
  return [
    ...list.slice(0, removeIndex),
    ...list.slice(removeIndex + 1)
  ];
};
