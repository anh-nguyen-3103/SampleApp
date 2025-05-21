import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { AppText } from '../../components/AppText';
import { localization } from '../../localization';
import { AppNavigationProp } from '../../navigation/root';
import { styles } from './styles';

const SplashScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) });

    scale.value = withDelay(
      500,
      withSequence(
        withSpring(1.1, {
          damping: 12,
          stiffness: 100,
          mass: 1,
          overshootClamping: false,
        }),
        withSpring(1, {
          damping: 15,
          stiffness: 120,
        }),
      ),
    );

    const timeout = setTimeout(() => {
      navigation.replace('Registration');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  const containerAnimated = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const textAnimated = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.container, containerAnimated]}>
      <Animated.View style={[styles.container, textAnimated]}>
        <AppText.H1 text={localization['splash-page'].title} />
      </Animated.View>
    </Animated.View>
  );
};

export default SplashScreen;
