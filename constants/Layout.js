import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default {
  deviceWidth,
  deviceHeight,
  isSmallDevice: deviceWidth < 375,
  storyDateSize: 20,
  barStatusColor: 'default',
};
