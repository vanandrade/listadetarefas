document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("task-list");
    const addTaskButton = document.getElementById("add-task");

    // Função para adicionar tarefas na lista
    function addTask(name, cost, deadline, order) {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${name} - R$${cost} - ${deadline}</span>
            <div>
                <button onclick="editTask(this)">Editar</button>
                <button onclick="deleteTask(this)">Excluir</button>
            </div>
        `;
        taskItem.dataset.order = order;

        // Destaca tarefas com custo acima de R$1000,00
        if (cost >= 1000) taskItem.classList.add("expensive");

        taskList.appendChild(taskItem);
    }

    // Função para editar tarefas
    function editTask(button) {
        const taskItem = button.closest("li");
        const newName = prompt("Novo nome da tarefa:", taskItem.children[0].innerText);
        if (newName) {
            taskItem.children[0].innerText = newName;
        }
    }

    // Função para excluir tarefas
    function deleteTask(button) {
        if (confirm("Deseja realmente excluir esta tarefa?")) {
            const taskItem = button.closest("li");
            taskList.removeChild(taskItem);
        }
    }

    // Adiciona tarefas de exemplo
    addTask("Tarefa 1", 500, "2024-12-10", 1);
    addTask("Tarefa 2", 1500, "2024-11-25", 2);
    addTask("Tarefa 3", 300, "2024-10-18", 3);

    // Evento para adicionar nova tarefa
    addTaskButton.addEventListener("click", () => {
        const name = prompt("Nome da Tarefa:");
        const cost = parseFloat(prompt("Custo (R$):"));
        const deadline = prompt("Data Limite (AAAA-MM-DD):");
        if (name && cost && deadline) {
            addTask(name, cost, deadline, taskList.children.length + 1);
        }
    });
});
