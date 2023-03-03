(function () {
    //Пишем функцию для заголовка
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }
    //Пишем функцию для создания формы
    function createTodoItemForm() {

        //Создвем элементы формы
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        //Добавляем эелементам классы bootstrap
        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Добавьте новую задачу';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить задачу';

        //Добавляем элементы в форму
        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        //Возвращаем элементы в виде объектов
        return { form, input, button };
    }

    //Пишем функцию создаения списка 
    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(task, done) {
        // Создаем элементы списка
        let item = document.createElement('li');
        let groupBtn = document.createElement('div');
        let doneBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');

        // Добавляем элементу списка класс bootstrap и присваиваем ему значение из объекта
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = task;

        // Если задача выполнена, добавляем соответствующий класс
        if (done) {
            item.classList.add('list-group-item-success');
        }

        // Добавляем кнопкам взаимодействия с элементом классы bootstrap
        groupBtn.classList.add('btn-group', 'btn-group-sm');
        doneBtn.classList.add('btn', 'btn-success');
        doneBtn.textContent = 'Готово';
        deleteBtn.classList.add('btn', 'btn-danger');
        deleteBtn.textContent = 'Удалить';

        // Помещаем все элементы в соответствующие блоки
        groupBtn.append(doneBtn);
        groupBtn.append(deleteBtn);
        item.append(groupBtn);

        // Возвращаем элементы в виде объектов
        return { doneBtn, deleteBtn, item };
    }

    //Пишем функцию создания задачи
    function createTodoApp(container, title = 'Список задач') {
        let todoAppTitle = createAppTitle(title);
        let todoAppForm = createTodoItemForm();
        let todoAppList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoAppForm.form);
        container.append(todoAppList);

        //Создаем обрабтчик события отправки формы
        if (!todoAppForm.input.value) {
            todoAppForm.button.disabled = true;
        }

        todoAppForm.input.addEventListener('input', function () {
            todoAppForm.button.disabled = false;
            let itemArr = [];

            todoAppForm.form.addEventListener('submit', function (e) {

                //Сбрасываем стандартное действия браузера при отпрвке формы
                e.preventDefault();


                //Поверяем заполненность формы, если форма пустая, код не выполняется
                if (!todoAppForm.input.value) {
                    return;
                };


                let todoItem = createTodoItem(todoAppForm.input.value);

                //Создаем обработчики событий для взаимодействия с задачей
                todoItem.doneBtn.addEventListener('click', function () {
                    todoItem.item.classList.toggle('list-group-item-success');
                });
                todoItem.deleteBtn.addEventListener('click', function () {
                    if (confirm('Вы уверены?')) {
                        todoItem.item.remove();
                    }
                });

                //Помещаем задачу в список
                todoAppList.append(todoItem.item);


                todoAppForm.input.value = ''
                if (!todoAppForm.input.value) {
                    todoAppForm.button.disabled = true;
                }
            })
        })

    }

    window.createTodoApp = createTodoApp;

})();