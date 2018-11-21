import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {connect} from "react-redux";

class Recipes extends React.Component {

  state = {
    recipes:""
  }
  
  componentWillMount=async ()=>{
    var resp = await fetch("https://api.edamam.com/search?q=chicken&app_id=2ee30f39&app_key=ab6b5394966b4cdcb18b0d4640575337");
    console.log(resp);
    var json = await resp.json();
    console.log(json);
    this.setState({
      recipes:json
    })
  }
  
  render() {
    
    var allRecipes = this.state.recipes.map((obj, index)=>{
      return (
        <View 
          key={index}
          style={styles.item}>
          
          {/*Recipe Image*/}
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
            {/*obj.name*/}
            Title
          </Text>
        </View>
      )
    });
    
    return (
      <View style={styles.container}>
        <Text>Recipes Page</Text>
        {allRecipes}
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
  
  item: {
    width:'100%',
    height:130,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    borderBottomColor:'lightgrey',
    borderBottomWidth:1
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
  
  name: {
    flex:2,
    fontSize:20,
    left:30
  },
  
});

function mapStateToProps(state){
  return {
    showName: state.ReducerFunc.name,
    showDate: state.ReducerFunc.date,
    showNewExp: state.ReducerFunc.newExp,
    showSLName: state.ReducerFunc.slname
  }}

export default connect(mapStateToProps)(Recipes);

/*

CREATE TABLE recipes (
 recipe_id INT NOT NULL AUTO_INCREMENT,
 name VARCHAR (255) NOT NULL,
 image LONGTEXT,
 ingredients VARCHAR(255) NOT NULL,
 directions LONGTEXT NOT NULL,
 PRIMARY KEY (recipe_id)
);

*/