import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { EvilIcons } from '@expo/vector-icons';

export default class AntDesignIcon extends React.Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { name, size, color } = this.props;
    return (
      <EvilIcons
        name={name}
        size={size}
        style={{ marginBottom: -3 }}
        color={color}
      />
    );
  }
}
