import { GraphQLError } from "graphql"
import mongoose from "mongoose"
import { ClientModel, ClientModelType } from "../db/client.ts";
import { RestaurantModelType, RestaurantModel } from "../db/restaurant.ts";
import { DeliveryManModelType, DeliveryManModel } from "../db/deliveryMan.ts";
import { OrderModelType, OrderModel } from "../db/order.ts";

export const Mutation = {
    createClient : async (
        _: unknown,
        args: {name: string, email: string}
    ): Promise<ClientModelType> => {
        const client = {
            name : args.name,
            email : args.email
        }

        const newClient = await ClientModel.create(client)
        return newClient
    },

    deleteClient : async (
        _: unknown,
        args: {id: string}
    ): Promise<ClientModelType> => {
        const client = await ClientModel.findByIdAndDelete(args.id)
        if(!client) {
            throw new GraphQLError(`No client found with id ${args.id}`,{
                extensions : {code : "NO_CLIENT_FOUND"}
            })
        }
        return client
    },

    updateClient : async (
        _: unknown,
        args: {id: string, name?: string, email?: string}
    ): Promise<ClientModelType> => {
        const client = await ClientModel.findById(args.id)
        if(!client) {
            throw new GraphQLError(`No client found with id ${args.id}`,{
                extensions : {code : "NO_CLIENT_FOUND"}
            })
        }

        if(args.name) {
            client.name = args.name
        }
        if(args.email) {
            client.email = args.email
        }

        await client.save()
        return client
    },

    createRestaurant : async (
        _: unknown,
        args: {name: string, address: string, cif: string}
    ): Promise<RestaurantModelType> => {
        const restaurant = {
            name : args.name,
            address : args.address,
            cif : args.cif
        }

        const newRestaurant = await RestaurantModel.create(restaurant)
        return newRestaurant
    },

    deleteRestaurant : async (
        _: unknown,
        args: {id: string}
    ): Promise<RestaurantModelType> => {
        const restaurant = await RestaurantModel.findByIdAndDelete(args.id)
        if(!restaurant) {
            throw new GraphQLError(`No restaurant found with id ${args.id}`,{
                extensions : {code : "NO_RESTAURANT_FOUND"}
            })
        }
        return restaurant
    },

    updateRestaurant : async (
        _: unknown,
        args: {id: string, name?: string, address?: string, cif?: string}
    ): Promise<RestaurantModelType> => {
        const restaurant = await RestaurantModel.findById(args.id)
        if(!restaurant) {
            throw new GraphQLError(`No restaurant found with id ${args.id}`,{
                extensions : {code : "NO_RESTAURANT_FOUND"}
            })
        }

        if(args.name) {
            restaurant.name = args.name
        }
        if(args.address) {
            restaurant.address = args.address
        }
        if(args.cif) {
            restaurant.cif = args.cif
        }

        await restaurant.save()
        return restaurant
    },

    createDeliveryMan : async (
        _: unknown,
        args: {username: string}
    ): Promise<DeliveryManModelType> => {
        const deliveryMan = {
            username : args.username
        }

        const newDeliveryMan = await DeliveryManModel.create(deliveryMan)
        return newDeliveryMan
    },

    deleteDeliveryMan : async (
        _: unknown,
        args: {id: string}
    ): Promise<DeliveryManModelType> => {
        const deliveryMan = await DeliveryManModel.findByIdAndDelete(args.id)
        if(!deliveryMan) {
            throw new GraphQLError(`No deliveryMan found with id ${args.id}`,{
                extensions : {code : "NO_DELIVERYMAN_FOUND"}
            })
        }
        return deliveryMan
    },

    updateDeliveryMan : async (
        _: unknown,
        args: {id: string, username?: string}
    ): Promise<DeliveryManModelType> => {
        const deliveryMan = await DeliveryManModel.findById(args.id)
        if(!deliveryMan) {
            throw new GraphQLError(`No deliveryMan found with id ${args.id}`,{
                extensions : {code : "NO_DELIVERYMAN_FOUND"}
            })
        }

        if(args.username) {
            deliveryMan.username = args.username
        }

        await deliveryMan.save()
        return deliveryMan
    },

    createOrder : async (
        _: unknown,
        args: {clientId: string, restaurantId: string, deliveryManId: string, products: string[], price: number}
    ): Promise<OrderModelType> => {
        const order = {
            client : args.clientId,
            restaurant : args.restaurantId,
            deliveryMan : args.deliveryManId,
            products : args.products,
            price : args.price,
            status : "PENDING"
        }

        const newOrder = await OrderModel.create(order)
        return newOrder
    },

    endOrder : async (
        _: unknown,
        args: {id: string}
    ): Promise<OrderModelType> => {
        const order = await OrderModel.findById(args.id)
        if(!order) {
            throw new GraphQLError(`No order found with id ${args.id}`,{
                extensions : {code : "NO_ORDER_FOUND"}
            })
        }

        order.status = "FINISHED"

        await order.save()
        return order
    },

    getAllClients : async (): Promise<ClientModelType[]> => {
        const clients = await ClientModel.find().exec()
        return clients;
    },

    getAllRestaurants : async (): Promise<RestaurantModelType[]> => {
        const restaurants = await RestaurantModel.find().exec();
        return restaurants;
    },

    getAllDeliveryMen : async (): Promise<DeliveryManModelType[]> => {
        const deliveryMen = await DeliveryManModel.find().exec();
        return deliveryMen;
    },

    getAllOrders : async (): Promise<OrderModelType[]> => {
        const orders = await OrderModel.find().exec();
        return orders;
    }
}