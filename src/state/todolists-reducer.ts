import { TodoListType } from "../App";

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}

type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
}

export const todolistsReducer = (todoLists: Array<TodoListType>, action: RemoveTodoListAT | AddTodoListAT) => {
    switch(action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case: 'ADD-TODOLIST':
        const newtodoListID = v1()
        const newTodoList: TodoListType = {
            id: newtodoListID, title: title, filter: "all"
        }
            return [...todoLists, newTodoList]
            default: 
            return todoLists
    }
}