import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import Swipeout from 'react-native-swipeout';

import {connect} from "react-redux";

class ShoppingList extends React.Component {

  componentWillMount=()=>{
    fetch("http://localhost:8888/server_leftover/show_shopping_list.php", {
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
  
  render() {
    
    
    var allItems = this.state.items.map((obj, i)=>{
      
      return (
      
        <View style={styles.item} key={i}>
          
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
          
        </View>
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
    width:'100%',
    flexDirection:'column'
  },
  
  item: {
    width:'50%',
    height:200,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',
    borderBottomColor:'lightgrey',
    borderBottomWidth:1,
    borderRightColor:'lightgrey',
    borderRightWidth:1
  },
  
  name: {
    flex:1,
    fontSize:20
  },
  
  imgOut: {
    overflow:'hidden',
    width:120,
    height:90,
    marginTop:30,
    marginBottom:10,
    alignItems:'center'
  },
  
  itemImg: {
    width:90,
    flex:1,
    borderRadius:45
  },
  
});

function mapStateToProps(state){
  return {
    showName: state.ReducerFunc.name,
    showDate: state.ReducerFunc.date
  }}

export default connect(mapStateToProps)(ShoppingList);