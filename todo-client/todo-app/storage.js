export const getTodoList = (owner) => {
  const arr = JSON.parse(localStorage.getItem(owner));
  return arr ? arr : [];
}

export const createTodoItem = ({ name, owner }) => {
  const arr = getTodoList(owner);
  arr.push({ name, owner, })
  localStorage.setItem(owner, JSON.stringify(arr));
  return { name, owner };
};

export const switchTodoItemDone = (todoItem) => {
  const arr = getTodoList(todoItem.owner);
  const index = arr.findIndex(item => item.name === todoItem.name)
  arr[index] = { ...arr[index], done: todoItem.done };
  localStorage.setItem(todoItem.owner, JSON.stringify(arr));
  console.log('выполнено')
};

export const deleteTodoItem = ({ todoItem, element }) => {
  if (confirm('Вы уверены?')) {
    element.remove();
    let arr = getTodoList(todoItem.owner);
    const index = arr.findIndex(item => item.name === todoItem.name)
    arr.splice(index, 1);
    localStorage.setItem(todoItem.owner, JSON.stringify(arr));
  }
};
