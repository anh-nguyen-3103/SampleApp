import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { AppStateWrapper } from './components/AppStateWrapper';
import { RootNavigation } from './navigation';
import { store } from './store';
import Geolocation from '@react-native-community/geolocation';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: false,
});

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppStateWrapper>
          <Provider store={store}>
            <RootNavigation />
          </Provider>
        </AppStateWrapper>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
