import {
  BottomTabBarProps,
  BottomTabNavigationEventMap,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { NavigationHelpers, NavigationRoute, ParamListBase } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HapticFeedback from '../utils/hapticFeedback';

interface BottomNavigationItemProps extends TouchableOpacityProps {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  label: BottomTabNavigationOptions['tabBarLabel'];
  route: NavigationRoute<ParamListBase, string>;
  isFocused: boolean;
}

const BottomNavigationItem: React.FC<BottomNavigationItemProps> = ({
  label,
  isFocused,
  navigation,
  route,
  ...props
}) => {
  const handlePress = useCallback(() => {
    if (!isFocused) {
      HapticFeedback.patterns.selection();
    }

    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (isFocused || event.defaultPrevented) return;

    navigation.navigate(route.name, route.params);
  }, [navigation, isFocused, route.key, route.name, route.params]);

  const icon = useMemo(() => {
    let results = { name: 'information', colorFocused: '#000', color: '#c3c3c3' };

    switch (route.name) {
      case 'Home': {
        results = { name: 'home', colorFocused: '#000', color: '#c3c3c3' };
        break;
      }
      case 'Notes': {
        results = { name: 'document-text', colorFocused: '#000', color: '#c3c3c3' };
        break;
      }
      case 'Profile': {
        results = { name: 'person', colorFocused: '#000', color: '#c3c3c3' };
        break;
      }
    }
    return results;
  }, [route.name]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.itemContainer, { width: ITEM_WIDTH }]}
      accessibilityRole='button'
      accessibilityLabel={typeof label === 'string' ? label : route.name}
      {...props}
    >
      <Ionicons name={icon.name} size={20} color={isFocused ? icon.colorFocused : icon.color} />
    </TouchableOpacity>
  );
};

const CustomBottomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { bottom } = useSafeAreaInsets();
  const slideAnim = useSharedValue(0);

  useEffect(() => {
    slideAnim.value = withSpring(state.index, {
      damping: 20,
      stiffness: 200,
      mass: 1,
    });
  }, [state.index, slideAnim]);

  const animatedOverlayStyle = useAnimatedStyle(() => {
    const translateX = interpolate(slideAnim.value, [0, 1, 2], [0, ITEM_WIDTH, ITEM_WIDTH * 2]);

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View style={[styles.container, { bottom: bottom + 16, width: NAVIGATION_WIDTH }]}>
      <Animated.View style={[styles.slidingOverlay, animatedOverlayStyle]} />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        return (
          <BottomNavigationItem
            key={route.key}
            label={options.tabBarLabel}
            isFocused={isFocused}
            navigation={navigation}
            route={route}
          />
        );
      })}
    </View>
  );
};

const { width } = Dimensions.get('window');
const NAVIGATION_WIDTH = width - 64;
const ITEM_WIDTH = (NAVIGATION_WIDTH - 16) / 3;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    paddingHorizontal: 8,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    zIndex: 2,
    borderRadius: 22,
  },
  slidingOverlay: {
    position: 'absolute',
    left: 8,
    right: 8,
    width: ITEM_WIDTH,
    height: 44,
    backgroundColor: '#f3f3f3',
    borderRadius: 22,
    zIndex: 1,
  },
});

export default CustomBottomTabBar;
