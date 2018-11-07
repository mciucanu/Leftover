import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';

import {connect} from "react-redux";

class MyItems extends React.Component {
  
  date = new Date().getDate();
  month = new Date().getMonth()+1;
  year = new Date().getYear()+1900;
  today = this.month + '-' + this.date + '-' + this.year;
  exp = this.props.showDate;
  diff = this.exp - this.today;
  datestr = this.exp.replace(/-/g, "/")+" 00:00:00 PST";
  expdate = new Date(this.datestr);
  diff = this.expdate - new Date();
  dateShowed = Math.ceil(this.diff/(1000*60*60*24));

  state = {
    stateExp: this.dateShowed
  }
  
  handleColor=(val)=>{
    if(val<=2){
      return ("#F20000")
    } 
    if(val>=2 && val<=4){
      return ("#FFC200")
    }
    if(val>=5){
      return ("#00B500")
    }
  }
  
  handleDayText=(val)=>{
    if(val==1){
      return ("DAY")
    } else {
      return ("DAYS")
    }
  }
  
  
  
  render() {
    
    return (
      <View style={styles.container}>
        
        {/*ITEM 1*/}
        <View style={styles.item}>
          
          {/*Item Image*/}
          <View style={styles.imgOut}>  
            <Image 
              style={styles.itemImg}
              source={require('../imgs/item1.jpg')}
              resizeMode='contain'
            />
          </View>
          
          {/*Item Name*/}
          <Text 
            style={styles.name}>
            {this.props.showName}
          </Text>
          
          {/*Item Date*/}
          <View style={styles.expireOut}>
            <View style={styles.expireIn}> 
              <Text style={{fontSize:38, fontWeight:"bold", color:this.handleColor(this.dateShowed)}}>{this.dateShowed}</Text>
              <Text style={{fontSize:16, color:this.handleColor(this.dateShowed)}}>{this.handleDayText(this.dateShowed)}</Text>
            </View>
          </View>
          
        </View>
      
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width:'100%'
  },
  
  item: {
    width:'100%',
    height:130,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    borderBottomColor:'lightgrey',
    borderBottomWidth:1
  },
  
  name: {
    flex:2,
    fontSize:20,
    left:30
  },
  
  expireOut: {
    flex:1,
    alignItems:'flex-end',
    right:30
  },
  
  expireIn: {
    alignItems:'center'
  },
  
  imgOut: {
    overflow:'hidden',
    width:120,
    height:90
  },
  
  itemImg: {
    width:90,
    flex:1,
    left:30,
    borderRadius:45
  },
  
});

function mapStateToProps(state){
  return {
    showName: state.ReducerFunc.name,
    showDate: state.ReducerFunc.date
  }}

export default connect(mapStateToProps)(MyItems);