import { GraphQLError } from "graphql";
import { OrderModelType } from "../db/order.ts";
import { ClientModel, ClientModelType } from "../db/client.ts";
import { RestaurantModel, RestaurantModelType } from "../db/restaurant.ts";
import { DeliveryManModel, DeliveryManModelType } from "../db/deliveryMan.ts";

export const Order = {
    client: async (parent: OrderModelType): Promise<ClientModelType> => {
        try {
            const client = await ClientModel.findById(parent.client);
            if (!client) {
                throw new GraphQLError(`No client found for order with id ${parent.id}`, {
                    extensions: { code: "NO_CLIENT_FOUND" },
                });
            }
            return client;
        } catch (error) {
            console.error("Error fetching client for order:", error);
            throw new GraphQLError("Internal server error");
        }
    },
    restaurant: async (parent: OrderModelType): Promise<RestaurantModelType> => {
        try {
            const restaurant = await RestaurantModel.findById(parent.restaurant);
            if (!restaurant) {
                throw new GraphQLError(`No restaurant found for order with id ${parent.id}`, {
                    extensions: { code: "NO_RESTAURANT_FOUND" },
                });
            }
            return restaurant;
        } catch (error) {
            console.error("Error fetching restaurant for order:", error);
            throw new GraphQLError("Internal server error");
        }
    },
    deliveryMan: async (parent: OrderModelType): Promise<DeliveryManModelType> => {
        try {
            const deliveryMan = await DeliveryManModel.findById(parent.deliveryMan);
            if (!deliveryMan) {
                throw new GraphQLError(`No deliveryMan found for order with id ${parent.id}`, {
                    extensions: { code: "NO_DELIVERYMAN_FOUND" },
                });
            }
            return deliveryMan;
        } catch (error) {
            console.error("Error fetching deliveryMan for order:", error);
            throw new GraphQLError("Internal server error");
        }
    },
};