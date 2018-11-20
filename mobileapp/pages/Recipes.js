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
    return (
      <View style={styles.container}>
        <Text>Recipes Page</Text>
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