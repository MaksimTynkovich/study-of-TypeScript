import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";

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

export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    newFilterValue: FilterValuesType
    todoListID: string
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case 'ADD-TODOLIST':
            const newtodoListID = v1()
            const newTodoList: TodoListType = {
                id: newtodoListID, title: action.title, filter: "all"
            }
            return [...todoLists, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.todoListID ? { ...tl, title: action.title } : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(tl => tl.id === action.todoListID ? { ...tl, title: action.newFilterValue } : tl)
                default:
                    return todoLists
    }
}