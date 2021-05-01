import React from 'react';
import title from './App'

type TodoListPropsType = {
    title: string
}

function TodoList(props: TodoListPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={true} /> <span>HTML&CSS</span></li>
                <li><input type="checkbox" checked={true} /> <span>JS</span></li>
                <li><input type="checkbox" checked={false} /> <span>React</span></li>
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