import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {LoginScreen} from "./features/auth/ui/loginScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Provider} from "react-redux";
import {store} from "./store/globalStore";
import {I18nextProvider} from "react-i18next";
import i18n from "i18next";
import {localeInit} from "./localization/i18nConfig";
import {useEffect} from "react";
import {RegisterScreen} from "./features/auth/ui/registerScreen";
import InventoryScreen from "./features/grocery/ui/inventoryScreen";
import {RouteProps} from "./routes/appRoutes";
import AddItemScreen from "./features/grocery/ui/addItemScreen";
import AddInventoryScreen from "./features/grocery/ui/addInventoryScreen";
import HomeTabs from "./features/home/homeTab";
import Toast from "react-native-toast-message";
import InventoryConsumeScreen from "./features/grocery/ui/InventoryConsumeScreen";

export default function App() {
    useEffect(() => {
        localeInit()
    }, [])

    const Stack = createNativeStackNavigator<RouteProps>();
    return (
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{headerShown: false}}>
                        <Stack.Screen name="Login" component={LoginScreen}/>
                        <Stack.Screen name="AddGrocery" component={AddItemScreen} />
                        <Stack.Screen name="Home" component={HomeTabs} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                        <Stack.Screen name={"AddInventory"} component={AddInventoryScreen} />
                        <Stack.Screen name={"InventoryConsume"} component={InventoryConsumeScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
                <Toast />
            </I18nextProvider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
