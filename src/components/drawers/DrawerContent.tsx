import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React, { FC } from 'react';
import { Text, View } from 'react-native';

type Props = {} & DrawerContentComponentProps;

const DrawerContent: FC<Props> = ({}) => {
  return (
    <View>
      <Text>DrawerContent</Text>
    </View>
  );
};

export default DrawerContent;
