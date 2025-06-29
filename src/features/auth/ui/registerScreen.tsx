import {ActivityIndicator, Button, Text, TextInput, View} from "react-native";
import {globalStyles} from "../../../globalStyles";
import {t} from "i18next";
import {useCallback, useEffect, useState} from "react";
import {useSignUpUserMutation} from "../service/authService";
import {login} from "../authSlice";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {NavProp, RouteProps} from "../../../routes/appRoutes";
import {useNavigation} from "@react-navigation/native";
import {showErrorToast} from "../../../utils/helper";

type RegisterScreenProps = NativeStackNavigationProp<RouteProps, "Register">
type Props = {
    navigation: RegisterScreenProps;
}
export const RegisterScreen = ()  => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [registerUser, {isLoading}] = useSignUpUserMutation()
    const navigation = useNavigation<NavProp>();
    const handleRegisterUser = useCallback(async (email: string, password: string) => {
        try {
            await registerUser( { username: email, password }).unwrap()
            navigation.goBack()
        } catch (e) {
            showErrorToast(e)
        }

    }, [])

    return (
        <>
            <View style={globalStyles.container}>
                <Text style={globalStyles.header}>{t("auth_register_title")}</Text>
                <TextInput placeholder={t("auth_username_hint")} value={email} onChangeText={setEmail}
                           style={globalStyles.input}/>
                <TextInput placeholder={t("auth_password_hint")} secureTextEntry={true} value={password}
                           onChangeText={setPassword} style={globalStyles.input}/>
                <Button title={t("auth_button_register")} onPress={() => handleRegisterUser(email, password)}/>
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
}