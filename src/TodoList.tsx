import React from 'react';
import {FilterValuesType, TaskType} from './App'

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
}

function TodoList(props: TodoListPropsType) {
    const tasks = props.tasks.map(t => {
        return <li key={t.id}><input type="checkbox" checked={t.isDone} /> <span>{t.title}</span></li>
    })
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
                <button onClick={()=>{props.changeTodoListFilter("all")}}>All</button>
                <button onClick={()=>{props.changeTodoListFilter("active")}}>Active</button>
                <button onClick={()=>{props.changeTodoListFilter("completed")}}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList