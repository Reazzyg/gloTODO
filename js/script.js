const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const todoRemove = document.querySelector('.todo-remove');

let toDoData = [];

const setLocalStorage = function (data) {
  window.localStorage.setItem('todos', JSON.stringify(data));
};

const render = function () {
  todoList.innerHTML = '';
  todoCompleted.innerHTML = '';
  toDoData.forEach((el) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `<span class="text-todo">${el.text}</span>
                    <div class="todo-buttons">
                    <button class="todo-remove"></button>
                    <button class="todo-complete"></button>
                    </div>`;
    if (el.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector('.todo-complete').addEventListener('click', function () {
      el.completed = !el.completed;
      render();
      setLocalStorage(toDoData);
    });

    li.querySelector('.todo-remove').addEventListener('click', function () {
      li.remove();
      toDoData.pop(el);
      setLocalStorage(toDoData);
    });
  });
};

todoControl.addEventListener('submit', function (e) {
  e.preventDefault();
  if (headerInput.value.trim() !== '') {
    const newToDo = {
      text: headerInput.value,
      completed: false,
    };

    toDoData.push(newToDo);
    headerInput.value = '';

    render();
    setLocalStorage(toDoData);
  }
});

const storedTodos = window.localStorage.getItem('todos');
if (storedTodos) {
  toDoData = JSON.parse(storedTodos);
  render();
}
