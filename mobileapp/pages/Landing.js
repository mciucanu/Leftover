import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Button } from 'react-native';

import LandingOptions from "./LandingOptions";
import Login from "./Login";
import SignUp from "./SignUp";

import {connect} from "react-redux";

class Landing extends React.Component {
  
  render() {
    
    var curpage = <LandingOptions />
    
    if(this.props.showIPage == 0){
      curpage = <LandingOptions />
    }
    
    if(this.props.showIPage == 1){
      curpage = <Login />
    }
    
    if(this.props.showIPage == 2){
      curpage = <SignUp />
    }
    
    return (  
        <ImageBackground
          source={require('../imgs/background.jpg')}
          style={styles.myBg}
          resizeMode='cover'>
          <View style={styles.container}>
            
            {/*Logo*/}
            <Image
              source={require('../imgs/logow.png')}
              style={styles.logo}
              resizeMode='cover'>
            </Image>
            
            {curpage}
            
          </View>
      </ImageBackground>
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
  
  myBg: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  
  logo: {
    width: 125,
    height: 132,
    marginTop: 150
  },
  
});

function mapStateToProps(state){
  return {
    showIPage: state.ReducerFunc.ipage,
  }}

export default connect(mapStateToProps)(Landing);