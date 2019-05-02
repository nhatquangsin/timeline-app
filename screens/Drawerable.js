/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import styled from 'styled-components/native';
import { Facebook } from 'expo';
import { connect } from 'react-redux';

import EvilIcon from '../components/EvilIcon';
import SimpleLineIcon from '../components/SimpleLineIcon';
import { authFacebook, logout } from '../actions';
import { FACEBOOK_APP_ID } from '../constants/api';
import { MessageConsumer } from '../contexts/MessageContext';

const ComponentContainer = styled.View`
  flex-direction: row;
  padding: 10px;
  align-items: center;
`;

const TextContainer = styled.Text`
  color: #cfcfcf;
  font-size: 15;
`;

class Drawerable extends React.Component {
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
    console.log(data);
    data.data.forEach(async item => {
      const itemRes = await fetch(
        `https://graph.facebook.com/${item.id}/picture`
      );
      const itemData = await itemRes;
      console.log(itemData.url);
    });
  };

  render() {
    const { info, navigation } = this.props;
    return (
      <MessageConsumer>
        {({ showMessage }) => (
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
