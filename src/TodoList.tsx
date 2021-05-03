import React, { ChangeEvent, useState } from 'react';
import { FilterValuesType, TaskType } from './App'

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean) => void
}

function TodoList(props: TodoListPropsType) {
    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
        return (
            <li key={t.id}>
                <input type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />


                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })
    const setAllFilterValue = () => props.changeTodoListFilter("all")
    const setActiveFilterValue = () => props.changeTodoListFilter("active")
    const setCompletedFilterValue = () => props.changeTodoListFilter("completed")
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError('Title is required!')
        }
        setTitle("")
    }
    let [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input 
                    value={title}
                    className={error ? 'error' : ''}
                    onChange={changeTitle}
                    onKeyPress={(e) => { if (e.charCode === 13) { addTask() } }} />
                <button
                    onClick={addTask}>+</button>
                    {error && <div className="error-text">{error}</div>}
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