import { combineReducers } from 'redux';
import moment from 'moment';

import { ADD_ACTIVITY } from '../actions';
import user from './user';

const INIT_STATE = {
  data: {
    '2019/01/01': {
      activities: [
        {
          time: '09:00',
          title: 'Archery Training',
          description:
            'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
          // timeForSort: '2019-05-01T02:00:51.000Z',
        },
        {
          time: '10:45',
          title: 'Play Badminton',
          description:
            'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
        },
        {
          time: '12:00',
          title: 'Lunch',
        },
        {
          time: '14:00',
          title: 'Watch Soccer',
          description:
            'Team sport played between two teams of eleven players with a spherical ball. ',
        },
        {
          time: '16:30',
          title: 'Go to Fitness center',
          description:
            'Look out for the Best Gym & Fitness Centers around me :)',
        },
      ],
    },
  },
};

const data = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_ACTIVITY:
      // eslint-disable-next-line no-case-declarations
      let activities;
      if (state.data[moment(action.payload.time).format('YYYY/MM/DD')]) {
        activities = [
          ...state.data[moment(action.payload.time).format('YYYY/MM/DD')]
            .activities,
          {
            time: moment(action.payload.time).format('HH:mm'),
            title: action.payload.title,
            description: action.payload.description,
            timeForSort: action.payload.time,
          },
        ].sort((x, y) => moment(x.timeForSort).diff(y.timeForSort));
      } else {
        activities = [
          {
            time: moment(action.payload.time).format('HH:mm'),
            title: action.payload.title,
            description: action.payload.description,
            timeForSort: action.payload.time,
          },
        ];
      }
      return {
        data: {
          ...state.data,
          [moment(action.payload.time).format('YYYY/MM/DD')]: {
            activities,
          },
        },
      };
    default:
      return state;
  }
};

export default combineReducers({
  data,
  user,
});
