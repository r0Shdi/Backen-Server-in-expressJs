import  express, {  Request, Response, NextFunction } from 'express'

// middleware imports
import { validationResult,  matchedData, checkSchema} from "express-validator"
import cookieParser from "cookie-parser";
import session from 'express-session'


import cors from "cors";

// utils
import { createCartValidationSchema } from './utils/validationschema'

import { publicRoutes } from './utils/constants/publicRoutes';


// types 
import { User } from './utils/types/user';
import "./utils/types/extends/expressSession"


// enviroment variables
import { PORT, MongodbUrl } from '../envconfig';


// authentication strategies
import passport from './strategies/index';


// routes
import getUser from './routes/users'
import getProducts from './routes/products'


// mongodb && models
import mongoose from 'mongoose';
import MongoStore  from 'connect-mongo';


mongoose.connect(MongodbUrl).then(()=>console.log("connected to the database")).catch((error)=> console.log(error.message))






const app = express()

// middleware
app.use(express.text())
app.use(express.json())
app.use(cookieParser("passkey"))
app.use(cors({ 
    origin: "http://localhost:3000",  
    credentials: true // Allow cookies/session
  }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000 * 60 * 1 },
    store: MongoStore.create({ mongoUrl: MongodbUrl }),
}))

app.use(passport.initialize())
app.use(passport.session())


app.use((req: Request, res:Response, next: NextFunction)=>{
    if(!req.user && !publicRoutes.includes(req.path)){
        res.status(401).send('you need to login!')
    }else{
        next()
    }
})













// registering routes
app.use(getUser)
app.use(getProducts)



app.get('/', (req, res)=>{
    res.send('hello there')
})


app.post("/api/auth/local",passport.authenticate("local"),  (req , res)=>{
   
res.status(200).send(req.session)
})



app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }), (req , res)=>{
   
res.status(200).send(req.session)
})


app.get('/gredirect/',passport.authenticate("google"), (req, res)=>{

    res.send('hello there')
})




app.post("/api/auth/logout", (req, res)=>{
    req.logOut((err)=>{
        if(err){res.sendStatus(400)
            return;
        }
        res.sendStatus(200)
    }
)

})



app.get("/api/auth/status", (req, res)=>{
        console.log(req.cookies)
        console.log(req.session.cookie)
        res.status(200).json({user: req.user})
  
})












app.listen(PORT, ()=>{console.log(`hey ia m now listhining at port:${PORT}`)})