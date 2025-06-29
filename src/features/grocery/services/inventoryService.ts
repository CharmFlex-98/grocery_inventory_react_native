import {baseApi} from "../../../service/apiServiceBase";
import {} from "../ui/inventoryScreen";
import {Category, GroceryDetail, Inventory} from "../types/groceryType";

type AddGroceryRequest = {
    name: string,
    categoryId: number
}

type AddInventoryRequest = {
    groceryId: number,
    quantity: number,
    expiryDate: Date
}

type RemoveInventoryItemRequest = {
    quantity: number
}

const inventoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        allInventoryCategories: build.query<Array<Category>, void>({
            query: (request) => ({
                url: 'api/v1/inventory/category/all',
                method: "GET",
                body: request,
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000
            }),
        }),
        addGrocery: build.mutation<void, AddGroceryRequest>({
            query: (request) => ({
                url: 'api/v1/inventory/groceries/create',
                method: "POST",
                body: request,
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000
            }),
        }),
        allGroceries: build.query<Array<GroceryDetail>, void>({
            query: () => ({ url: 'api/v1/inventory/groceries/all', method: 'GET' }),
        }),
        deleteGrocery: build.mutation<void, number>({
            query: (groceryId) => ({
                url: `api/v1/inventory/groceries/${groceryId}/delete`,
                method: 'DELETE'
            }),
        }),
        inventorySummary: build.query<Array<Inventory>, void>({
            query: () => ({ url: 'api/v1/inventory/inventory/all', method: 'GET' }),
        }),
        addInventory: build.mutation<void, AddInventoryRequest>({
            query: (body) => ({
                url: `api/v1/inventory/groceries/${body.groceryId}/add`,
                method: 'PUT',
                body: {
                    quantity: body.quantity,
                    expiryDate: body.expiryDate
                },
            }),
        }),
        consumeInventory: build.mutation<void, RemoveInventoryItemRequest & { inventoryId: number}>({
            query: (request) => ({
                url: `api/v1/inventory/inventory/${request.inventoryId}/remove`,
                method: 'POST',
                body: {
                    quantity: request.quantity
                },
            }),
        }),

    }),
    overrideExisting: false,
})

export const {useAllInventoryCategoriesQuery, useAddGroceryMutation, useAddInventoryMutation, useInventorySummaryQuery, useAllGroceriesQuery, useDeleteGroceryMutation, useConsumeInventoryMutation } = inventoryApi;