const todoList = [{ name: "Exercise", dueDate: "2026-01-04" }];

document.querySelector('.js-add-button').addEventListener('click' , () => {
  addTodo();
});//same as "onclick=addTodo()"

renderTodoList();

function renderTodoList() {
  let todoListHTML = "";
  
  todoList.forEach(function (todoObject) {
    const { name, dueDate } = todoObject;
    const html = `
      <div class="name" >${name}</div>
      <div class="dueDate" >${dueDate}</div>
      <button class="delete-button js-delete-button"
      ">Delete</button>
    `;
    todoListHTML += html;
  });

  document.querySelector(".js-Todo-List").innerHTML = todoListHTML;//creates the above code in `...`

  document.querySelectorAll(".js-delete-button") //querySelectorAll to get 'list' all delete buttons on page
  .forEach((deletebutton,index) => { // we go through the 'list' by using forEach loop 
    deletebutton.addEventListener('click', () => { //for each delete button we added a event listener which makes it work like 'onclick' 
      todoList.splice(index,1);
      renderTodoList();
    });
  });
}

function addTodo() {
  const inputElement = document.querySelector(".js-name-input");
  const name = inputElement.value;
  const dateInputElement = document.querySelector(".js-dueDate-input");
  const dueDate = dateInputElement.value;

  todoList.push({ name: name, dueDate: dueDate });

  inputElement.value = "";
  renderTodoList();
}