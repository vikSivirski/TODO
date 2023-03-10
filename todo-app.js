(function () {
    let itemArr = [];
    let listName = ''
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
        button.disabled = true;

        input.addEventListener('input', function() {
            if (input.value !== "") {
                button.disabled = false;
            } else {
                button.disabled = true;
            }
        })



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

    function createTodoItem(object) {
        // Создаем элементы списка
        let item = document.createElement('li');
        let groupBtn = document.createElement('div');
        let doneBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');

        // Добавляем элементу списка класс bootstrap и присваиваем ему значение из объекта
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = object.name;

        // Добавляем кнопкам взаимодействия с элементом классы bootstrap
        groupBtn.classList.add('btn-group', 'btn-group-sm');
        doneBtn.classList.add('btn', 'btn-success');
        doneBtn.textContent = 'Готово';
        deleteBtn.classList.add('btn', 'btn-danger');
        deleteBtn.textContent = 'Удалить';

        
        doneBtn.addEventListener('click', function () {
            item.classList.toggle('list-group-item-success');
            let currentId = object.id;
            for (listItem of itemArr) {
                if (listItem.id == currentId) {
                    listItem.done = !listItem.done
                }
            }
            saveList(itemArr, listName);
            console.log(itemArr)
        });
        if (object.done == true) {
            item.classList.add('list-group-item-success');
        }
        deleteBtn.addEventListener('click', function () {
            if (confirm('Вы уверены?')) {
                item.remove();
                let currentId = object.id;
                for (let i = 0; i < itemArr.length; i++) {
                    const obj = itemArr[i];
                    if (obj.id === currentId) {
                        itemArr.splice(i, 1);
                    };
                }; 
                saveList(itemArr, listName);               
                console.log(itemArr);
            }
        });

        // Помещаем все элементы в соответствующие блоки
        groupBtn.append(doneBtn);
        groupBtn.append(deleteBtn);
        item.append(groupBtn);

        // Возвращаем элементы в виде объектов
        return { doneBtn, deleteBtn, item };
    }

    function saveList (arr, keyName) {
        let jsonArr = JSON.stringify(arr);
        localStorage.setItem(keyName, jsonArr);
    }

    //Пишем функцию создания задачи
    function createTodoApp(container, title = 'Список задач', keyName) {
        let todoAppTitle = createAppTitle(title);
        let todoAppForm = createTodoItemForm();
        let todoAppList = createTodoList();

        listName = keyName;

        let localData = localStorage.getItem(listName);
        if (localData !== null && localData !== '') {
            itemArr = JSON.parse(localData);
        }
        for (itemList of itemArr) {
            let todoItem = createTodoItem(itemList);
            todoAppList.append(todoItem.item);
        }

        container.append(todoAppTitle);
        container.append(todoAppForm.form);
        container.append(todoAppList);

        //Создаем обрабтчик события отправки формы и проверяем форму на заполненность

        todoAppForm.form.addEventListener('submit', function (e) {
            
            //Сбрасываем стандартное действия браузера при отпрвке формы
            e.preventDefault();
            
            
            //Поверяем заполненность формы, если форма пустая, код не выполняется
            if (!todoAppForm.input.value) {
                return;
            };
            
            let task = {
                id: Math.round(Math.random() * 10000),
                name: todoAppForm.input.value,
                done: false,
            }
            
            let todoItem = createTodoItem(task);
            todoItem.item.setAttribute('id', task.id);

            //Помещаем задачу в список и объект с данными задачи 

            todoAppList.append(todoItem.item);

            todoAppForm.input.value = '';
            todoAppForm.button.disabled = true;
            itemArr.push(task);
            console.log(itemArr);
            saveList(itemArr, listName);
        })

    }

    window.createTodoApp = createTodoApp;

})();