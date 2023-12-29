export const typeDefs = `#graphql
    type Card {
        number: String!
        cvv: String!
        expirity: String!
        money: Float!
    }

    type Client {
        id: ID!
        name: String!
        email: String!
        cards: [Card!]!
        orders: [Order!]!
    }

    type Restaurant {
        id: ID!
        name: String!
        address: String!
        cif: String!
        products: [String!]!
    }

    type DeliveryMan {
        id: ID!
        username: String!
        orders: [Order!]!
    }

    type Order {
        id: ID!
        client: Client!
        restaurant: Restaurant!
        deliveryMan: DeliveryMan!
        products: [String!]!
        price: Float!
        status: OrderStatus!
    }

    enum OrderStatus {
        PENDING
        FINISHED
    }

    type Query {
        clients: [Client!]!
        client(id: ID!): Client!
        restaurants: [Restaurant!]!
        restaurant(id: ID!): Restaurant!
        deliveryMen: [DeliveryMan!]!
        deliveryMan(id: ID!): DeliveryMan!
        orders: [Order!]!
        order(id: ID!): Order!
    }

    type Mutation {
        createClient(name: String!, email: String!): Client!
        deleteClient(id: ID!): Client!
        updateClient(id: ID!, name: String, email: String): Client!
        createRestaurant(name: String!, address: String!, cif: String!): Restaurant!
        deleteRestaurant(id: ID!): Restaurant!
        updateRestaurant(id: ID!, name: String, address: String, cif: String): Restaurant!
        createDeliveryMan(username: String!): DeliveryMan!
        deleteDeliveryMan(id: ID!): DeliveryMan!
        updateDeliveryMan(id: ID!, username: String): DeliveryMan!
        createOrder(clientID: ID!, restaurantID: ID!, deliveryManID: ID!, products: [String!]!, price: Float!, status: String!): Order!
        endOrder(id: ID!): Order!
        getAllClients: [Client!]!
        getAllRestaurants: [Restaurant!]!
        getAllDeliveryMen: [DeliveryMan!]!
        getAllOrders: [Order!]!
    }

    input CardInput {
        number: String!
        cvv: String!
        expirity: String!
        money: Float!
    }
`