import React from 'react';
import { StyleSheet, Text, View, Slider } from 'react-native';

export default class ShoppingList extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Shopping List Page</Text>
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
