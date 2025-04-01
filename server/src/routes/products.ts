import { Router } from "express";
import express from "express"


const router = Router()

export default router.get("/api/products", (req, res) => {
    console.log(req.sessionID)
    console.log(req.session)
    
      if(req.signedCookies.roshdi && req.signedCookies.roshdi === "farag"){
        res.status(200).json({id: 1, name: "product1", price: 100})
      }

        else{
            res.status(401).json({message: "you need to loging first"})
        }
          
    
    
})


