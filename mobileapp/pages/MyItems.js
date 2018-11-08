import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import Swipeout from 'react-native-swipeout';

import {connect} from "react-redux";

class MyItems extends React.Component {

  componentWillMount=()=>{
    fetch("http://localhost:8888/server_leftover/show_items.php", {
      method:"POST"
    }).then((resp)=>{
      return resp.json();
    }).then((json)=>{
      if(json){
        this.setState({
          items:json
        })
      }
    });
  }
  
  state = {
    stateExp: this.dateShowed,
    items: []
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
  
  handleDelete=(id)=>{
    console.log(id);
    var fd = new FormData();
    fd.append("id", id);
    
    fetch("http://localhost:8888/server_leftover/delete_items.php", {
      method:"POST",
      body:fd
    }).then((resp)=>{
      return resp.json();
    });
    
    fetch("http://localhost:8888/server_leftover/show_items.php", {
      method:"POST"
    }).then((resp)=>{
      return resp.json();
    }).then((json)=>{
      if(json){
        this.setState({
          items:json
        })
      }
    });
  }
  
  render() {
    
    
    var allItems = this.state.items.map((obj, i)=>{
      
      date = new Date().getDate();
      month = new Date().getMonth()+1;
      year = new Date().getYear()+1900;
      today = month + '-' + date + '-' + year;
      exp = obj.expiry_date;
      datestr = exp.replace(/-/g, "/")+" 00:00:00 PST";
      expdate = new Date(datestr);
      diff = expdate - new Date();
      dateShowed = Math.ceil(diff/(1000*60*60*24));
      
      var swipeoutBtns = [
        {
          text: 'Delete',
          backgroundColor: '#F20000',
          onPress: this.handleDelete.bind(this, obj.item_id)  
        }
      ]
      
      return (
        
        <Swipeout 
          right={swipeoutBtns} 
          style={{backgroundColor:'white'}} 
          key={i}
          buttonWidth={100}
          autoClose={true}
          >
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
              {obj.name}
            </Text>
            
            {/*Item Date*/}
            <View style={styles.expireOut}>
              <View style={styles.expireIn}> 
                <Text style={{fontSize:38, fontWeight:"bold", color:this.handleColor(dateShowed)}}>{dateShowed}</Text>
                <Text style={{fontSize:16, color:this.handleColor(dateShowed)}}>{this.handleDayText(dateShowed)}</Text>
              </View>
            </View>
          </View>
        </Swipeout>
      )
    })
    return (
      
      <View style={styles.container}>  
        <ScrollView>
          {allItems}
        </ScrollView>
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