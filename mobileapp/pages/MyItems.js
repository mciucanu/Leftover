import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, Modal, TouchableOpacity } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';

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
    items: [],
    sorted_items: [],
    slitem: [],
    slitem_id:"",
    slitem_name:"",
    slitem_image:"",
    sort:"Expiry Date",
    modal:false,
    clickedId:"",
    newExpDate:"",
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
  
  handleDelete=(id)=>{
    var fd = new FormData();
    fd.append("id", id);
    
    fetch("http://localhost:8888/server_leftover/delete_items.php", {
      method:"POST",
      body:fd
    }).then((resp)=>{
      return resp.json();
    }).then((json)=>{
      if(json){
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
    });
  }
  
  handleAddToSL=(id)=>{
    var fd = new FormData();
    fd.append("id", id);
    
    fetch("http://localhost:8888/server_leftover/add_to_sl1.php", {
      method:"POST",
      body:fd
    }).then((resp)=>{
      return resp.json();
    }).then((json)=>{
      if(json){
        this.setState({
          slitem:json
        })
        this.setState({
          slitem_id:this.state.slitem[0].item_id,
          slitem_name:this.state.slitem[0].name,
          slitem_image:this.state.slitem[0].image
        })
      }
    
      var fd2 = new FormData();
      fd2.append("item_id", this.state.slitem_id);
      fd2.append("name", this.state.slitem_name);
      fd2.append("image", this.state.slitem_image);
    
      fetch("http://localhost:8888/server_leftover/add_to_sl2.php", {
        method:"POST",
        body:fd2
      }).then((resp)=>{
        return resp.json();
      }).then((json)=>{
        if(json){
          alert("Item Added to Shopping List");
        }
      });    
    });
  }
  
  handleMonthYear=(val)=>{
    if(val <= 30){
      return(val);
    }
    if(val > 30 && val < 365){
      var myMonth = val / 30;
      var roundedMonth = Math.floor(myMonth);
      return(roundedMonth);
    }
    if(val >= 365){
      var myYear = val / 365;
      var roundedYear = Math.floor(myYear);
      return(roundedYear);
    }
  }
  
  handleDayText=(val)=>{
    if(val==1){
      return ("DAY")
    }
    if(val > 1 && val <= 30){
      return ("DAYS")
    }
    if(val > 30 && val < 60){
      return ("MONTH")
    }
    if(val >= 60 && val < 365){
      return ("MONTHS")
    }
    if(val >= 365 && val < 730){
      return ("YEAR")
    }
    if(val >= 730){
      return ("YEARS")
    }
  }
  
  handleExpired=(dateShowed)=>{
    if(dateShowed <= 0){
      return (
        <View style={{alignItems:'center'}}>
          <Text style={{fontSize:16, color:this.handleColor(dateShowed)}}>EXPIRED</Text>
        </View>
      )
    } else {
      return (
        <View style={{alignItems:'center'}}>
          <Text style={{fontSize:38, fontWeight:"bold", color:this.handleColor(dateShowed)}}>{this.handleMonthYear(dateShowed)}</Text>
          <Text style={{fontSize:16, color:this.handleColor(dateShowed)}}>{this.handleDayText(dateShowed)}</Text>
        </View>
      )
    }
  }
  
  sortByExpire=(items)=>{
    var newItems = items;
    
    newItems.sort((a,b)=>{
      date = new Date().getDate();
      month = new Date().getMonth()+1;
      year = new Date().getYear()+1900;
      today = month + '-' + date + '-' + year;
      
      exp = a.expiry_date;
      datestr = exp.replace(/-/g, "/")+" 00:00:00 PST";
      expdate = new Date(datestr);
      diff = expdate - new Date();
      dateShowedA = Math.ceil(diff/(1000*60*60*24));
      
      exp = b.expiry_date;
      datestr = exp.replace(/-/g, "/")+" 00:00:00 PST";
      expdate = new Date(datestr);
      diff = expdate - new Date();
      dateShowedB = Math.ceil(diff/(1000*60*60*24));
      
      if(dateShowedA < dateShowedB){
        return -1;
      }
      if(dateShowedA > dateShowedB){
        return 1;
      }
      return 0;
    })
    return newItems;
  }
  
  sortByName=(items)=>{
    var newItems = items;
    
    newItems.sort((a,b)=>{
      if(a.name > b.name){
        return 1;
      }
      if(a.name < b.name){
        return -1;
      }
      return 0;
    })
    return newItems;
  }
  
  sortByAdded=(items)=>{
    var newItems = items;
    
    newItems.reverse();
    return newItems;
  }
  
  handleSortDrop=(val)=>{
    this.setState({
      sort:val
    })
  }
  
  handleSort=(val)=>{
    if(val == "Expiry Date"){
      return this.sortByExpire(this.state.items)
    }
    if(val == "Recently Added"){
      return this.sortByAdded(this.state.items)
    }
    if(val == "Name"){
      return this.sortByName(this.state.items)
    }
  }
  
  handleUpdate=(val)=>{
    this.setState({
      modal:true,
      clickedId:val
    })
  }
  
  handleClose=()=>{
    this.setState({
      modal:false
    })
  }
  
  handleUpdateDateInp=(val)=>{
    this.setState({
      newExpDate:val
    })
  }
  
  handleUpdateExpBut=()=>{
    var fd = new FormData();
    fd.append("item_id", this.state.clickedId);
    fd.append("expiry_date", this.state.newExpDate);
    
    fetch("http://localhost:8888/server_leftover/update_expiry_swipeout.php", {
      method:"POST",
      body:fd
    }).then((resp)=>{
      return resp.json();
    }).then((json)=>{
      if(json){
        this.setState({
          modal:false
        })
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
    });
  }
  
  render() {
    
    if(this.state.items.length > 0){
      this.state.items = this.handleSort(this.state.sort)
    }
    
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
          text: 'Update EXP',
          backgroundColor: 'lightblue',
          onPress: this.handleUpdate.bind(this, obj.item_id)  
        },
        {
          text: "Add to SL",
          backgroundColor: '#B8E0CE',
          onPress: this.handleAddToSL.bind(this, obj.item_id)  
        },
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
                {this.handleExpired(dateShowed)}
              </View>
            </View>
          </View>
        </Swipeout>
      )
    })
    
    let data = [{
      value: 'Expiry Date',
    }, {
      value: 'Recently Added',
    }, {
      value: 'Name',
    }];
    
    return (
      
      <View style={styles.container}>  
        <View style={styles.dropDownBorder}>
          <View style={styles.dropDown}>  
            <Dropdown
              label='Sort By'
              data={data}
              value="Expiry Date"
              onChangeText={(val)=>{
                this.handleSortDrop(val)
              }}
            />
          </View>
        </View>
        <ScrollView>
          {allItems}
        </ScrollView>
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
                    this.handleUpdateDateInp(val)}}
                  date={this.state.newExpDate}
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
                
                {/*Add SL Item Button*/}
                <TouchableOpacity 
                  style={styles.updateBut}
                  onPress={this.handleUpdateExpBut}>
                  <Text style={styles.butText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
    alignItems:'center',
    right:15
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
  
  dropDown: {
    marginLeft:30,
    marginRight:30,
    paddingBottom:5
  },
  
  dropDownBorder: {
    width:'100%',
    borderBottomWidth:1,
    borderBottomColor:'lightgrey'
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
  
  closeBut: {
    position:'absolute',
    right:20,
    top:20
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
  
    butText: {
    fontFamily: 'Helvetica',
    color:'#FFFFFF'
  },
  
});

function mapStateToProps(state){
  return {
    showName: state.ReducerFunc.name,
    showDate: state.ReducerFunc.date
  }}

export default connect(mapStateToProps)(MyItems);