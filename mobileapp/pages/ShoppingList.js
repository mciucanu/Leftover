import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';

import {UpdateExpiry} from '../redux/actions';
import {UpdateSLName} from '../redux/actions';

import {connect} from "react-redux";

class ShoppingList extends React.Component {

  date = new Date().getDate();
  month = new Date().getMonth()+1;
  year = new Date().getYear()+1900;
  today = this.month + '-' + this.date + '-' + this.year;
  exp = this.props.showDate;
  datestr = exp.replace(/-/g, "/")+" 00:00:00 PST";
  expdate = new Date(datestr);
  diff = expdate - new Date();
  dateShowed = Math.ceil(diff/(1000*60*60*24));
  
  componentWillMount=()=>{
    fetch("https://leftover-matei.herokuapp.com/show_shopping_list.php", {
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
    items: [],
    modal: false,
    modal2: false,
    idPicked: null,
    namePicked: null,
    myDate: null,
    slId: null
  }

  handleDelete=(id)=>{
    console.log(id);
    var fd = new FormData();
    fd.append("id", id);
    
    fetch("https://leftover-matei.herokuapp.com/delete_shopping_list.php", {
      method:"POST",
      body:fd
    }).then((resp)=>{
      return resp.json();
    }).then((json)=>{
      if(json){
        fetch("https://leftover-matei.herokuapp.com/show_shopping_list.php", {
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
    });
  }
  
  handleAdd=(id, name, slId)=>{
    this.setState({
      modal:true,
      idPicked:id,
      namePicked:name,
      slId:slId
    })
  }
  
  handleUpdate=()=>{
    var fd0 = new FormData();
    fd0.append("item_id", this.state.idPicked);
    
    fetch("https://leftover-matei.herokuapp.com/check_item.php", {
      method:"POST",
      body:fd0
    }).then((resp)=>{
      return resp.json();
    }).then((json)=>{
      console.log(json);
      if(json!=true){
        
        var fd = new FormData();
        fd.append("item_id", this.state.idPicked);
        fd.append("exp_date", this.props.showNewExp);
        
        fetch("https://leftover-matei.herokuapp.com/update_expiry_date.php", {
          method:"POST",
          body:fd
        }).then((resp)=>{
          return resp.json();
        }).then((json)=>{
          if(json){
            
            var fd2 = new FormData();
            fd2.append("id", this.state.slId);
            
            fetch("https://leftover-matei.herokuapp.com/delete_shopping_list.php", {
              method:"POST",
              body:fd2
            }).then((resp)=>{
              return resp.json();
            }).then((json)=>{
              if(json){
                
                fetch("https://leftover-matei.herokuapp.com/show_shopping_list.php", {
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
            });
            this.setState({
              modal:false
            }) 
          }
        }
      )}
      
      if(json==false){
        
        var fd2 = new FormData();
        fd2.append("name", this.state.namePicked);
        fd2.append("expiry_date", this.props.showNewExp);
        fd2.append("added_date", this.today);
        
        fetch("https://leftover-matei.herokuapp.com/insert_item.php", {
          method:"POST",
          body:fd2
        }).then((resp)=>{
          return resp.json();
        }).then((json)=>{
          if(json){
            
            var fd3 = new FormData();
            fd3.append("id", this.state.slId);
            
            fetch("https://leftover-matei.herokuapp.com/delete_shopping_list.php", {
              method:"POST",
              body:fd3
            }).then((resp)=>{
              return resp.json();
            }).then((json)=>{
              if(json){
                
                fetch("https://leftover-matei.herokuapp.com/show_shopping_list.php", {
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
            });           
            this.setState({
              modal:false
            })
          }
        })
        
      }
    });
  }
  
  handleDate=(val)=>{
    this.setState({
      myDate:val,
    })
    this.props.dispatch(UpdateExpiry(val))
  }
  
  handleClose=()=>{
    this.setState({
      modal:false
    })
  }
  
  handleClose2=()=>{
    this.setState({
      modal2:false
    })
  }
  
  handleAddItem=()=>{
    this.setState({
      modal2:true
    })
  }
  
  handleName=(name)=>{
    this.props.dispatch(UpdateSLName(name))
  }
  
  handleAddSL=()=>{
    var fd3 = new FormData();
    fd3.append("name", this.props.showSLName);
        
    fetch("https://leftover-matei.herokuapp.com/insert_slitem.php", {
      method:"POST",
      body:fd3
    }).then((resp)=>{
      return resp.json();
    }).then((json)=>{
      if(json){
        this.setState({
          modal2:false
        })
      }
      fetch("https://leftover-matei.herokuapp.com/show_shopping_list.php", {
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
            onPress={(val)=>{
              this.handleAdd(obj.item_id, obj.name, obj.slitem_id)}}>
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
          
          {/*ADD SL ITEM*/}
          <View style={styles.addItem}>
            <TouchableOpacity
              style={styles.addItemBut}
              onPress={this.handleAddItem}>
              <Text style={styles.addButText}>+</Text>
            </TouchableOpacity>
          </View>
          
          {/*BOUGHT ITEM*/}
          <Modal
            visible={this.state.modal}
            transparent={true}>
            <View style={styles.modalContainerOut}>
              <View style={styles.modalContainerIn}>
                
                {/*Close Button*/}
                <TouchableOpacity
                  onPress={this.handleClose}
                  style={styles.closeBut}>
                  <Text style={{color:'lightgrey', fontSize:24, fontWeight:'bold'}}>X</Text>
                </TouchableOpacity>
                
                {/*Heading*/}
                <Text style={styles.updateDateText}>Update Expiry Date</Text>
                
                {/*Date Input*/}
                <DatePicker
                  onDateChange={(val)=>{
                    this.handleDate(val)}}
                  date={this.state.myDate}
                  style={{width:200}}
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
                      paddingRight:125,
                      borderBottomColor:'#0B0B0B'
                    }
                  }}
                />
                
                {/*Update Button*/}
                <TouchableOpacity 
                  style={styles.updateBut}
                  onPress={this.handleUpdate}>
                  <Text style={styles.butText}>Update Item</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          
          
          <Modal
            visible={this.state.modal2}
            transparent={true}>
            <View style={styles.modalContainerOut}>
              <View style={styles.modalContainerIn}>
                
                {/*Close Button*/}
                <TouchableOpacity
                  onPress={this.handleClose2}
                  style={styles.closeBut}>
                  <Text style={{color:'lightgrey', fontSize:24, fontWeight:'bold'}}>X</Text>
                </TouchableOpacity>
                
                {/*Heading*/}
                <Text style={styles.updateDateText}>Add New Item</Text>
                
                <TextInput
                  placeholder="Item Name"
                  onChangeText={(val)=>{
                    this.handleName(val)}}
                  style={{width:200, height:35, borderBottomWidth:1, borderBottomColor:'#0B0B0B', marginBottom: 35}}>
                </TextInput>
                
                {/*Add SL Item Button*/}
                <TouchableOpacity 
                  style={styles.updateBut}
                  onPress={this.handleAddSL}>
                  <Text style={styles.butText}>Add Item</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          
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
  },
  
  modalContainerOut: {
    flex:1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    width:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
  
  modalContainerIn: {
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center',
    width:300,
    height:300,
    borderWidth:1,
    borderColor:'lightgrey',
    borderRadius:40
  },
  
  updateDateText: {
    fontFamily:'Helvetica',
    fontSize:18,
    marginBottom:40
  },
  
  updateBut: {
    width:150,
    height:40,
    backgroundColor:'#B8E0CE',
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
    marginTop:40
  },
  
  closeBut: {
    position:'absolute',
    right:20,
    top:20
  }
  
});

function mapStateToProps(state){
  return {
    showName: state.ReducerFunc.name,
    showDate: state.ReducerFunc.date,
    showNewExp: state.ReducerFunc.newExp,
    showSLName: state.ReducerFunc.slname
  }}

export default connect(mapStateToProps)(ShoppingList);