import { GraphQLError } from "graphql";
import { RestaurantModel, RestaurantModelType } from "../db/restaurant.ts";

export const Restaurant = {
    products: async (parent: RestaurantModelType): Promise<string[]> => {
        try {
            return parent.products || [];
        } catch (error) {
            console.error("Error fetching products for restaurant:", error);
            throw new GraphQLError("Internal server error");
        }
    },
};