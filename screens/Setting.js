import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import { HomeContainer } from './Home';

export default class Setting extends React.Component {
  render() {
    return (
      <HomeContainer>
        <Text>Setting</Text>
      </HomeContainer>
    );
  }
}
