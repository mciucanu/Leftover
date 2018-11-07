import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, Image } from 'react-native';

import Main from "./pages/Main";

import Thunk from "redux-thunk";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {connect} from "react-redux";
import combine from "./redux/combine";

const store = createStore(
  combine,
  applyMiddleware(
    Thunk
  )
)

export default class App extends React.Component {
  
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}