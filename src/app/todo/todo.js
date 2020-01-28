import React, { useState, useEffect } from 'react';
import './todo.css';


function Task({ task, index, completeTask, removeTask }) {
    return (
        <div
            className="task"
            style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
            {task.title}

            <button style={{ background: "red", width: "5%" }} onClick={() => removeTask(index)}>X</button>
            <button onClick={() => completeTask(index)}>Complete</button>

        </div>
    );
}

function CreateTask({ addTask }) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTask(value);
        setValue("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                placeholder="Add a new task"
                onChange={e => setValue(e.target.value)}
            />
        </form>
    );
}

function Todo() {
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [tasks, setTasks] = useState([
        {
            title: "Create an app using create-react-app CLI tool",
            completed: true
        },
        {
            title: "Style app",
            completed: true
        },
        {
            title: "Add functionality",
            completed: false
        },
        {
            title: "Use useEffect state Hook to update the number of pending tasks",
            completed: false
        }
    ]);

    useEffect(() => { setTasksRemaining(tasks.filter(task => !task.completed).length) });


    const addTask = title => {
        const newTasks = [...tasks, { title, completed: false }];
        setTasks(newTasks);
    };

    const completeTask = index => {
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks);
    };

    const removeTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    return (
        <div className="todo-container">
            <div className="header">Todos ({tasksRemaining})</div>

            <div className="create-task" >
                <CreateTask addTask={addTask} />
            </div>

            <div className="tasks">
                {tasks.map((task, index) => (
                    <Task
                        task={task}
                        index={index}
                        completeTask={completeTask}
                        removeTask={removeTask}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
}

export default Todo;