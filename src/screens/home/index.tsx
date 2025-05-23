import React from 'react';
import { View } from 'react-native';
import { useAppState } from '../../components/AppStateWrapper';
import { styles } from './styles';

const HomeScreen = () => {
  const { currentAppState, isActive, lastActiveTimestamp, location } = useAppState();
  console.log(
    '[AppState]: ',
    JSON.stringify({ currentAppState, isActive, lastActiveTimestamp, location }, null, 2),
  );
  return <View style={styles.container}></View>;
};

export default HomeScreen;
