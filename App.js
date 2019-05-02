/* eslint-disable no-use-before-define */
import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppLoading, Asset, Font, Icon, Permissions } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';

import { MessageProvider } from './contexts/MessageContext';
import store, { persistor } from './store';
import AppNavigator from './navigations/AppNavigator';
import font from './assets/fonts/Pacifico-Regular.ttf';
import SpaceMono from './assets/fonts/SpaceMono-Regular.ttf';
import Cardo from './assets/fonts/Cardo-Regular.ttf';
import Kalam from './assets/fonts/Kalam-Regular.ttf';
import Alegreya from './assets/fonts/Alegreya-Regular.ttf';
import IndieFlower from './assets/fonts/IndieFlower.ttf';
import Enriqueta from './assets/fonts/Enriqueta-Regular.ttf';
import Roboto from './assets/fonts/Roboto-Regular.ttf';
import AvenirNext from './assets/fonts/AvenirNextLTPro-Regular.otf';
import AvenirNextBold from './assets/fonts/AvenirNextLTPro-Bold.otf';
import NotoSans from './assets/fonts/NotoSans-Regular.ttf';
import theme from './constants/theme';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount = async () => {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  };

  _loadResourcesAsync = async () =>
    Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        pacifico: font,
        'space-mono': SpaceMono,
        cardo: Cardo,
        kalam: Kalam,
        alegreya: Alegreya,
        'indie-flower': IndieFlower,
        enriqueta: Enriqueta,
        roboto: Roboto,
        'avenir-next': AvenirNext,
        'avenir-next-bold': AvenirNextBold,
        notosans: NotoSans,
      }),
    ]);

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MessageProvider>
            <PaperProvider theme={theme}>
              <StatusBar hidden />
              <AppNavigator />
            </PaperProvider>
          </MessageProvider>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
