async function addTodo(event) {
    event.preventDefault();
    const text = document.getElementById("todo-input")
    const todoRef = await db.collection("todo-items").add({
        text: text.value,
        status: "active"
    })
    text.value = "";
}

function spanActiveListener () {
    const spans = document.querySelectorAll(".items-statuses span")
    spans.forEach((element) => {
        element.addEventListener("click", () => {
            spans.forEach(span => {
                span.classList.remove("active")
            })
            element.classList.add("active")
        })
    })
}

async function getAllTodos() {
    await db.collection("todo-items").onSnapshot(snapshot => {
        let todos = [];
        snapshot.docs.forEach(doc => {
            todos.push({
                id: doc.id,
                ...doc.data()
            })
        })
        spanActiveListener();
        generateTodos(todos);
    })
}

function generateTodos(todos) {
    let todosHTML = "";
    todos.forEach(todo => {
        todosHTML += 
        `<div class="todo-item">
            <div class="check">
                <div data-id=${todo.id} class="check-mark ${todo.status === "completed" ? "checked" : ""}">
                    <img src="./assets/icon-check.svg" />
                </div>
            </div>
            <div class="todo-text ${todo.status === "completed" ? "checked" : ""}">
                ${todo.text}
            </div>
        </div>`
    })
    document.querySelector(".todo-items").innerHTML = todosHTML;
    createEventListener();
}

async function showActiveTodos() {
    await db.collection("todo-items")
        .where("status", "==", "active")
        .get()
        .then(querySnapshot => {
        let activeTodos = []
        querySnapshot.forEach(todo => {
            activeTodos.push({
                id: todo.id,
                ...todo.data()
            })
        })
        generateTodos(activeTodos)
    })
}

function createEventListener() {
    const todoCheckMarks = document.querySelectorAll(".todo-item .check-mark");
    todoCheckMarks.forEach(checkMark => {
        checkMark.addEventListener("click", () => {
            markCompleted(checkMark.dataset.id)
        })
    })
}

async function markCompleted(id) {
    const todo = await db.collection("todo-items").doc(id);
        todo.get().then(doc => {
            if (doc.exists) {
                let status = doc.data().status;
                    if (status === "active") {
                        todo.update({
                            status: "completed"
                        })
                    } else if (status === "completed") {
                        todo.update({
                            status: "active"
                        })
                    }
            }
    })
}



getAllTodos()