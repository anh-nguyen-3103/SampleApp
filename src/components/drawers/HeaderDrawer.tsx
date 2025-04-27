import { DrawerHeaderProps } from '@react-navigation/drawer';
import React, { FC } from 'react';
import { Text, View } from 'react-native';

type Props = {} & DrawerHeaderProps;

const HeaderDrawer: FC<Props> = ({}) => {
  return (
    <View>
      <Text>HeaderDrawer</Text>
    </View>
  );
};

export default HeaderDrawer;
