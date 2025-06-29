import React, {useCallback, useEffect, useLayoutEffect} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NavProp } from "../../../routes/appRoutes";
import { Inventory } from "../types/groceryType";
import {useInventorySummaryQuery} from "../services/inventoryService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {showErrorToast} from "../../../utils/helper";

export default function InventoryScreen() {
    const navigation = useNavigation<NavProp>();
    const { data, isLoading, error, refetch } = useInventorySummaryQuery();

    useEffect(() => {
        if (error) {
            showErrorToast(error)
        }
    }, [error]);

    useFocusEffect(
        useCallback(() => {
            console.log("refocus")
            refetch(); // Refresh
        }, [refetch])
    );

    useEffect(() => {
        console.log("inventoryData: " + JSON.stringify(data))
    }, [data]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{ marginRight: 16 }}
                    onPress={() => navigation.navigate('AddInventory')}
                >
                    <Ionicons name="add" size={24} color="#007bff" />
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginLeft: 16 }}
                    onPress={async () => {
                        await AsyncStorage.removeItem('token');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    }}
                >
                    <Ionicons name="log-out-outline" size={24} color="#dc3545" />
                </TouchableOpacity>
            ),
            title: ""
        });
    }, [navigation]);

    const renderItem = ({ item }: { item: Inventory }) => {
        const expiryDate = new Date(item.expiryDate);
        const today = new Date();
        const timeDiff = expiryDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        const isExpiringSoon = daysDiff <= 3 && daysDiff >= 0;
        const isExpired = daysDiff < 0;


        return (
            <View style={styles.itemCard}>
                <View style={styles.rowBetween}>
                    <Text style={styles.itemTitle}>{item.groceryDetail.name}</Text>

                    {isExpired && (
                        <View style={[styles.statusBadge, styles.expired]}>
                            <Text style={styles.statusText}>
                                Expired {Math.abs(daysDiff)} day{Math.abs(daysDiff) !== 1 ? 's' : ''} ago
                            </Text>
                        </View>
                    )}

                    {!isExpired && isExpiringSoon && (
                        <View style={[styles.statusBadge, styles.expiringSoon]}>
                            <Text style={styles.statusText}>
                                ⏰ {daysDiff} day{daysDiff !== 1 ? 's' : ''} left
                            </Text>
                        </View>
                    )}
                </View>

                <Text style={styles.itemSubtitle}>
                    {item.quantity} pcs • {item.groceryDetail.categoryDetail.name}
                </Text>
                <Text style={styles.itemSubtitle}>
                    Exp: {expiryDate.toLocaleDateString()}
                </Text>
                <TouchableOpacity
                    style={styles.consumeButton}
                    onPress={() => navigation.navigate('InventoryConsume', { item })}
                >
                    <Text style={styles.consumeButtonText}>Consume</Text>
                </TouchableOpacity>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={data ?? []}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 80 }}
                />
            )}

            {/* Floating Button for Add Grocery Item */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddGrocery')}
            >
                <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    itemCard: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemSubtitle: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: '#28a745',
        borderRadius: 30,
        padding: 16,
        elevation: 5,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },

    expiringBadge: {
        backgroundColor: '#ff4d4f',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },

    expiringText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },


    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },

    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },

    expiringSoon: {
        backgroundColor: '#ffa500', // orange
    },

    expired: {
        backgroundColor: '#dc3545', // red
    },

    consumeButton: {
        marginTop: 12,
        backgroundColor: '#007bff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    consumeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
