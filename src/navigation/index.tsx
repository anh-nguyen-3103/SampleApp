import {
  createDrawerNavigator,
  DrawerContent,
  DrawerContentComponentProps,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import HeaderDrawer from '../components/drawers/HeaderDrawer';
import HomeScreen from '../screens/home';
import SettingsScreen from '../screens/settings';
import SplashScreen from '../screens/splash';
import HapticFeedback from '../utils/hapticFeedback';
import { MainParamList, RootParamList } from './root';
import WeatherPage from '../screens/weather';
import TodoPage from '../screens/todo';

const drawerOptions: DrawerNavigationOptions = {
  drawerType: 'front',
  swipeEnabled: true,
  overlayColor: '#0000004D',
  drawerStyle: { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
  header: (props) => (
    <HeaderDrawer
      layout={props.layout}
      options={props.options}
      route={props.route}
      navigation={props.navigation}
    />
  ),
};

const DrawerStack = createDrawerNavigator<MainParamList>();

const DrawerNavigation = () => {
  const drawerContent = (props: DrawerContentComponentProps) => <DrawerContent {...props} />;

  const handleDrawerStateChange = (e: { data: { state: { history: { type: string }[] } } }) => {
    const isDrawerOpen = e.data.state.history?.[0]?.type === 'drawer';
    if (isDrawerOpen) {
      HapticFeedback.trigger('impactLight');
    }
  };

  return (
    <DrawerStack.Navigator
      initialRouteName={'Home'}
      screenOptions={drawerOptions}
      screenListeners={{ state: handleDrawerStateChange }}
      drawerContent={drawerContent}
    >
      <DrawerStack.Screen name={'Home'} component={HomeScreen} />
      <DrawerStack.Screen name={'Weather'} component={WeatherPage} />
      <DrawerStack.Screen name={'Todo'} component={TodoPage} />
      <DrawerStack.Screen name={'Settings'} component={SettingsScreen} />
    </DrawerStack.Navigator>
  );
};

const rootOptions: NativeStackNavigationOptions = {
  gestureEnabled: true,
  fullScreenGestureEnabled: true,
  header: () => null,
  animation: 'fade',
  animationDuration: 300,
};

const RootStack = createNativeStackNavigator<RootParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={rootOptions}>
        <RootStack.Screen name={'Splash'} component={SplashScreen} />
        <RootStack.Screen name={'Main'} component={DrawerNavigation} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { RootNavigation, RootStack };
