import React, { useState } from 'react';
import './App.css';
import TodoList from './TodoList'

export type TaskType = {
    title: string
    id: number
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const [tasks, setTasks] = useState <Array<TaskType>>(
        [
            { id: 1, title: "HTML&CSS", isDone: true },
            { id: 2, title: "JS", isDone: true },
            { id: 3, title: "React", isDone: false },
        ]
    )
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
            changeTodoListFilter={changeTodoListFilter} />
        </div>
    );
}

export default App;
