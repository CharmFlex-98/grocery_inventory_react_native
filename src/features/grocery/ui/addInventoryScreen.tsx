import React, {useCallback, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAddInventoryMutation, useAllGroceriesQuery} from "../services/inventoryService";
import {globalStyles} from "../../../globalStyles";
import {showErrorToast} from "../../../utils/helper";
import LoadingModal from "../../../utils/sharedComponent";

export default function AddInventoryScreen() {
    const navigation = useNavigation();

    const [selectedGroceryId, setSelectedGroceryId] = useState<number | null>(null);
    const [quantity, setQuantity] = useState('');
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const {data: allGroceries = [], isLoading: loadingGroceries, refetch} = useAllGroceriesQuery();
    const [addInventory, {isLoading: isAdding}] = useAddInventoryMutation();

    useFocusEffect(
        useCallback(() => {
            console.log("refocus")
            refetch(); // Refresh
        }, [refetch])
    );

    const handleSubmit = async () => {
        if (!selectedGroceryId || !quantity) {
            alert('Please fill all fields.');
            return;
        }

        try {
            await addInventory({
                groceryId: selectedGroceryId,
                quantity: parseInt(quantity),
                expiryDate: expiryDate,
            }).unwrap();

            alert('Inventory added!');
            navigation.goBack();
        } catch (err) {
            showErrorToast(err)
        }
    };

    return (
        <>
            <LoadingModal visible={isAdding}/>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {/* Grocery selection list */}
                <View style={styles.listContainer}>
                    <Text style={styles.label}>Select Grocery</Text>
                    <FlatList
                        data={allGroceries}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style={[
                                    styles.groceryItem,
                                    selectedGroceryId === item.id && styles.selectedItem,
                                ]}
                                onPress={() => setSelectedGroceryId(item.id)}
                            >
                                <Text>{item.name} ({item.categoryDetail.name})</Text>
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={{paddingBottom: 8}}
                    />
                </View>

                {/* Form and Button */}
                <ScrollView style={styles.formContainer} contentContainerStyle={{paddingBottom: 80}}>
                    <Text style={styles.label}>Quantity</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="number-pad"
                        value={quantity}
                        onChangeText={setQuantity}
                    />

                    <Text style={styles.label}>Expiry Date</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.dateBox}>{expiryDate.toDateString()}</Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={expiryDate}
                            mode="date"
                            display="default"
                            onChange={(_, date) => {
                                setShowDatePicker(false);
                                if (date) setExpiryDate(date);
                            }}
                        />
                    )}
                </ScrollView>

                {/* Button always at bottom */}
                <View style={styles.buttonWrapper}>
                    <Button title="Add Inventory" onPress={handleSubmit} disabled={isAdding}/>
                </View>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1},
    listContainer: {
        height: '40%',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    label: {fontWeight: 'bold', marginTop: 16},
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 8,
        marginTop: 8,
    },
    dateBox: {
        padding: 12,
        backgroundColor: '#eee',
        borderRadius: 8,
        marginTop: 8,
    },
    groceryItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    selectedItem: {
        backgroundColor: '#cce5ff',
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
    },
});
