/**
 * @file AppStateWrapper.tsx
 * @description A React Context provider that tracks app state changes and geolocation
 * information in a React Native application.
 */

import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import React, { createContext, FC, useContext, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, StatusBar, useColorScheme, View } from 'react-native';

/**
 * @interface AppStateContextType
 * @description Defines the shape of the context data exposed by the AppStateContext
 * @property {string} currentAppState - Current state of the app ('active', 'background', or 'inactive')
 * @property {boolean} isActive - Convenience boolean indicating if the app is currently active
 * @property {number | null} lastActiveTimestamp - Timestamp when the app was last active
 * @property {GeolocationResponse | null} location - Current geolocation data or null if unavailable
 */
type AppStateContextType = {
  currentAppState: string;
  isActive: boolean;
  lastActiveTimestamp: number | null;
  location: GeolocationResponse | null;
};

/**
 * @constant AppStateContext
 * @description Creates a React Context with default values for app state tracking
 */
const AppStateContext = createContext<AppStateContextType>({
  currentAppState: AppState.currentState,
  isActive: AppState.currentState === 'active',
  lastActiveTimestamp: null,
  location: null,
});

/**
 * @interface Props
 * @description Props accepted by the AppStateWrapper component
 * @property {React.ReactNode} [children] - Child components to be wrapped
 */
type Props = { children?: React.ReactNode };

/**
 * @component AppStateWrapper
 * @description Provider component that tracks app state and location and exposes it via context
 * @param {Props} props - Component props
 * @returns {JSX.Element} Provider component wrapping children
 */
export const AppStateWrapper: FC<Props> = ({ children }) => {
  // Ref to keep track of previous app state across renders
  const appStateRef = useRef(AppState.currentState);
  // Hook to detect device color scheme (light/dark mode) for StatusBar styling
  const colorScheme = useColorScheme();

  // State variables to track app status and location
  const [currentAppState, setCurrentAppState] = useState<AppStateStatus>(AppState.currentState);
  const [isActive, setIsActive] = useState<boolean>(AppState.currentState === 'active');
  const [location, setLocation] = useState<GeolocationResponse | null>(null);
  const [lastActiveTimestamp, setLastActiveTimestamp] = useState<number | null>(
    AppState.currentState === 'active' ? Date.now() : null,
  );

  /**
   * Effect to subscribe to AppState changes
   * Detects when app moves between foreground and background states
   * Updates state variables accordingly
   */
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      // App has moved from background to foreground
      if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
        console.info('[AppStateWrapper]: App has come to the foreground!');
        setIsActive(true);
        setLastActiveTimestamp(Date.now());
      }
      // App has moved from foreground to background
      else if (nextAppState.match(/inactive|background/)) {
        console.info('[AppStateWrapper]: App has gone to the background!');
        setIsActive(false);
      }

      // Update ref and state with new app state
      appStateRef.current = nextAppState;
      setCurrentAppState(nextAppState);
    });

    // Clean up subscription when component unmounts
    return () => {
      subscription.remove();
    };
  }, []);

  /**
   * Effect to fetch current geolocation when component mounts
   * @note This only runs once and doesn't track location updates
   * @todo Consider adding watchPosition for continuous location tracking if needed
   * @todo Add error handling for location failures
   */
  useEffect(() => {
    Geolocation.getCurrentPosition((info) => setLocation(info));
  }, []);

  /**
   * Construct the context value object from current state
   */
  const contextValue: AppStateContextType = {
    currentAppState,
    isActive,
    lastActiveTimestamp,
    location,
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <View style={{ flex: 1 }}>{children}</View>
    </AppStateContext.Provider>
  );
};

/**
 * @function useAppState
 * @description Custom hook to consume the AppState context
 * @returns {AppStateContextType} Current app state and location data
 * @example
 * const { isActive, location } = useAppState();
 * console.log(`App is ${isActive ? 'active' : 'inactive'}`);
 * console.log(`Current coordinates: ${location?.coords.latitude}, ${location?.coords.longitude}`);
 */
export const useAppState = () => useContext(AppStateContext);
