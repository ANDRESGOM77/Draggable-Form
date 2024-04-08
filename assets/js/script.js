// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    if (nextId === null) {
        nextId = 1
    } else {
        nextId++
    }

    localStorage.setItem('nextId', JSON.stringify(nextId))
    return nextId
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    let card = $('<div>').addClass('taskCard draggable card');
    let title = $('<h2>').addClass('card-title').text(task.title)
    let dueDate = $('<p>').addClass('card-date').text(task.date)
    let textDescription= $('<p>').addClass('card-text').text(task.textDescription)
    let deleteBtn = $('<button>').addClass('btn btn-danger').text('Delete').attr('data-task-id', task.id)

    deleteBtn.on('click', handleDeleteTask)
    // card.append($('<p></p>').text(task.textDescription));

    card.append(title, dueDate,textDescription, deleteBtn);

    return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const todoList = $('#todo-cards');
    todoList.empty();
    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();
    const doneList = $('#done-cards');
    doneList.empty();

    for (let task of taskList) {
        if (task.status === 'toDo') {
           
            todoList.append(createTaskCard(task))
        } else if (task.status === 'inProgress') {
            inProgressList.append(createTaskCard(task))
        } else {
            doneList.append(createTaskCard(task))
        }
    }

    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,

        helper: function (e) {

            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable');

            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    let title = $('#title');
    let date = $('#date');
    let textDescription = $('#textDescription');

    const task = {
        id: generateTaskId(),
        title: title.val(),
        date: date.val(),
        textDescription: textDescription.val(),
        status: 'toDo'
    }

    taskList.push(task)
    localStorage.setItem('tasks', JSON.stringify(taskList))
    renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
