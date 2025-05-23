import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootParamList = {
    Splash: undefined;
    Main: MainParamList | undefined;
};

export type MainParamList = {
    Home: undefined;
    Notes: undefined;
    Profile: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<
    RootParamList & MainParamList
>;

export type AppRouteProp<T extends keyof RootParamList | keyof MainParamList> = RouteProp<
    RootParamList & MainParamList,
    T
>;

export type AppScreens = keyof RootParamList | keyof MainParamList;