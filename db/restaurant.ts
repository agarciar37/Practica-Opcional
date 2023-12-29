import mongoose from "mongoose"
import { Restaurant } from "../types.ts"

const Schema = mongoose.Schema

const RestaurantSchema = new Schema (
    {
        name : {type : String, required : true},
        address : {type : String, required : true},
        cif : {type : String, required : true, unique : true},
        products : [{type : String, required : true}]
    }
)

RestaurantSchema.path("cif").validate(async(cif: string) => {
    const cifCount = await mongoose.models.Restaurant.countDocuments({ cif })
    return !cifCount
}, "CIF already exists")

export type RestaurantModelType = mongoose.Document & Omit<Restaurant, "id">
export const RestaurantModel = mongoose.model<RestaurantModelType>("Restaurant", RestaurantSchema)