import { GraphQLError } from "graphql";
import { ClientModel, ClientModelType } from "../db/client.ts";
import { RestaurantModelType, RestaurantModel } from "../db/restaurant.ts";
import { DeliveryManModelType, DeliveryManModel } from "../db/deliveryMan.ts";
import { OrderModelType, OrderModel } from "../db/order.ts";

export const Query = {
    clients : async (): Promise<ClientModelType[]> => {
        const clients = await ClientModel.find().exec()
        return clients;
    },

    client : async (_: unknown, args: {id :string}): Promise<ClientModelType> => {
        const client = await ClientModel.findById(args.id);
        if(!client) {
            throw new GraphQLError(`No client found with id ${args.id}`,{
                extensions : {code : "NO_CLIENT_FOUND"}
            })
        }
        return client;
    },

    restaurants : async (): Promise<RestaurantModelType[]> => {
        const restaurants = await RestaurantModel.find().exec();
        return restaurants;
    },

    restaurant : async (_: unknown, args: {id :string}): Promise<RestaurantModelType> => {
        const restaurant = await RestaurantModel.findById(args.id);
        if(!restaurant) {
            throw new GraphQLError(`No restaurant found with id ${args.id}`,{
                extensions : {code : "NO_RESTAURANT_FOUND"}
            })
        }
        return restaurant;
    },

    deliveryMen : async (): Promise<DeliveryManModelType[]> => {
        const deliveryMen = await DeliveryManModel.find().exec();
        return deliveryMen;
    },

    deliveryMan : async (_: unknown, args: {id :string}): Promise<DeliveryManModelType> => {
        const deliveryMan = await DeliveryManModel.findById(args.id);
        if(!deliveryMan) {
            throw new GraphQLError(`No deliveryMan found with id ${args.id}`,{
                extensions : {code : "NO_DELIVERYMAN_FOUND"}
            })
        }
        return deliveryMan;
    },

    orders : async (): Promise<OrderModelType[]> => {
        const orders = await OrderModel.find().exec();
        return orders;
    },

    order : async (_: unknown, args: {id :string}): Promise<OrderModelType> => {
        const order = await OrderModel.findById(args.id);
        if(!order) {
            throw new GraphQLError(`No order found with id ${args.id}`,{
                extensions : {code : "NO_ORDER_FOUND"}
            })
        }
        return order;
    },
}