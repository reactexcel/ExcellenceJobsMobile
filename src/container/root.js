import React, { Component } from 'react';
// import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import App from './app';
import store from '../store/store';
import * as action from '../action/actions';

export default class HrRecruit extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
