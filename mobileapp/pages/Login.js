import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import {connect} from "react-redux";
import {ChangePage} from "../redux/actions";

class Login extends React.Component {
  
  state = {
    username:"",
    password:""
  }
  
  handleUsername=(val)=>{
    this.setState({
      username:val
    })
  }
  
  handlePassword=(val)=>{
    this.setState({
      password:val
    })
  }
  
  handleSignIn=()=>{
    var fd = new FormData();
    fd.append("username", this.state.username);
    fd.append("password", this.state.password);
    
      fetch("http://localhost:8888/server_leftover/check_login.php", {
        method:"POST",
        body:fd
      }).then((resp)=>{
        return resp.json();
      }).then((json)=>{
        if(json){
        alert(json);
        this.props.dispatch(ChangePage(1));
        } else {
          alert("Incorrect username/password, please try again")
        }
      });
  }
  
  render() {
    return (  
      <View style={styles.container}>
  
        {/*Username*/}
        <TextInput
          placeholder="Username"
          autoCapitalize="none"
          onChangeText={(val)=>{
            this.handleUsername(val)
          }}
          style={{width:200, height:35, borderBottomWidth:1, borderBottomColor:'#0B0B0B', marginBottom:35}}>
        </TextInput>  
        
        {/*Password*/}
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(val)=>{
            this.handlePassword(val)
          }}
          style={{width:200, height:35, borderBottomWidth:1, borderBottomColor:'#0B0B0B', marginBottom:35}}>
        </TextInput>
        
        {/*Login Button*/}
        <View style={styles.button1}>
          <Button
            title='SIGN IN'
            color='#b8e0ce'
            onPress={this.handleSignIn}>
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
    width: 150,
    height: 50,
    justifyContent: 'center'
  },
  
});

function mapStateToProps(state){
  return {
    
  }}

export default connect(mapStateToProps)(Login);