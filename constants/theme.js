import { DefaultTheme } from 'react-native-paper';
import { Platform } from 'react-native';

// const fonts = Platform.select({
//   web: {
//     regular: 'noto-medium',
//     medium: 'noto-semiBold',
//     light: 'noto-regular',
//     thin: 'noto-light',
//   },
//   ios: {
//     regular: 'noto-medium',
//     medium: 'noto-semiBold',
//     light: 'noto-regular',
//     thin: 'noto-light',
//   },
//   default: {
//     regular: 'noto-medium',
//     medium: 'noto-semiBold',
//     light: 'noto-regular',
//     thin: 'noto-light',
//   },
// });

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF3866',
    accent: '#F1EAE2',
    text: '#4A4944',
  },
  // fonts,
};
