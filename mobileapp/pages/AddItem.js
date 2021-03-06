import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';

import {connect} from "react-redux";
import {ChangeName} from '../redux/actions';
import {ChangeDate} from '../redux/actions';


class AddItem extends React.Component {
  
  date = new Date().getDate();
  month = new Date().getMonth()+1;
  year = new Date().getYear()+1900;
  today = this.month + '-' + this.date + '-' + this.year;
  exactTime = new Date();
  
  state = {
    myDate: null,
  }
  
  handleName=(val)=>{
    this.props.dispatch(ChangeName(val))
  }
  
  handleDate=(val)=>{
    this.setState({
      myDate:val
    })
    this.props.dispatch(ChangeDate(val))
  }
  
  handleAdd=()=>{
    
    var fd = new FormData();
    fd.append("name", this.props.showName);
    fd.append("expiry_date", this.props.showDate);
    fd.append("added_date", this.today);
    fd.append("exact_time", this.exactTime);
    
    fetch("https://leftover-matei.herokuapp.com/insert_item.php", {
      method:"POST",
      body:fd
    }).then((resp)=>{
      return resp.json();
    }).then((json)=>{
      if(json){
        alert("Item Added");
      }
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Item Name"
          onChangeText={(val)=>{
            this.handleName(val)}}
          style={{width:200, height:35, borderBottomWidth:1, borderBottomColor:'#0B0B0B', marginBottom: 35, paddingLeft:5}}>
        </TextInput>
        <DatePicker
          onDateChange={(val)=>{
            this.handleDate(val)}}
          style={styles.date}
          date={this.state.myDate}
          confirmBtnText="Save"
          cancelBtnText="Cancel"
          format="MM-DD-YYYY"
          placeholder="Expiry Date"
          showIcon={false}
          customStyles={{
            dateInput: {
              borderTopWidth:0,
              borderLeftWidth:0,
              borderRightWidth:0,
              paddingRight:120,
              borderBottomColor:'#0B0B0B',
              width:200
            }
          }}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={this.handleAdd}>
          <Text style={styles.addText}>Add to My Items</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  addButton: {
    alignItems:'center',
    justifyContent:'center',
    width:200,
    height:50,
    borderRadius:25,
    backgroundColor:'#B8E0CE',
  },
  
  addText: {
    fontFamily: 'Helvetica',
    color:'#FFFFFF'
  },
  
  date: {
    width: 200,
    marginBottom: 70
  }
  
});

function mapStateToProps(state){
  return {
    showName: state.ReducerFunc.name,
    showDate: state.ReducerFunc.date
  }
}

export default connect(mapStateToProps)(AddItem);