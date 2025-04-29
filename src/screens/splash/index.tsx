import React from 'react';
import { View } from 'react-native';
import { AppText } from '../../components/AppText';
import { localization } from '../../localization';
import { styles } from './styles';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <AppText.H3 text={localization['splash-page'].title} />
    </View>
  );
};

export default SplashScreen;
