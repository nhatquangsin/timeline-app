/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import styled from 'styled-components';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';

import { HomeContainer } from './Home';
import AntDesignIcon from '../components/AntDesignIcon';
import Layout from '../constants/Layout';
import { addActivity } from '../actions';

const { deviceWidth, deviceHeight } = Layout;

const TitleBar = styled.View`
  background-color: #fff;
  width: ${deviceWidth};
  padding-left: 10;
  padding-right: 10;
  flex-direction: row;
  height: 50;
  justify-content: space-between;
  align-items: center;
`;
const Content = styled.View`
  background-color: #fff;
  width: ${deviceWidth};
  height: ${deviceHeight - 50};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const TextInputContainer = styled.TextInput`
  padding-left: 20px;
  height: ${props => props.height || 60};
  width: ${deviceWidth};
  color: #000;
  text-align: left;
  font-size: ${props => props.fontSize || 26};
  font-family: 'avenir-next';
`;

class NewActivity extends React.Component {
  state = {
    title: '',
    description: '',
    time: '',
    isDateTimePickerVisible: true,
    isFocused: false,
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = time => {
    this.setState({ time });
    this.hideDateTimePicker();
  };

  done = () => {
    const { title, description, time } = this.state;
    this.props.addActivity({ title, description, time });
    this.props.navigation.navigate('Activity');
  };

  render() {
    const {
      title,
      description,
      isDateTimePickerVisible,
      isFocused,
    } = this.state;
    const { navigation } = this.props;
    return (
      <HomeContainer>
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode="datetime"
          titleIOS="Activity time"
          titleStyle={{ fontSize: 18 }}
        />
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            width: deviceWidth,
            height: deviceHeight,
          }}
          enabled
        >
          <TitleBar>
            <TouchableHighlight
              onPress={() => navigation.navigate('Activity')}
              underlayColor="#fff"
            >
              <AntDesignIcon name="left" size={26} color="#9EA2A7" />
            </TouchableHighlight>
            <TouchableHighlight onPress={this.done} underlayColor="#fff">
              <AntDesignIcon name="checksquareo" size={30} color="#9EA2A7" />
            </TouchableHighlight>
          </TitleBar>
          <ScrollView>
            <Content>
              <TextInputContainer
                placeholder="Activity..."
                value={title}
                onChangeText={value => this.setState({ title: value })}
                placeholderTextColor="#D0D0D4"
              />
              <TextInputContainer
                placeholder="Description..."
                value={description}
                fontSize={18}
                height={isFocused ? 250 : 500}
                onChangeText={value => this.setState({ description: value })}
                placeholderTextColor="#D0D0D4"
                multiline
                onFocus={() => this.setState({ isFocused: true })}
                onBlur={() => this.setState({ isFocused: false })}
              />
            </Content>
          </ScrollView>
        </KeyboardAvoidingView>
      </HomeContainer>
    );
  }
}

export default connect(
  state => ({
    data: state.data,
  }),
  {
    addActivity,
  }
)(NewActivity);
