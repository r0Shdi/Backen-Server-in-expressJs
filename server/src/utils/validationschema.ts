
import {Schema} from "express-validator";

export const createUserValidationSchema:Schema = {
id :{
    optional: {options: {nullable: true}},
    isInt: true,
    errorMessage: "id must be a number"
},
username:{
    notEmpty: true,
    errorMessage: "Name is required"
},
age:{
    optional: {options: {nullable: true}}
},
password:{
    optional: {options: {nullable: true}}}
}



export const createFilterValidationSchema:Schema = {
    filter:{
        isString: true,
        notEmpty: {
            errorMessage: "filter must not be empty"
        },
        isLength: {
            options: {min: 8, max: 12},
            errorMessage: "string must be between 8-12 characters"
        }

    }
}



export const createCartValidationSchema:Schema = {
    itemName:{
        notEmpty: true,
        errorMessage: "itemName is required"
    },
    quantity:{
        isInt: true,
        errorMessage: "quantity must be a number"
    },
    price:{
        notEmpty: true,
        errorMessage: "price is required"
    }
}