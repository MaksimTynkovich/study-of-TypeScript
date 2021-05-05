import React, { ChangeEvent, useState } from 'react';
import { FilterValuesType, TaskType } from './App'
import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan';

type TodoListPropsType = {
    id: string
    title: string
    todoListFilter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {
    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id,
             e.currentTarget.checked, props.id)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.id)
        return (
            <li key={t.id}>
                <input type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })
    const removeTodoList = () => props.removeTodoList(props.id)
    const setAllFilterValue = () => props.changeTodoListFilter("all", props.id)
    const setActiveFilterValue = () => props.changeTodoListFilter("active", props.id)
    const setCompletedFilterValue = () => props.changeTodoListFilter("completed", props.id)

    const addTask = (title: string) => props.addTask(title,props.id)
    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoList}>X</button></h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.todoListFilter === 'all' ? 'active-filter' : ''} onClick={setAllFilterValue}>All</button>
                <button className={props.todoListFilter === 'active' ? 'active-filter' : ''} onClick={setActiveFilterValue}>Active</button>
                <button className={props.todoListFilter === 'completed' ? 'active-filter' : ''} onClick={setCompletedFilterValue}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList