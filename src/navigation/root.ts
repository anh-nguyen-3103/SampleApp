import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootParamList = {
    Splash: undefined;
    Registration: undefined;
    Main: MainParamList | undefined;
};

export type MainParamList = {
    Home: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<
    RootParamList & MainParamList
>;

export type AppRouteProp<T extends keyof RootParamList | keyof MainParamList> = RouteProp<
    RootParamList & MainParamList,
    T
>;

export type AppScreens = keyof RootParamList | keyof MainParamList;