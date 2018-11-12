import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
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
    items: []
  }

  handleDelete=(id)=>{
    console.log(id);
    var fd = new FormData();
    fd.append("id", id);
    
    fetch("http://localhost:8888/server_leftover/delete_shopping_list.php", {
      method:"POST",
      body:fd
    }).then((resp)=>{
      return resp.json();
    });
    
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
          
          {/*Add Button*/}
          <TouchableOpacity
            style={styles.addButton}
            onPress={this.handleAdd}>
            <Text style={styles.butText}>Bought</Text>
          </TouchableOpacity>
          
          
          {/*Delete Button*/}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={this.handleDelete.bind(this, obj.slitem_id)}>
            <Text style={styles.butText}>Delete</Text>
          </TouchableOpacity>
          
        </View>
      )
    })
    return (
      
      <ScrollView>
        <View style={styles.container}>  
          {allItems}
          <View style={styles.addItem}>
            <TouchableOpacity
              style={styles.addItemBut}
              onPress={this.handleAddItem}>
              <Text style={styles.addButText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width:'100%',
    flexDirection:'row',
    alignItems:'flex-start',
    flexWrap:'wrap'
  },
  
  item: {
    width:'50%',
    height:290,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',
    borderBottomColor:'lightgrey',
    borderBottomWidth:1,
    borderRightColor:'lightgrey',
    borderRightWidth:1,
    paddingBottom:30
  },
  
  addItem: {
    width:'50%',
    height:290,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',
    borderBottomColor:'lightgrey',
    borderBottomWidth:1,
    borderRightColor:'lightgrey',
    borderRightWidth:1
  },
  
  addItemBut: {
    alignItems:'center',
    justifyContent:'center',
    width:60,
    height:60,
    borderRadius:30,
    backgroundColor:'#B8E0CE'
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
  
  addButton: {
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:40,
    borderRadius:25,
    backgroundColor:'#B8E0CE',
    marginBottom:10
  },
  
  deleteButton: {
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:40,
    borderRadius:25,
    backgroundColor:'#F20000',
  },
  
  butText: {
    fontFamily: 'Helvetica',
    color:'#FFFFFF'
  },
  
  addButText: {
    fontFamily: 'Helvetica',
    color:'#FFFFFF',
    fontSize:26
  }
  
});

function mapStateToProps(state){
  return {
    showName: state.ReducerFunc.name,
    showDate: state.ReducerFunc.date
  }}

export default connect(mapStateToProps)(ShoppingList);