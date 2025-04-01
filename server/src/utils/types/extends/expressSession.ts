import { User } from "../user";

declare module 'express-session' {
    export interface SessionData {
        name: string;
        user : User;
        cart: {itemName: string, quantity: number, price: string}[]
        passport: {user : number}
    }
}

