import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, Image } from 'react-native';

import MyItems from "./MyItems";
import ShoppingList from "./ShoppingList";
import AddItem from "./AddItem";
import Recipes from "./Recipes";
import Settings from "./Settings";

import {connect} from "react-redux";

class Main extends React.Component {

  state={
    page:0,
    pageTitle:'My Items'
  }
  
  handlePage=(page, title)=>{
    this.setState({
      page: page,
      pageTitle: title
    })
  }
  
  render() {
    
    var curpage = <MyItems />
        
    if(this.state.page == 1){
      curpage = <MyItems />;
    } 
    
    if(this.state.page == 2){
      curpage = <AddItem />;
    }
    
    if(this.state.page == 3){
      curpage = <ShoppingList />;
    }   
    
    if(this.state.page == 4){
      curpage = <Recipes />;
    }
    
    if(this.state.page == 5){
      curpage = <Settings />;
    }
    
    return (
      <View style={styles.container}>
        
        <View style={styles.headerBar}>
          {/*Logo*/}
          <View style={styles.butOut}>  
            <Image
              style={styles.logo}
              source={require('../imgs/logob.png')}
              resizeMode='contain'
            />
          </View>
          {/*Title*/}
          <View style={styles.titleOut}> 
            <Text style={styles.pageTitle}>
              {this.state.pageTitle}
            </Text>
          </View>
          {/*Settings Button*/}
          <View style={styles.settingOut}>  
            <TouchableHighlight
              onPress={(val)=>{
                this.handlePage(5, "Settings")
              }}>
              <Image
                style={styles.butset}
                source={require('../imgs/butset.png')}
                resizeMode='contain'
              />
            </TouchableHighlight>
          </View>
        </View>
        
        {curpage}
        
        <View style={styles.navBar}> 
          
          {/*My Items Button*/}
          <TouchableHighlight
            onPress={(val)=>{
              this.handlePage(1, "My Items")
            }}>
            <Image
              style={styles.but1}
              source={require('../imgs/but1.png')}
              resizeMode='contain'
            />
          </TouchableHighlight>
          
          {/*Add Item Button*/}
          <TouchableHighlight
            onPress={(val)=>{
              this.handlePage(2, "Add Item")
            }}>
            <Image
              style={styles.but3}
              source={require('../imgs/but3.png')}
              resizeMode='contain'
            />
          </TouchableHighlight>
          
          {/*Shopping List Button*/}
          <TouchableHighlight
            onPress={(val)=>{
              this.handlePage(3, "Shopping List")
            }}>
            <Image
              style={styles.but2}
              source={require('../imgs/but2.png')}
              resizeMode='contain'
            />
          </TouchableHighlight>
          
          {/*Recipes Button*/}
          <TouchableHighlight
            onPress={(val)=>{
              this.handlePage(4, "Recipes")
            }}>
            <Image
              style={styles.but4}
              source={require('../imgs/but4.png')}
              resizeMode='contain'
            />
          </TouchableHighlight>
          
        </View>
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
    width:'100%'
  },
  
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    width: '100%',
  },
  
  headerBar: {
    width: '100%',
    height: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //borderBottomColor: '#0B0B0B',
    //borderBottomWidth: 2,
    backgroundColor: '#F7F7F7',
    paddingTop:25
  },
  
  pageTitle: {
    fontSize: 25,
    fontFamily: 'Helvetica',
  },
  
  but1: {
    width: 24,
    flex: 1,
    marginLeft: 25,
    marginRight: 25
  },
  
  but2: {
    width: 34,
    flex: 1,
    marginLeft: 25,
    marginRight: 25
  },
  
  but3: {
    width: 40,
    flex: 1,
    marginLeft: 25,
    marginRight: 25
  },
  
  but4: {
    width: 40,
    flex: 1,
    marginLeft: 25,
    marginRight: 25
  },
  
  butset: {
    width: 35,
    flex: 1
  },
  
  logo: {
    width:35,
    flex:1
  },
  
  titleOut: {
    flex:2,
    alignItems:'center'
  },
  
  settingOut: {
    flex:1,
    alignItems:'flex-end',
    right:30
  },
  
  butOut: {
    flex:1,
    alignItems:'flex-start',
    left:30
  }
  
});

function mapStateToProps(state){
  return {
    
  }}

export default connect(mapStateToProps)(Main);