import React, {useState, useEffect, useCallback} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform, Alert, Modal, ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import {useAddGroceryMutation, useAllInventoryCategoriesQuery} from "../services/inventoryService";
import {useNavigation} from "@react-navigation/native";
import {NavProp} from "../../../routes/appRoutes";
import {showErrorToast, showToastMessage} from "../../../utils/helper";
import {globalStyles} from "../../../globalStyles";
import {ErrorCode, ErrorCodeGroups} from "../../../exception/errorCodes";
import LoadingModal from "../../../utils/sharedComponent";

type Category = {
    id: number;
    name: string;
};

export default function AddItemScreen() {
    const [name, setName] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [category, setCategory] = useState<Category | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    const { data, error, isLoading } = useAllInventoryCategoriesQuery();
    const [addGroceryHandler] = useAddGroceryMutation()
    const navigation = useNavigation<NavProp>();


    useEffect(() => {
        if (data) {
            console.log(data)
            setCategories(data); // assuming you have this state
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            showErrorToast(error)
        }
    }, [error]);

    const onAdd = useCallback(async () =>  {
        console.log(name, category?.id);
        if (!name || !category?.id) {
            showToastMessage(ErrorCodeGroups[ErrorCode.FORM_NOT_COMPLETED])
            return
        }
        console.log(category);

        try {
            await addGroceryHandler({name: name, categoryId: category?.id}).unwrap()
            Alert.alert("Added successfully.")
            console.log("success added");
            navigation.goBack()
        } catch (e) {
            showErrorToast(e)
        }

    }, [category, name])

    return (
        <>
        <LoadingModal visible={isLoading} />
        <View style={styles.container}>
            <Text style={styles.label}>Grocery Name</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. Milk"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={category}
                    onValueChange={(itemValue) => {
                        console.log(itemValue)
                        setCategory(itemValue)
                    }}
                >
                    <Picker.Item label="Select a category" value={null} />
                    {categories.map((cat) => (
                        <Picker.Item key={cat.id} label={cat.name} value={cat} />
                    ))}
                </Picker>
            </View>

            <TouchableOpacity onPress={onAdd} style={styles.addButton} disabled={isLoading}>
                <Text style={styles.addButtonText}>Add Grocery</Text>
            </TouchableOpacity>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    label: { fontSize: 16, fontWeight: '600', marginTop: 16 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginTop: 8,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginTop: 8,
    },
    addButton: {
        backgroundColor: '#007bff',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 12,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
});
