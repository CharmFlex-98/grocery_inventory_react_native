export type Inventory = {
    id: number,
    groceryDetail: GroceryDetail,
    quantity: number,
    expiryDate: Date,
}

export type GroceryDetail = {
    id: number,
    name: string,
    categoryDetail: Category
}

export type Category = {
    id: number
    name: string
}