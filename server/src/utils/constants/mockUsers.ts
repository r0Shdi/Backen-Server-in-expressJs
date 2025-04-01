import { User as MyUser } from "../types/user"

export const mockUsers:MyUser[] = [
    {id: 1, username:"roshdi", age: "25", password: "hdi", type: "local"},
    {id: 2, username:"hamdy", age: "25", password: "mdy", type: "local"},

    {id: 3, username:"roshdy", age: "25", password: "hdy", type: "local"},
    {id: 4, username:"elsayed", age: "25", password: "yed", type: "local"},
    {id: 5, username:"farag", age: "25", password: "rag", type: "local"},
]



declare global {
    namespace Express {
       interface User extends MyUser {}
    }
  }
