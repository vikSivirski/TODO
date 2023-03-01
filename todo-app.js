(function() {
    function createAppTitle (title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm () {

        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Добавьте новую задачу';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить задачу';
        
        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {form, input, button};
    }

    function createTodoList () {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }
    
    function createTodoItem (task) {
        let item = document.createElement('li');

        let groupBtn = document.createElement('div');
        let doneBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');
        
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = task;

        groupBtn.classList.add('btn-group', 'btn-group-sm');
        doneBtn.classList.add('btn', 'btn-success');
        doneBtn.textContent = 'Готово';
        deleteBtn.classList.add('btn', 'btn-danger');
        deleteBtn.textContent = 'Удалить';

        groupBtn.append(doneBtn);
        groupBtn.append(deleteBtn);
        item.append(groupBtn);

        return {doneBtn, deleteBtn, item};
    }

    function createTodoApp (container, title = 'Список задач') {
        let todoAppTitle = createAppTitle(title);
        let todoAppForm = createTodoItemForm();
        let todoAppList = createTodoList();
        
        container.append(todoAppTitle);
        container.append(todoAppForm.form);
        container.append(todoAppList);

        todoAppForm.form.addEventListener('submit', function(e) {
    
            e.preventDefault();
    
            if (!todoAppForm.input.value) {
                return;
            };

            let todoItem = createTodoItem(todoAppForm.input.value);

            todoItem.doneBtn.addEventListener('click', function() {
                todoItem.item.classList.toggle('list-group-item-success');
            });
            todoItem.deleteBtn.addEventListener('click', function() {
                if(confirm('Вы уверены?')) {
                    todoItem.item.remove();
                }
            });

            todoAppList.append(todoItem.item);
    
            // todoAppList.append(createTodoItem(todoAppForm.input.value).item);
            todoAppForm.input.value = '' 
        })
    }

    // document.addEventListener('DOMContentLoaded', function() {
    //     createTodoApp(document.getElementById('my-todos'), 'Мои дела');
    //     createTodoApp(document.getElementById('mom-todos'), 'Дела мамы');
    //     createTodoApp(document.getElementById('dad-todos'), 'Жела папы');
    // });
    window.createTodoApp = createTodoApp;

})();