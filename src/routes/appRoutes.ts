import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Inventory} from "../features/grocery/types/groceryType";

export type RegisterProps = undefined
export type LoginScreenProps = undefined


export type RouteProps = {
    Login: LoginScreenProps
    Register: RegisterProps
    Home: undefined
    AddGrocery: undefined
    AddInventory: undefined
    InventoryConsume: { item: Inventory}
}

export type NavProp = NativeStackNavigationProp<RouteProps>
