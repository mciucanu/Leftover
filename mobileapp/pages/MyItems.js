import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Dropdown } from 'react-native-material-dropdown';

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
//        var unsorted = this.state.items;
//        var sorted = unsorted.sort("days_left");
//        this.setState({
//          sorted_items: sorted
//        })
//        console.log(this.state.sorted_items);
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
    sort:"Expiry Date"
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
          text: "Add to Shopping List",
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
  }
  
});

function mapStateToProps(state){
  return {
    showName: state.ReducerFunc.name,
    showDate: state.ReducerFunc.date
  }}

export default connect(mapStateToProps)(MyItems);