import { GraphQLError } from "graphql";
import { DeliveryManModelType } from "../db/deliveryMan.ts";
import { OrderModel, OrderModelType } from "../db/order.ts";

export const DeliveryMan = {
    orders: async (parent: DeliveryManModelType): Promise<OrderModelType[]> => {
        try {
            const orders = await OrderModel.find({ deliveryManID: parent.id }).exec();
            return orders;
        } catch (error) {
            console.error("Error fetching orders for deliveryMan:", error);
            throw new GraphQLError("Internal server error");
        }
    },

};