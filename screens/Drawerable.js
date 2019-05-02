import React from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';

import Home from './Home';

export default class Drawerable extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{ color: '#fff', fontFamily: 'avenir-next', fontSize: 18 }}
          >
            MY LIFE TIME
          </Text>
        </View>
      </View>
    );
  }

  // render() {
  //   const { openDrawer } = DrawerLayout;
  //   console.log(DrawerLayout);
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <DrawerLayout
  //         drawerWidth={250}
  //         drawerPosition={DrawerLayout.positions.Left}
  //         drawerType="slide"
  //         drawerBackgroundColor="#2F3235"
  //         renderNavigationView={this.renderDrawer}
  //         overlayColor="0"
  //       >
  //         <Home {...this.props} openDrawer={openDrawer} />
  //       </DrawerLayout>
  //     </View>
  //   );
  // }
}
