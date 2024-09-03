import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";


type PropsTodo = {
    tasks: TaskType[]
    title: string
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}
export const Todolist = ({tasks, title, deleteTask, changeFilter, addTask, changeTaskStatus}: PropsTodo) => {
    const [taskTitle, setTaskTitle] = useState('')

    const changeTaskStatusHandler = (taskId: string,e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(taskId, newStatusValue)
    }

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={(e) => {
                           setTaskTitle(e.currentTarget.value)}}
                onKeyUp={event => {
                    if(event.key ==='Enter') {
                        addTask(taskTitle) }
                }}
                />
                <button onClick={() => {
                    if (taskTitle.trim() !== '') {
                    addTask(taskTitle.trim())
                    setTaskTitle('')}
                }}>+
                </button>
            </div>
            {tasks.length === 0 ? <p>Tasks not found</p> : <ul>
                {tasks.map(t => {
                    return (
                        <li><input type="checkbox" checked={t.isDone} onChange={(e) => changeTaskStatusHandler(t.id, e)}/>
                            <span>{t.title}</span>
                            <button onClick={() => deleteTask(t.id)}>x</button>
                        </li>
                    )
                })}
            </ul>}
            <div>
                <button onClick={() => changeFilter('all')}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};

