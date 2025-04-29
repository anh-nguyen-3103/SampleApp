/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppStateWrapper } from './components/AppStateWrapper';
import { RootNavigation } from './navigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppStateWrapper>
          <RootNavigation />
        </AppStateWrapper>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
