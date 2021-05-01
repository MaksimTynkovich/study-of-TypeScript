import React from 'react';
import {FilterValuesType, TaskType} from './App'

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
    removeTask: (taskID: number) => void
}

function TodoList(props: TodoListPropsType) {
    const tasks = props.tasks.map(t => {
        return <li key={t.id}><input type="checkbox" checked={t.isDone} /> <span>{t.title}</span><button>X</button></li>
    })
    const setAllFilterValue = () => props.changeTodoListFilter("all")
    const setActiveFilterValue = () => props.changeTodoListFilter("active")
    const setCompletedFilterValue = () => props.changeTodoListFilter("completed")
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
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