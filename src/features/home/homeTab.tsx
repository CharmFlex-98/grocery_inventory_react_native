import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import InventoryScreen from "../grocery/ui/inventoryScreen";
import GroceryListScreen from "../grocery/ui/GroceryListScreen";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = focused ? 'home' : 'home-outline'

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: true, // Optional if you're using custom headers
            })}
        >
            <Tab.Screen name="InventoryList" component={InventoryScreen} options={{ title: 'Inventory' }} />
            <Tab.Screen name="GroceryList" component={GroceryListScreen} options={{ title: 'Groceries' }} />
        </Tab.Navigator>
    );
}
