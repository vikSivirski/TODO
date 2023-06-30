const container = document.getElementById('TODO');
let todoList = createTodoList();

function createAppTitle(title) {
  const appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
}

function createTodoItemForm() {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const buttonWrapper = document.createElement('div');
  const button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Добавьте новую задачу';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить задачу';
  button.disabled = true;

  input.addEventListener('input', function () {
    if (input.value !== '') {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return { form, input, button };
}

function createSwitchStorrageButton(owner) {
  const button = document.createElement('button');
  const localString = 'Перейти на локальное хранилище';
  const srvString = 'Перейти на серверное хранилище';

  const currentStorage = JSON.parse(localStorage.getItem('current-storage'));
  button.classList.add('btn', currentStorage ? 'btn-secondary' : 'btn-primary', 'mb-3');
  button.textContent = currentStorage ? localString : srvString;

  button.addEventListener('click', (e) => {
    const currentStorage = JSON.parse(localStorage.getItem('current-storage'));
    button.textContent = !currentStorage ? localString : srvString;
    button.classList.toggle('btn-secondary');
    button.classList.toggle('btn-primary');
    localStorage.setItem('current-storage', JSON.stringify(!currentStorage));
    refreshList(owner);
  });
  return button;
}

function createTodoList() {
  let list = document.querySelector('ul');
  if (list) list.remove();
  list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
}

function createTodoItemElement(itemObject, { onDone, onDelete }) {
  if (!itemObject.name) {
    return;
  }

  const doneClass = 'list-group-item-success';

  const item = document.createElement('li');
  const buttonGroup = document.createElement('div');
  const doneButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  if (itemObject.done) {
    item.classList.add(doneClass);
  }

  item.classList.add(
    'list-group-item',
    'd-flex',
    'justify-content-between',
    'align-items-center'
  );
  item.textContent = itemObject.name;

  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  doneButton.addEventListener('click', () => {
    itemObject.done = !itemObject.done;
    onDone(itemObject);
    item.classList.toggle(doneClass);
  });


  deleteButton.addEventListener('click', function () {
    onDelete({ todoItem: itemObject, element: item });
  });

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  return item;
}

const refreshList = async (owner) => {
  todoList = createTodoList();
  const currentStorage = JSON.parse(localStorage.getItem('current-storage'));
  const { switchTodoItemDone, deleteTodoItem, getTodoList } = currentStorage
    ? await import('./api.js') : await import('./storage.js');
  const todoItemList = await getTodoList(owner);
  const handlers = {
    onDone: switchTodoItemDone,
    onDelete: deleteTodoItem,
  };

  todoItemList.forEach((todoItem) => {
    const todoItemElement = createTodoItemElement(todoItem, handlers);
    todoList.append(todoItemElement);
  });
  container.append(todoList);
};

async function createTodoApp(title, owner) {
  const todoAppTitle = createAppTitle(title);
  const todoAppForm = createTodoItemForm();
  const switchStorageBtn = createSwitchStorrageButton(owner)

  container.append(switchStorageBtn);
  container.append(todoAppTitle);
  container.append(todoAppForm.form);
  container.append(todoList); // Добавляем пустой список в контейнер

  refreshList(owner);

  todoAppForm.form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!todoAppForm.input.value) {
      return;
    }

    const currentStorage = JSON.parse(localStorage.getItem('current-storage'));
    const { switchTodoItemDone, deleteTodoItem, createTodoItem } =
      currentStorage
        ? await import('./api.js')
        : await import('./storage.js');
    const handlers = {
      onDone: switchTodoItemDone,
      onDelete: deleteTodoItem,
    };

    const todoItem = await createTodoItem({
      name: todoAppForm.input.value.trim(),
      owner,
    });

    const todoItemElement = createTodoItemElement(todoItem, handlers);
    todoList.append(todoItemElement);

    todoAppForm.input.value = '';
    todoAppForm.button.disabled = !todoAppForm.input.value;
  });
}

export default createTodoApp;
