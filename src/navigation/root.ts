import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


export type RootParamList = {
    Splash: undefined;
    Main: MainParamList | undefined;
};

export type MainParamList = {
    Home: undefined;
    Settings: undefined;
    Weather: undefined;
    Todo: undefined;
};


export type AppNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<RootParamList>,
    DrawerNavigationProp<MainParamList>
>;


export type AppRouteProp<T extends keyof RootParamList | keyof MainParamList> = RouteProp<
    RootParamList & MainParamList,
    T
>;


export type AppScreens = keyof RootParamList | keyof MainParamList;