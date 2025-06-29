import {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {ActivityIndicator, Button, StyleSheet, Text, TextInput, View} from "react-native";
import {login} from "../authSlice";
import {useTranslation} from "react-i18next";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {createAuthLoginRequest, useLoginUserMutation} from "../service/authService";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp, NativeStackScreenProps} from "@react-navigation/native-stack";
import {NavProp, RouteProps} from "../../../routes/appRoutes";
import {globalStyles} from "../../../globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {showErrorToast} from "../../../utils/helper";

type LoginRouteProps = NativeStackNavigationProp<RouteProps>
type Props = {
    navigation: LoginRouteProps
}


export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {t} = useTranslation()
    const navigation = useNavigation<NavProp>()

    const [loginUser, {error, isLoading}] = useLoginUserMutation();
    const handleLoginUser = useCallback(async () => {
        try {
            const result = await loginUser(createAuthLoginRequest(password, email)).unwrap();
            console.log("token: " + result.token)
            await AsyncStorage.setItem('token', result.token);
            navigation.reset({index: 0, routes: [{name: "Home"}]})
        } catch (error) {
            showErrorToast(error)
        }
    }, [email, password]);

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                console.log("Found token, navigating to home...");
                // Optionally dispatch to Redux if needed
                login({token, email: ''});
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Home'}],
                });
            }
        };

        checkToken();
    }, []);

    useEffect(() => {
        console.log("isLoading: " + isLoading)
    }, [isLoading]);

    useEffect(() => {
        console.log("error is: " + error)
    }, [error]);

    return (
        <>
            <View style={globalStyles.container}>
                <Text style={globalStyles.header}>Login</Text>
                <TextInput placeholder={t("auth_email_hint")} value={email} onChangeText={setEmail}
                           style={globalStyles.input}/>
                <TextInput placeholder={t("auth_password_hint")} secureTextEntry={true} value={password}
                           onChangeText={setPassword} style={globalStyles.input}/>
                <Button title={t("auth_button_login")} onPress={handleLoginUser}/>
                <Text onPress={() => navigation.navigate("Register")} style={globalStyles.link}>Don't have an account? Sign
                    up</Text>

                {/* Overlay Loader - appears on top when loading */}
                {isLoading && (
                    <View style={globalStyles.overlay}>
                        <ActivityIndicator
                            size="large"
                            color="#0000ff"
                        />
                    </View>
                )}
            </View>
        </>
    );
};