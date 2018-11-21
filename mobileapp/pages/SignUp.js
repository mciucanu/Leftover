import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import {connect} from "react-redux";
import {ChangeEmail} from "../redux/actions";
import {ChangeUsername} from "../redux/actions";
import {ChangePassword} from "../redux/actions";
import {ChangeRPassword} from "../redux/actions";
import {ChangePage} from "../redux/actions";


class SignUp extends React.Component {
  
  handleEmail=(email)=>{
    this.props.dispatch(ChangeEmail(email))
  }
  
  handleUsername=(username)=>{
    this.props.dispatch(ChangeUsername(username))
  }
  
  handlePassword=(password)=>{
    this.props.dispatch(ChangePassword(password))
  }
  
  handleRPassword=(rpassword)=>{
    this.props.dispatch(ChangeRPassword(rpassword))
  }
  
  handleSignUp=()=>{
    if(this.props.showPassword == this.props.showRPassword){
      var fd = new FormData();
      fd.append("email", this.props.showEmail);
      fd.append("username", this.props.showUsername);
      fd.append("password", this.props.showPassword);
      
      fetch("https://leftover-matei.herokuapp.com/insert_user.php", {
        method:"POST",
        body:fd
      }).then((resp)=>{
        return resp.json();
      }).then((json)=>{
        //alert(json);
        if(json){
        this.props.dispatch(ChangePage(1));
        }
      });
      
    } else {
      alert("Password does not match, please try again")
    }
  }
  
  render() {
    return (  
      <View style={styles.container}>
  
        {/*Email*/}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(val)=>{
            this.handleEmail(val)
          }}
          style={{width:200, height:35, borderBottomWidth:1, borderBottomColor:'#0B0B0B', marginBottom:35}}>
        </TextInput> 
        
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
        
        {/*Repeat Password*/}
        <TextInput
          placeholder="Repeat Password"
          autoCapitalize="none"
          onChangeText={(val)=>{
            this.handleRPassword(val)
          }}
          style={{width:200, height:35, borderBottomWidth:1, borderBottomColor:'#0B0B0B', marginBottom:35}}>
        </TextInput>
        
        {/*Sign Up Button*/}
        <View style={styles.button1}>
          <Button
            title='SIGN UP'
            color='#b8e0ce'
            onPress={this.handleSignUp}>
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
    justifyContent: 'center'
  },
  
});

function mapStateToProps(state){
  return {
    showEmail: state.ReducerFunc.email,
    showUsername: state.ReducerFunc.username,
    showPassword: state.ReducerFunc.password,
    showRPassword: state.ReducerFunc.rpassword
  }}

export default connect(mapStateToProps)(SignUp);