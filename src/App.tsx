import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, { useState } from 'react';
import { v1 } from 'uuid';
// import './App.css';
import AddItemForm from './components/AddItemForm';
import TodoList from './components/Todo'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        { id: todoListID_1, title: "What to learn", filter: "all" },
        { id: todoListID_2, title: "What to buy", filter: "all" },
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            { id: v1(), title: 'HTML', isDone: true },
            { id: v1(), title: 'CSS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todoListID_2]: [
            { id: v1(), title: 'Milk', isDone: true },
            { id: v1(), title: 'Beer', isDone: true },
            { id: v1(), title: 'Soda', isDone: false },
        ],

    })

    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({ ...tasks })
    }
    function addTask(title: string, todoListID: string) {
        const newTask = {
            id: v1(),
            title,
            isDone: false
        }
        const updatedTasks = [newTask, ...tasks[todoListID]]
        setTasks({
            ...tasks,
            [todoListID]: updatedTasks
        })
    }


    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const updatedTasks = tasks[todoListID].map(t => t.id === taskID ? { ...t, title } : t)
        setTasks({
            ...tasks,
            [todoListID]: updatedTasks
        })
    }

    function changeTaskStatus(taskID: string, newisDone: boolean, todoListID: string) {
        const updatedTasks = tasks[todoListID].map(t => t.id === taskID ? { ...t, isDone: !t.isDone } : t)
        setTasks({
            ...tasks,
            [todoListID]: updatedTasks
        });
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? { ...tl, filter: newFilterValue } : tl))
    }

    function removeTodoList(todoListID: string) {
        const updatedTodoLists = todoLists.filter(tl => tl.id !== todoListID)
        setTodoLists(updatedTodoLists)
        delete tasks[todoListID]
    }

    function addTodoList(title: string) {
        const newtodoListID = v1()
        const newTodoList: TodoListType = {
            id: newtodoListID, title: title, filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({ ...tasks, [newtodoListID]: [] })
    }
    function changeTodoListTitle(title: string, todoListID: string) {
        const updatedTodoLists = todoLists.map(tl => tl.id === todoListID ? { ...tl, title } : tl)
        setTodoLists(updatedTodoLists)
    }

    function getTasksForTodo(todoList: TodoListType) {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => t.isDone === false)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone === true)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListComponents = todoLists.map(tl => {
        return (
            <Grid item>
                <Paper elevation={6} style={{ padding: "20px" }}>
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={getTasksForTodo(tl)}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        removeTask={removeTask}
                        todoListFilter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                        changeTodoListFilter={changeTodoListFilter} />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static" style={{ marginBottom: "50px" }}>
                <Toolbar style={{ justifyContent: "space-between " }}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container={true} style={{ padding: "20px 0" }}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container={true} spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
