const todoList = [{ name: "make dinner", dueDate: "17-08-2025" }];
renderTodoList();
function renderTodoList() {
  let todoListHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    //const name = todoObject.name;
    //const { name } =todoObject; (shortcut for above line via destructuring)
    //const dueDate = todoObject.dueDate;
    //const { dueDate } =todoObject; (shortcut for above line via destructuring)
    const { name, dueDate } = todoObject;
    const html = `
      <div class="name" >${name}</div>
      <div class="dueDate" >${dueDate}</div>
      <button class="delete-button" onclick="
        todoList.splice(${i},1);
        renderTodoList();
      ">Delete</button>
    `;
    todoListHTML += html;
  }
  document.querySelector(".js-Todo-List").innerHTML = todoListHTML;
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
