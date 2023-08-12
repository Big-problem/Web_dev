const todoList = [];
const todoListFinal = [];

document.querySelector('.js-todo-button1').addEventListener('click', () => {
    addTodo();
});
document.querySelector('.js-todo-input').addEventListener('keydown', (event) => {
    addTodoEnter(event);
})

document.querySelector('.js-todo-button2').addEventListener('click', () => {
    addTodo2();
});
document.querySelector('.js-todo-input2').addEventListener('keydown', (event) => {
    addTodoEnter2(event);
})

document.querySelector('.js-todo-button3').addEventListener('click', () => {
    addTodo3();
});
document.querySelector('.js-todo-input3').addEventListener('keydown', (event) => {
    addTodoEnter3(event);
})
document.querySelector('.js-todo-date').addEventListener('keydown', (event) => {
    addTodoEnter3(event);
})
// #######################################
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

    todoListFinal.push({name: todoElement, date: todoDate});
    showTodoList();
    document.querySelector('.js-todo-input3').value = '';
    document.querySelector('.js-todo-date').value = '';
}
function showTodoList() {
    let html = '';
    let todoHTML = '';
    /*
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
    */
   // Use Array.forEach to loop an array
    todoListFinal.forEach((todoObject, i) => {
        const {name, date} = todoObject;
        html = `
        <div>${name}</div>
        <div>${date}</div>
        <button class="delete-btn js-delete-button">Delete</button>
        `;  // Generating HTML
        todoHTML += html;     
    });
    document.querySelector('.js-todo-list3').innerHTML = todoHTML;
    // HTML加進去後才能加eventListener
    // querySelectorAll可以找所有指定的目標 (return a Nodelist)
    const deleteButtonList = document.querySelectorAll('.js-delete-button');
    deleteButtonList.forEach((deleteButton, i) => {
        deleteButton.addEventListener('click', () => {
            todoListFinal.splice(i, 1);
            showTodoList();
        });
    });
}
function addTodoEnter3(event) {
    if(event.key === 'Enter') addTodo3();
}