const initialStates = {
  page:1,
  title:"My Items",
  name:"",
  date:""
}

export function ReducerFunc(state=initialStates, action){
  
  var obj = Object.assign({}, state);
  
  switch(action.type){
    
    case "CHANGE_PAGE":
      obj.page = action.page;
      obj.title = action.title;
      return obj;
      
    case "CHANGE_NAME":
      obj.name = action.name;
      return obj;
      
    case "CHANGE_DATE":
      obj.date = action.date;
      return obj;
    
    default:
      return state;
  }
}