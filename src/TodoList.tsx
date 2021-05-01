import React from 'react';
import {TaskType} from './App'

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}

export default TodoList