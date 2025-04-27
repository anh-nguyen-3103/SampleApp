import React, { useEffect, useRef } from 'react';
import { AppState, View } from 'react-native';

type AppStateWrapperType = {
  children?: React.ReactNode;
};

const AppStateWrapper = ({ children }: AppStateWrapperType) => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.info('[AppStateWrapper]: App has come to the foreground!');
      } else if (nextAppState.match(/inactive|background/)) {
        console.info('[AppStateWrapper]: App has gone to the background!');
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return <View>{children}</View>;
};

export default AppStateWrapper;
