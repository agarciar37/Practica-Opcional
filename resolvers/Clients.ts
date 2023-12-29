import { GraphQLError } from "graphql";
import { ClientModel, ClientModelType } from "../db/client.ts";
import { OrderModelType, OrderModel } from "../db/order.ts";

export const Client = {
    orders: async (parent: ClientModelType): Promise<OrderModelType[]> => {
        const orders = await OrderModel.find({ clientID: parent.id }).exec();
        return orders;
    },
};