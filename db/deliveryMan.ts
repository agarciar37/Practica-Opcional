import mongoose from "mongoose"
import { DeliveryMan } from "../types.ts"

const Schema = mongoose.Schema

const DeliveryManSchema = new Schema (
    {
        username : {type : String, required : true, unique : true},
        orders : [{type : String, required : true}]
    }
)

DeliveryManSchema.path("username").validate(async(username: string) => {
    const usernameCount = await mongoose.models.Driver.countDocuments({ username })
    return !usernameCount
}, "Username already exists")

export type DeliveryManModelType = mongoose.Document & Omit<DeliveryMan, "id">
export const DeliveryManModel = mongoose.model<DeliveryManModelType>("DeliveryMan", DeliveryManSchema)