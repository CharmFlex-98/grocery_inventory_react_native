import React, {JSX, useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useConsumeInventoryMutation } from '../services/inventoryService';
import {showErrorToast} from "../../../utils/helper";
import {NavProp} from "../../../routes/appRoutes";
import {Inventory} from "../types/groceryType";
import LoadingModal from "../../../utils/sharedComponent";

type InventoryConsumeProps = {
    route: {
        params: {
            item: Inventory;
        };
    };
};

export default function InventoryConsumeScreen({ route }: InventoryConsumeProps): JSX.Element {
    const navigation = useNavigation();
    const { item } = route.params;

    const [deductAmount, setDeductAmount] = useState(1);
    const [consumeInventory, { isLoading } ] = useConsumeInventoryMutation();

    const handleConfirm = async () => {
        if (deductAmount <= 0 || deductAmount > item.quantity) {
            Alert.alert('Invalid', 'Invalid deduction amount.');
            return;
        }

        try {
            await consumeInventory({
                inventoryId: item.id,
                quantity: deductAmount,
            }).unwrap();

            Alert.alert('Success', 'Inventory items consumed.');
            navigation.goBack();
        } catch (err) {
            showErrorToast(err)
        }
    };

    return (
        <>
        <LoadingModal visible={isLoading} />
        <View style={styles.container}>
            <Text style={styles.title}>{item.groceryDetail.name}</Text>
            <Text style={styles.subtitle}>Available: {item.quantity} pcs</Text>

            <View style={styles.controls}>
                <TouchableOpacity
                    onPress={() => setDeductAmount(Math.max(1, deductAmount - 1))}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.amountText}>{deductAmount}</Text>

                <TouchableOpacity
                    onPress={() =>
                        setDeductAmount(Math.min(item.quantity, deductAmount + 1))
                    }
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
    subtitle: { fontSize: 16, marginVertical: 12 },
    controls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 16,
        borderRadius: 8,
        marginHorizontal: 20,
    },
    buttonText: { color: '#fff', fontSize: 24 },
    amountText: { fontSize: 20, fontWeight: 'bold' },
    confirmButton: {
        backgroundColor: '#dc3545',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    confirmText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
