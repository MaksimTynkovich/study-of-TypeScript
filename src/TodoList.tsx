import React from 'react';
import {FilterValuesType, TaskType} from './App'

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
}

function TodoList(props: TodoListPropsType) {
    const tasks = props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id)
        return <li key={t.id}><input type="checkbox" checked={t.isDone} /> <span>{t.title}</span><button onClick={removeTask}>X</button></li>
    })
    const setAllFilterValue = () => props.changeTodoListFilter("all")
    const setActiveFilterValue = () => props.changeTodoListFilter("active")
    const setCompletedFilterValue = () => props.changeTodoListFilter("completed")
    const addTask = () => props.addTask('New Task')
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
               {tasks}
            </ul>
            <div>
                <button onClick={setAllFilterValue}>All</button>
                <button onClick={setActiveFilterValue}>Active</button>
                <button onClick={setCompletedFilterValue}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList