/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import { Facebook } from 'expo';
import { connect } from 'react-redux';
import { Button, Paragraph, Dialog, Portal, Avatar } from 'react-native-paper';

import Layout from '../constants/Layout';
import EvilIcon from '../components/EvilIcon';
import SimpleLineIcon from '../components/SimpleLineIcon';
import { authFacebook, logout } from '../actions';
import { FACEBOOK_APP_ID } from '../constants/api';
import { MessageConsumer } from '../contexts/MessageContext';

const { deviceWidth, deviceHeight } = Layout;

const ComponentContainer = styled.View`
  flex-direction: row;
  padding: 10px;
  align-items: center;
`;

const TextContainer = styled.Text`
  color: ${props => props.color || '#cfcfcf'};
  font-size: 15;
  font-family: 'notosans';
`;

const NameWrapper = styled.Text`
  color: ${props => props.color || '#cfcfcf'};
  font-size: 18;
  padding-left: 15px;
  font-family: 'notosans';
`;

const FriendInfoWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
`;

class Drawerable extends React.Component {
  friends = [];

  state = {
    visible: false,
  };

  componentDidMount = async () => {
    const { info } = this.props;
    this.friends = [
      {
        id: '1',
        name: 'Test',
        pictureUrl:
          'https://images.unsplash.com/photo-1556787713-c4af300bbf6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      },
      {
        id: '2',
        name: 'Test',
        pictureUrl:
          'https://images.unsplash.com/photo-1556787713-c4af300bbf6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      },
    ];
    if (info) {
      const response = await fetch(
        `https://graph.facebook.com/me/friends?access_token=${info.token}`
      );
      const data = await response.json();
      await data.data.forEach(async item => {
        const itemRes = await fetch(
          `https://graph.facebook.com/${item.id}/picture?type=large`
        );
        const itemData = await itemRes;
        this.friends = [
          ...this.friends,
          {
            id: item.id,
            name: item.name,
            pictureUrl: itemData.url,
          },
        ];
      });
    }
  };

  handleFacebookLogin = async showMessage => {
    const { navigation } = this.props;
    try {
      const result = await Facebook.logInWithReadPermissionsAsync(
        FACEBOOK_APP_ID,
        {
          permissions: ['public_profile', 'email', 'user_friends'],
        }
      );
      const { type, token } = result;
      if (type === 'success') {
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,email,name&access_token=${token}`
        );
        const data = await response.json();
        // eslint-disable-next-line react/destructuring-assignment
        this.props.authFacebook(
          {
            ...data,
            token,
          },
          {
            success: () => {
              navigation.navigate('Activity');
              showMessage({ message: 'Đăng nhập thành công', type: 'success' });
            },
            failure: () => {
              showMessage({ message: 'Có lỗi xảy ra', type: 'failure' });
            },
          }
        );
        showMessage({
          message: `Hi ${(await response.json()).name}!`,
          type: 'success',
        });
      } else {
        // type === 'cancel'
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  getFriends = async () => {
    const { info } = this.props;
    const response = await fetch(
      `https://graph.facebook.com/me/friends?access_token=${info.token}`
    );
    const data = await response.json();
    await data.data.forEach(async item => {
      const itemRes = await fetch(
        `https://graph.facebook.com/${item.id}/picture?type=large`
      );
      const itemData = await itemRes;
      const ids = this.friends.map(fr => fr.id);
      if (!ids.includes(item.id)) {
        this.friends = [
          ...this.friends,
          {
            id: item.id,
            name: item.name,
            pictureUrl: itemData.url,
          },
        ];
      }
    });
    this._showDialog();
  };

  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  render() {
    const { info, navigation } = this.props;
    const { visible } = this.state;
    return (
      <MessageConsumer>
        {({ showMessage }) => (
          <View
            style={{
              flex: 1,
              padding: 20,
            }}
          >
            <Portal>
              <Dialog visible={visible} onDismiss={this._hideDialog}>
                <Dialog.Title>Friends</Dialog.Title>
                <Dialog.Content>
                  <ScrollView>
                    {this.friends.length > 0
                      ? this.friends.map(friend => (
                          <FriendInfoWrapper key={friend.id}>
                            <Image
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                              }}
                              resizeMode="cover"
                              source={{ url: friend.pictureUrl }}
                            />
                            <NameWrapper color="#070707">
                              {friend.name}
                            </NameWrapper>
                          </FriendInfoWrapper>
                        ))
                      : null}
                  </ScrollView>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={this._hideDialog}>Done</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'avenir-next',
                  fontSize: 18,
                }}
              >
                MY LIFE TIME
              </Text>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  width: 250,
                }}
              >
                <ComponentContainer>
                  <EvilIcon name="sc-facebook" size={30} color="#9EA2A7" />
                  <TouchableHighlight
                    underlayColor="#9EA2A7"
                    onPress={() => this.handleFacebookLogin(showMessage)}
                  >
                    <TextContainer>
                      {info && info.name ? info.name : 'Facebook login'}
                    </TextContainer>
                  </TouchableHighlight>
                </ComponentContainer>
                <ComponentContainer>
                  <EvilIcon name="link" size={30} color="#9EA2A7" />
                  <TouchableHighlight
                    underlayColor="#9EA2A7"
                    onPress={this.getFriends}
                  >
                    <TextContainer>See friends</TextContainer>
                  </TouchableHighlight>
                </ComponentContainer>
                <ComponentContainer>
                  <SimpleLineIcon name="logout" size={20} color="#9EA2A7" />
                  <TouchableHighlight
                    underlayColor="#9EA2A7"
                    onPress={() => {
                      this.props.navigation.closeDrawer();
                      this.props.logout({
                        success: () => navigation.navigate('Activity'),
                      });
                    }}
                  >
                    <TextContainer>Logout</TextContainer>
                  </TouchableHighlight>
                </ComponentContainer>
              </View>
            </View>
          </View>
        )}
      </MessageConsumer>
    );
  }
}

export default connect(
  state => ({
    isLogging: state.user.isLogging,
    info: state.user.info,
  }),
  {
    authFacebook,
    logout,
  }
)(Drawerable);
