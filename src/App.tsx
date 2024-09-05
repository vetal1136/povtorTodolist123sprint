import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'
function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })
  const changeFilter = (todoId: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(tl => (tl.id === todoId ? {...tl, filter} : tl)))
  }
    const deleteTask = (todoId: string, taskId: string) => {
        // setTasks(tasks.filter(t => t.id !== taskId))
        setTasks( {...tasks,[todoId]:tasks[todoId].filter(t => t.id !== taskId)})
    }


  const addTask = (todoId: string, title: string) => {
      const newTask = {id: v1(), title, isDone: false}
      setTasks({...tasks, [todoId]:[newTask, ...tasks[todoId]]})
  }

  const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
      // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t))
      setTasks({...tasks,[todoId]:tasks[todoId].map(t => t.id ===taskId ? {...t, isDone} : t)})
  }

    const removeTodolist = (todoId: string) => {
        const newTodolists = todolists.filter(tl => tl.id !== todoId)
        setTodolists(newTodolists)
    }
    return (
        <div className="App">
            {todolists.map(tl => {
                let taskForTodolist = tasks[tl.id]
                if(tl.filter === 'active') {
                    taskForTodolist =  taskForTodolist.filter(t => !t.isDone)
                }
                if(tl.filter === 'completed') {
                    taskForTodolist =  taskForTodolist.filter(t => t.isDone)
                }
                return(
                    <Todolist
                        key={tl.id}
                        title={tl.title}
                        todoId={tl.id}
                        tasks={taskForTodolist}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
