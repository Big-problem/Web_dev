const todoList = [];

function addTodo() {
    const inputElement = document.querySelector('.js-todo-input').value;
    if(inputElement === '') return;
    todoList.push(inputElement);
    console.log(todoList);

    document.querySelector('.js-todo-input').value = '';
}

function addTodoEnter(event) {
    if(event.key === 'Enter') addTodo();
}

function addTodo2() {
    const todoElement = document.querySelector('.js-todo-input2').value;
    if(todoElement === '') return;

    todoList.push(todoElement);
    let html = '';
    let todoHTML = '';
    for(let i = 0; i < todoList.length; i++){
        html = `<p>${todoList[i]}</p>`;  // Generating HTML
        todoHTML += html;      
    }
    document.querySelector('.js-todo-list').innerHTML = todoHTML;
    document.querySelector('.js-todo-input2').value = '';
}
function addTodoEnter2(event) {
    if(event.key === 'Enter') addTodo2();
}

function addTodo3() {
    const todoElement = document.querySelector('.js-todo-input3').value;
    const todoDate = document.querySelector('.js-todo-date').value;
    if(todoElement === '' || todoDate === '') return;

    todoList.push({name: todoElement, date: todoDate});
    showTodoList();
    document.querySelector('.js-todo-input3').value = '';
    document.querySelector('.js-todo-date').value = '';
}
function showTodoList() {
    let html = '';
    let todoHTML = '';
    for(let i = 0; i < todoList.length; i++){
        // const name = todoList[i].name;
        // const date = todoList[i].date;
        const {name, date} = todoList[i];
        html = `
        <div>${name}</div>
        <div>${date}</div>
        <button class="delete-btn" onclick="todoList.splice(${i}, 1); showTodoList()">Delete</button>
        `;  // Generating HTML
        todoHTML += html;      
    }
    document.querySelector('.js-todo-list3').innerHTML = todoHTML;
}
function addTodoEnter3(event) {
    if(event.key === 'Enter') addTodo3();
}