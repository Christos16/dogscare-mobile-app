
import React from 'react'
import {ScrollView} from 'react-native'
import {  SafeAreaView } from 'react-navigation';
import {DrawerItems} from 'react-navigation-drawer';

const DefaultDrawer = (props) => (
  <ScrollView>
    <SafeAreaView >
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

export default DefaultDrawer