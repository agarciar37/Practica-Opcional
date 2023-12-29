export type Client = {
    id : string, 
    name : string,
    email : string,
    cards : Array<Card>,
    orders : Array<Omit<Order, "Client">>
}

export type Restaurant = {
    id : string,
    name : string,
    address : string,
    cif : string,
    products : string[],
}

export type DeliveryMan = {
    id : string,
    username : string,
    orders : Array<Omit<Order, "deliveryMan">>
}

export type Order = {
    id : string,
    client : Omit<Client, "orders">,
    restaurant : Restaurant,
    deliveryMan : Omit<DeliveryMan, "orders">,
    products : string[],
    price : number,
    status : "PENDING" | "FINISHED"
}

export type Card = {
    number: number;
    cvv: number;
    expirity: string;
    money: number;
}