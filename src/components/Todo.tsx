import { Button, Checkbox, IconButton } from '@material-ui/core';
import {Delete } from '@material-ui/icons';
import React, {ChangeEvent } from 'react';
import { FilterValuesType, TaskType } from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';


type PropsType = {
    id: string
    title: string
    todoListFilter: FilterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    tasks: Array<TaskType>
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, newisDoneValue: boolean, todoListID: string  ) => void // , todoListID: string
    changeTaskTitle: (taskID: string, title: string, todoListID: string  ) => void 
    changeTodoListTitle: (title: string,  todoListID: string) => void
}

function TodoList(props: PropsType){
    const tasks = props.tasks.map(t => {
        const removeTask = ()=> props.removeTask(t.id, props.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id,title,props.id)
        return(
            <li key={t.id}>
            <Checkbox color={"primary"} checked={t.isDone} onChange={changeStatus}/>
            <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}><Delete/></IconButton>
            </li>
        )
    })

    // const allBtn = props.todoListFilter === "all" ? "active-filter" : ""
    // const activeBtn = props.todoListFilter === "active" ? "active-filter" : ""
    // const completedBtn = props.todoListFilter === "completed" ? "active-filter" : ""
    const setAllFilterValue = ()=>{props.changeTodoListFilter("all", props.id)}
    const setActiveFilterValue = ()=>{props.changeTodoListFilter("active", props.id)}
    const setCompleteFilterValue = ()=>{props.changeTodoListFilter("completed", props.id)}
    const addTask = (title: string) => props.addTask(title, props.id)
    const removeTodoList = () => props.removeTodoList(props.id)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)
    return(
        <div>
        <h3>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
        <IconButton onClick={removeTodoList}><Delete/></IconButton></h3>
           <AddItemForm addItem={addTask} />
        <ul>
         {tasks}
        </ul>
        <div>
            <Button style={{marginRight: "5px"}} size={"small"} color={"primary"} variant={props.todoListFilter === "all" ? "contained" : "outlined"} onClick={setAllFilterValue}>All</Button>
            <Button style={{marginRight: "5px"}} size={"small"} color={"primary"} variant={props.todoListFilter === "active" ? "contained" : "outlined"} onClick={setActiveFilterValue}>Active</Button>
            <Button size={"small"} color={"primary"} variant={props.todoListFilter === "completed" ? "contained" : "outlined"} onClick={setCompleteFilterValue}>Completed</Button>
        </div>
        </div>
    )
    }

export default TodoList;