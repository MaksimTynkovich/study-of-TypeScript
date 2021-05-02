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

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "React", isDone: false },
        ]
    )
    function removeTask(taskID: string){
        const filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks)
    }
    function addTask(title: string){
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
}

    let [todoListFilter, setTodoListFilter] = useState<FilterValuesType>("all")

    function changeTodoListFilter(newFilterValue: FilterValuesType) {
        setTodoListFilter(newFilterValue)
    }

    function getTasksForTodoList() {
        switch (todoListFilter) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }

    return (
        <div className="App">
            <TodoList 
            title={"What to learn"}
            tasks={getTasksForTodoList()} 
            changeTodoListFilter={changeTodoListFilter} 
            removeTask = {removeTask}
            addTask = {addTask}
            />
        </div>
    );
}

export default App;
