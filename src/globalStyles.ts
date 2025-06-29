import {StyleSheet} from "react-native";

export const globalStyles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', padding: 20},
    header: {fontSize: 24, marginBottom: 20, textAlign: 'center'},
    input: {borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 6},
    link: {marginTop: 10, color: 'blue', textAlign: 'center'},
    overlay: {
        ...StyleSheet.absoluteFillObject, // Covers entire parent
        backgroundColor: 'rgba(255,255,255,0.7)', // Semi-transparent white
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, // Ensures it stays on top
    },
    errorBanner: {
        backgroundColor: '#ffe6e6',
        color: '#cc0000',
        padding: 10,
        marginBottom: 10,
        borderRadius: 6,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
    },
});