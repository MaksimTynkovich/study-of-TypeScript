import { v1 } from "uuid";
import { TodoListType } from "../App";

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}

type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListID: string
}

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT

export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionType) => {
    switch(action.type) {   
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case 'ADD-TODOLIST':
        const newtodoListID = v1()
        const newTodoList: TodoListType = {
            id: newtodoListID, title: action.title, filter: "all"
        }
        return [...todoLists, newTodoList]
            default: 
            return todoLists
    }
}