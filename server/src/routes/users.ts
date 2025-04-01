import  {  Request, Response, Router } from 'express'
import {mockUsers} from "../utils/constants/mockUsers"
import { User } from '../utils/types/user'
import { validationResult,  matchedData, checkSchema} from "express-validator"
import { createUserValidationSchema , createFilterValidationSchema } from '../utils/validationschema'
import { verifyID } from './middlewares/usersMiddlewares'

import UserModel from '../mongoose/schemas/user';
import bcrypt from "bcrypt"
const router= Router()

router.get("/api/users/:id",verifyID, (req, res)=>{
    const findUserIndex = res.locals.findUserIndex
    const user=  mockUsers[findUserIndex]
 
            res.status(200).send(user)
    
    
    
})




router.get("/api/users/", checkSchema(createFilterValidationSchema),  (req:Request, res:Response) => {
     const result = validationResult(req);
     console.log(result)
    const filter = req.query.filter  ;
    let value = req.query.value as string;

    if (!filter || !value) {
         res.status(400).json(mockUsers);
    }
    else{
        value = value.trim()  // Clean up input

        if (filter === "id") {

            const parsedId = parseInt(value, 10);
            if (isNaN(parsedId)) {
                 res.status(400).json({ error: "Invalid ID" });
            }
            const user = mockUsers.find((u) => u.id === parsedId);
             user ? res.json(user) : res.status(404).json({ error: "User not found" });
        }
    
        else if (filter === "name") {
            const users = mockUsers.filter((u) => u.username.toLowerCase().includes(value.toLowerCase()));
             users.length > 0 ? res.json(users) : res.status(404).json({ error: "User not found" });
        }else{
    
         res.status(400).json({ error: "Invalid filter" });
        }
    }

    
});



router.post("/api/users/signup" ,checkSchema(createUserValidationSchema), async(req:Request, res:Response)=>{
    
     const result = validationResult(req);        
       
        if (!result.isEmpty()) {
            res.status(400).json({ errors: result.array() });
            
            return;}
        
    
    const data:User = matchedData(req) 
    try{
    const user = new UserModel({...data , password: bcrypt.hashSync(data.password, 10)})
    const savedUser = await user.save();
    res.status(200).send(savedUser)
    }catch(error){
        res.send(error)
        return;
    }
    
    


})


router.put("/api/users/:id",verifyID, (req, res)=>{
    const {body} = req;
    const findUserIndex = res.locals.findUserIndex
    const parsedId = res.locals.parsed
if(body && findUserIndex !== -1){
    mockUsers[findUserIndex] = {id: parsedId, ...body}
}

res.status(200).send(mockUsers)

})




router.patch("/api/users/:id",verifyID, (req, res)=>{
    const {body} = req;
    const findUserIndex = res.locals.findUserIndex

if(body && findUserIndex !== -1){
    Object.entries(body).forEach(([key, value])=>{
        if(mockUsers[findUserIndex].hasOwnProperty(key)) {
            (mockUsers[findUserIndex] as any)[key] = value
        }})

    
   
}

res.status(200).send(mockUsers)

})


export default router