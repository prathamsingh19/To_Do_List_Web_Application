import React, { useState } from 'react';
import './TodoList.css'; // Ensure you have your CSS imported
import '@fortawesome/fontawesome-free/css/all.min.css';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');

    const addTask = () => {
        if (taskTitle) {
            const newTask = {
                title: taskTitle,
                description: taskDescription,
                dueDate: taskDueDate,
                id: Date.now(),
                status: 'incompleted' // Add status property
            };
            setTasks([...tasks, newTask]);
            setTaskTitle('');
            setTaskDescription('');
            setTaskDueDate('');
        }
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const markAsCompleted = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, status: 'completed' } : task
        ));
    };

    const calculateCountdown = (dueDate) => {
        const now = new Date();
        const due = new Date(dueDate);
        const totalSeconds = Math.floor((due - now) / 1000);

        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        return { days, hours, minutes };
    };

    return (
        <div className="todo-list">
            <div className="add-task-section">
                <h1>Add Task</h1>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                />
                <textarea
                    placeholder="Task Description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                />
                <h3 className='dead-btn'>add due date & time</h3>
                <input
                    type="datetime-local"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                />
                <button className="add-button" onClick={addTask}>
                    <i className="fas fa-plus"></i> Add Task
                </button>
            </div>

            <div className="task-display-section">
                <h1>Tasks</h1>
                <div className="task-count-bar">
                    <span>{tasks.length}</span> Tasks
                </div>
                <ul className="task-list">
                    {tasks.map(task => {
                        const { days, hours, minutes } = calculateCountdown(task.dueDate);
                        return (
                            <li key={task.id} className="task-item">
                                <strong>{task.title}</strong>
                                <p>{task.description}</p>
                                <p>
                                    <em>
                                         <span>due:</span> {days}d {hours}h {minutes}m
                                    </em>
                                </p>
                                <p>
                                    <em> <span>Status:</span> {task.status}</em> {/* Display status */}
                                </p>
                                {task.status === 'incompleted' && (
                                    <button className="done-button" onClick={() => markAsCompleted(task.id)}>
                                         <i className="fas fa-check"></i> Done
                                    </button>
                                )}
                                <button className="delete-button" onClick={() => deleteTask(task.id)}>
                                    <i className="fas fa-trash"></i> Delete
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;