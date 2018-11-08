import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, Image } from 'react-native';

import Main from "./Main";
import Landing from "./Landing";

import {connect} from "react-redux";

class MyApp extends React.Component {
  
  render() {
    
    var curpage = <Landing />
        
    if(this.props.showPage == 0){
      curpage = <Landing />;
    } 
    
    if(this.props.showPage == 1){
      curpage = <Main />;
    }
    
    return (
      <View style={styles.container}>
        {curpage}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});

function mapStateToProps(state){
  return {
    showPage: state.ReducerFunc.page,
  }}

export default connect(mapStateToProps)(MyApp);