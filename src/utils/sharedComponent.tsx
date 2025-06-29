import {ActivityIndicator, Modal, StyleSheet, Text, View} from "react-native";

export default function LoadingModal({ visible, message = "Loading..." }: { visible: boolean, message?: string }) {
    return (
        <Modal transparent visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <ActivityIndicator size="large" color="#007bff" />
                    <Text style={styles.text}>{message}</Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 12,
        alignItems: 'center',
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
})
