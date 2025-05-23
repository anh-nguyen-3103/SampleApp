import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import AppBottomNavigation from '../components/AppBottomNavigation';
import HomeScreen from '../screens/home';
import NotesScreen from '../screens/notes';
import ProfileScreen from '../screens/profile';
import SplashScreen from '../screens/splash';
import { MainParamList, RootParamList } from './root';

const MainTabs = createBottomTabNavigator<MainParamList>();

const MainNavigation = () => {
  const mainOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarHideOnKeyboard: true,
    animation: 'shift',
  };

  return (
    <MainTabs.Navigator
      initialRouteName={'Home'}
      tabBar={(props) => <AppBottomNavigation {...props} />}
      screenOptions={mainOptions}
    >
      <MainTabs.Screen name={'Home'} component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <MainTabs.Screen name={'Notes'} component={NotesScreen} options={{ tabBarLabel: 'Notes' }} />
      <MainTabs.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </MainTabs.Navigator>
  );
};

const RootStack = createNativeStackNavigator<RootParamList>();

const RootNavigation = () => {
  const rootOptions: NativeStackNavigationOptions = {
    gestureEnabled: true,
    fullScreenGestureEnabled: true,
    header: () => null,
    animation: 'fade',
    animationDuration: 300,
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={rootOptions}>
        <RootStack.Screen name={'Splash'} component={SplashScreen} />
        <RootStack.Screen name={'Main'} component={MainNavigation} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { RootNavigation, RootStack };
