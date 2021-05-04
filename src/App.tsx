import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList from './TodoList'

export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        { id: todoListID_1, title: 'What to learn', filter: 'all' },
        { id: todoListID_2, title: 'What to buy', filter: 'all' },
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "React", isDone: false },
        ],
        [todoListID_2]: [
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "Beer", isDone: true },
            { id: v1(), title: "Water", isDone: false },
        ],
    })

    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({ ...tasks })
    }
    function addTask(title: string, todoListID: string) {
        const newTask = {
            id: v1(),
            title,
            isDone: false
        }
        const updatedTasks = [newTask, ...tasks[todoListID]]
        setTasks({...tasks, [todoListID]: updatedTasks
 })
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const updatedTodoLists = todoLists.map(tl => tl.id === todoListID ? {...tl, filter: newFilterValue}: tl)
        setTodoLists(updatedTodoLists)
    }
    function removeTodoList(todoListID: string){
        const updatedTodoLists = todoLists.filter(tl => tl.id !== todoListID)
        setTodoLists(updatedTodoLists)
        delete tasks[todoListID]
    }

    function getTasksForTodoList(todoList: TodoListType) {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => t.isDone === false)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone === true)
            default:
                return tasks[todoList.id]
        }
    }
    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        const updatedTasks = tasks[todoListID].map(t => t.id === taskID ? { ...t, isDone: newIsDoneValue } : t)
        setTasks({...tasks, [todoListID]: updatedTasks})
    }

    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    return(
                        <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={getTasksForTodoList(tl)}
                        changeTodoListFilter={changeTodoListFilter}
                        removeTodoList = {removeTodoList}
                        removeTask={removeTask}
                        addTask={addTask}
                        todoListFilter={tl.filter}
                        changeTaskStatus={changeTaskStatus}
                    />
                    )
                })
            }
        </div>
    );
}

export default App;
