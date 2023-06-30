export const getTodoList = async (owner) => {
  const response = await fetch(
    `http://localhost:3000/api/todos?owner=${owner}`,
  );
  return await response.json();
};

export const createTodoItem = async ({ name, owner }) => {
  const response = await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      owner,
    }),
  });
  return await response.json();
};

export const switchTodoItemDone = (todoItem) => {
  todoItem.done = !todoItem.done;
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ done: !todoItem.done }),
  });
};

export const deleteTodoItem = ({ todoItem, element }) => {
  if (confirm('Вы уверены?')) {
    element.remove();
    fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
      method: 'DELETE',
    });
  }
};
