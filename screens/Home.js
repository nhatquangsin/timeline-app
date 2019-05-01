import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import Timeline from 'react-native-timeline-listview';
import { connect } from 'react-redux';
import moment from 'moment';
import { FAB } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';

import Layout from '../constants/Layout';
import AntDesignIcon from '../components/AntDesignIcon';
import { addActivity } from '../actions';

const { deviceWidth, deviceHeight } = Layout;

export const HomeContainer = styled.View`
  flex: 1;
  background-color: #fff;
  width: ${props => props.width || deviceWidth};
  height: ${props => props.height || deviceHeight};
`;

export const TitleBar = styled.View`
  background-color: #fff;
  width: ${deviceWidth};
  padding-top: 20;
  padding-bottom: 10;
  height: 50;
  justify-content: center;
  align-items: center;
`;
export const DateBar = styled.View`
  position: absolute;
  bottom: 0;
  background-color: #fff;
  width: ${deviceWidth};
  height: 50;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;
const Title = styled.Text`
  font-size: 26;
  color: ${props => props.color || '#000'};
  font-family: 'avenir-next';
`;

class Home extends React.Component {
  state = {
    isDateTimePickerVisible: false,
    date: moment(),
  };

  newActivity = () => {
    const { navigation } = this.props;
    navigation.navigate('New');
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.setState({ date: moment(date) });
    this.hideDateTimePicker();
  };

  render() {
    const { data } = this.props;
    const { isDateTimePickerVisible, date } = this.state;
    const nextActivity = {
      description: '                                                    ',
    };
    return (
      <HomeContainer>
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode="date"
          titleIOS="Date"
          titleStyle={{ fontSize: 18 }}
          date={date.toDate()}
        />
        <TitleBar>
          <Title>ACTIVITIES</Title>
        </TitleBar>
        {data.data[date.format('YYYY/MM/DD')] === undefined ? null : (
          <Timeline
            // data={data.data['2019/01/01'].activities}
            data={[
              ...data.data[date.format('YYYY/MM/DD')].activities,
              nextActivity,
            ]}
            // columnFormat="two-column"
            // columnFormat="single-column-right"
            circleSize={20}
            innerCircle="dot"
            // separator
            circleColor="#EC5D57"
            lineColor="#7A7A7A"
            style={{
              paddingTop: 10,
              padding: 20,
              paddingBottom: 50,
            }}
            timeContainerStyle={{
              minWidth: 52,
              marginTop: -5,
              backgroundColor: '#fff',
              borderRadius: 13,
            }}
            timeStyle={{
              textAlign: 'center',
              color: '#EC5D57',
              padding: 2,
              marginTop: 3,
              fontFamily: 'avenir-next',
              fontSize: 25,
            }}
            descriptionStyle={{
              color: 'gray',
              fontFamily: 'notosans',
              fontSize: 18,
              paddingBottom: 10,
              paddingRight: 10,
              // textAlign: 'right',
            }}
            options={{
              style: { paddingTop: 5 },
            }}
            titleStyle={{
              fontFamily: 'notosans',
              fontSize: 25,
              marginTop: -10,
              // textAlign: 'right',
            }}
            onEventPress={e => console.log(e)}
          />
        )}
        <DateBar>
          <TouchableHighlight
            underlayColor="#fff"
            onPress={this.showDateTimePicker}
          >
            <Title color="#000">{date.format('YYYY/MM/DD')}</Title>
          </TouchableHighlight>
        </DateBar>
        <FAB
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: '#EC5D57',
          }}
          big
          icon="create"
          color="#fff"
          onPress={this.newActivity}
        />
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
)(Home);
