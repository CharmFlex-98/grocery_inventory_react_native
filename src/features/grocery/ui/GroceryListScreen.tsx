import React from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import {useAllGroceriesQuery, useDeleteGroceryMutation} from '../services/inventoryService';
import {Ionicons} from "@expo/vector-icons";
import {showErrorToast} from "../../../utils/helper";
import {globalStyles} from "../../../globalStyles";

export default function GroceryListScreen() {
    const { data: groceries = [], refetch } = useAllGroceriesQuery();
    const [deleteGrocery] = useDeleteGroceryMutation();

    const handleDelete = async (id: number) => {
        Alert.alert('Confirm', 'Delete this grocery?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await deleteGrocery(id).unwrap();
                        refetch();
                    } catch (error) {
                        console.error(error);
                        showErrorToast(error)
                    }
                },
            },
        ]);
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.itemCard}>
            <Text style={styles.title}>{item.name} ({item.categoryDetail.name})</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash" size={20} color="#dc3545" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={groceries}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    itemCard: {
        backgroundColor: '#eee',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: { fontSize: 16, fontWeight: '500' },
    delete: { color: 'red' },
});
