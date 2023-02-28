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
        list.classList.add('group-list');
        return list;
    }

    document.addEventListener('DOMContentLoaded', function() {
        let container = document.getElementById('todo-app');

        let todoAppTitle = createAppTitle('Список задач');
        let todoAppForm = createTodoItemForm();
        let todoAppList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoAppForm.form);
        container.append(todoAppList);
    });
})();