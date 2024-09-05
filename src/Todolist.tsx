import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";


type PropsTodo = {
    todoId: string
    tasks: TaskType[]
    title: string
    deleteTask: (todoId: string, taskId: string) => void
    changeFilter: (todoId: string, filter: FilterValuesType) => void
    addTask: (todoId: string,title: string) => void
    changeTaskStatus: (todoId: string,taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todoId: string) => void
}
export const Todolist = ({todoId, tasks, title, deleteTask, changeFilter, addTask, changeTaskStatus,removeTodolist}: PropsTodo) => {
    const [taskTitle, setTaskTitle] = useState('')

    const changeTaskStatusHandler = (taskId: string,e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(todoId,taskId, newStatusValue)
    }



    return (
        <div className="todolist">
            <div className={'todolist-title-container'}>
                <h3>{title}</h3>
                <button onClick={() => removeTodolist(todoId)}>x</button>
            </div>
            <div>
                <input value={taskTitle}
                       onChange={(e) => {
                           setTaskTitle(e.currentTarget.value)}}
                onKeyUp={event => {
                    if(event.key ==='Enter') {
                        addTask(todoId,taskTitle) }
                }}
                />
                <button onClick={() => {
                    if (taskTitle.trim() !== '') {
                    addTask(todoId,taskTitle.trim())
                    setTaskTitle('')}
                }}>+
                </button>
            </div>
            {tasks.length === 0 ? <p>Tasks not found</p> : <ul>
                {tasks.map(t => {
                    return (
                        <li><input type="checkbox" checked={t.isDone} onChange={(e) => changeTaskStatusHandler(t.id, e)}/>
                            <span>{t.title}</span>
                            <button onClick={() => deleteTask(todoId,t.id)}>x</button>
                        </li>
                    )
                })}
            </ul>}
            <div>
                <button onClick={() => changeFilter(todoId,'all')}>All</button>
                <button onClick={() => changeFilter(todoId, 'active')}>Active</button>
                <button onClick={() => changeFilter(todoId,'completed')}>Completed</button>
            </div>
        </div>
    );
}

