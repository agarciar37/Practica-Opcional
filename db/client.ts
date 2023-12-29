import mongoose from "mongoose"
import { Client } from "../types.ts"

const Schema = mongoose.Schema

const ClientSchema = new Schema (
    {
        name : {type : String, required : true},
        email : {type : String, required : true, unique : true},
        //cards: array de tarjetas (sin coleccion de mongo)
        orders : [{type : String, required : true}]
    }
)

ClientSchema.path("email").validate(async(email: string) => {
    const emailCount = await mongoose.models.Client.countDocuments({ email })
    return !emailCount
}, "Email already exists")

//verificar que el email esta en el formato correcto
ClientSchema.path("email").validate((email: string) => {
    const emailRegex = /\S+@\S+\.\S+/
    return emailRegex.test(email)
}, "Please enter a valid email")

export type ClientModelType = mongoose.Document & Omit<Client, "id"> 
export const ClientModel = mongoose.model<ClientModelType>("Client", ClientSchema)