import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Button } from 'react-native';

import {connect} from "react-redux";
import {ChangePage} from "../redux/actions";
import {ChangeIPage} from "../redux/actions";

class LandingOptions extends React.Component {
  
  handleIPage=(ipage)=>{
    this.props.dispatch(ChangeIPage(ipage))
  }
  
  render() {
    return (  
      <View style={styles.container}>
  
        {/*Sign In*/}
        <View style={styles.button1}>
          <Button
            title='SIGN IN'
            color='#b8e0ce'
            onPress={(val)=>{
              this.handleIPage(1)}}>
          </Button>
        </View>
        
        {/*Sign Up*/}
        <View style={styles.button2}>
          <Button
            title='SIGN UP'
            color='#b8e0ce'
            onPress={(val)=>{
              this.handleIPage(2)}}>
          </Button>
        </View>
        
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
  
  button1: {
    borderRadius: 50,
    backgroundColor: '#fefefe',
    width: 200,
    height: 65,
    justifyContent: 'center',
    //marginTop:-80
  },
  
    button2: {
    borderRadius: 50,
    backgroundColor: '#fefefe',
    width: 200,
    height: 65,
    justifyContent: 'center',
    marginTop: 30
  }
  
});

function mapStateToProps(state){
  return {
    
  }}

export default connect(mapStateToProps)(LandingOptions);