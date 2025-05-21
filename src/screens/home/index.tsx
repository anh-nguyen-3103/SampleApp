import React from 'react';
import { View } from 'react-native';
import { useAppState } from '../../components/AppStateWrapper';
import { AppText } from '../../components/AppText';
import { styles } from './styles';

const HomeScreen = () => {
  const { currentAppState, isActive, lastActiveTimestamp, location } = useAppState();

  return (
    <View style={styles.container}>
      <AppText.Paragraph
        text={JSON.stringify({ currentAppState, isActive, lastActiveTimestamp, location }, null, 2)}
      />
    </View>
  );
};

export default HomeScreen;
