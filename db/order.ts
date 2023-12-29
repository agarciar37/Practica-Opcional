import mongoose from "mongoose"
import { Order } from "../types.ts"

const Schema = mongoose.Schema

const OrderSchema = new Schema (
    {
        clientID : {type : Schema.Types.ObjectId, required : true, ref : "Client"},
        restaurantID : {type : Schema.Types.ObjectId, required : true, ref : "Restaurant"},
        deliveryManID : {type : Schema.Types.ObjectId, required : true, ref : "DeliveryMan"},
        products : [{type : String, required : true}],
        price : {type : Number, required : true},
        status : {type : String, required : true}
    }
)

OrderSchema.path("clientID").validate(async(clientID: string) => {
    const clientCount = await mongoose.models.Client.countDocuments({ _id : clientID })
    return clientCount
}, "Client does not exist")

OrderSchema.path("restaurantID").validate(async(restaurantID: string) => {
    const restaurantCount = await mongoose.models.Restaurant.countDocuments({ _id : restaurantID })
    return restaurantCount
}, "Restaurant does not exist")

OrderSchema.path("deliveryManID").validate(async(deliveryManID: string) => {
    const deliveryManCount = await mongoose.models.DeliveryMan.countDocuments({ _id : deliveryManID })
    return deliveryManCount
}, "DeliveryMan does not exist")

OrderSchema.path("products").validate((products: string[]) => {
    return products.length > 0
}, "Please enter at least one product")

OrderSchema.path("price").validate((price: number) => {
    return price > 0
}, "Please enter a valid price")

export type OrderModelType = mongoose.Document & Omit<Order, "id">
export const OrderModel = mongoose.model<OrderModelType>("Order", OrderSchema)