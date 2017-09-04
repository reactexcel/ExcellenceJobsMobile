import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './navigation';
import store from '../store/store';

export default class HrRecruit extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
