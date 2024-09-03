import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'
function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])

    const [filter, setFilter] = useState('all')
    let taskForTodolist = tasks
    if(filter === 'active') {
        taskForTodolist = tasks.filter(t => !t.isDone)
    }
  if(filter === 'completed') {
        taskForTodolist = tasks.filter(t => t.isDone)
    }

  const changeFilter = (filter: FilterValuesType) => {
      setFilter(filter)
  }
    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }


  const addTask = (title: string) => {
      const newTask = {id: v1(), title, isDone: false}
      setTasks([newTask, ...tasks])
  }

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
      setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t))
  }
    return (
        <div className="App">
            <Todolist
                title="!!!!!!!!!!!!!!!!!"
                tasks={taskForTodolist}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
