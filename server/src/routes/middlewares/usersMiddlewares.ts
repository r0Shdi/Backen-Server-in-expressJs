
import express, { NextFunction, Request, Response } from 'express'
import {mockUsers} from "../../utils/constants/mockUsers"

export const verifyID = (req:Request, res:Response, next:NextFunction)=>{
    const {body, params: {id}} = req;
    const parsedId = parseInt(id)
    if(isNaN(parsedId)){ 
        res.status(400).send("not a valid id")
        return
        
}
 
 const findUserIndex = mockUsers.findIndex((user)=>user.id === parsedId)
if(findUserIndex === -1){
      res.status(404).send("could not find the user")
      return
    
    }
    res.locals.findUserIndex = findUserIndex;
    res.locals.parsedId = parsedId;
    next()
}