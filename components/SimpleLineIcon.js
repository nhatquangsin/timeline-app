import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SimpleLineIcons } from '@expo/vector-icons';

export default class SimpleLineIcon extends React.Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { name, size, color } = this.props;
    return (
      <SimpleLineIcons
        name={name}
        size={size}
        style={{ marginBottom: -3, marginLeft: 3, marginRight: 7 }}
        color={color}
      />
    );
  }
}
