const initialStates = {
  page:0,
  ipage:0,
  title:"My Items",
  name:"",
  date:"",
  email:"",
  username:"",
  password:"",
  rpassword:""
}

export function ReducerFunc(state=initialStates, action){
  
  var obj = Object.assign({}, state);
  
  switch(action.type){
    
    case "CHANGE_PAGE":
      obj.page = action.page;
      return obj;
      
    case "CHANGE_IPAGE":
      obj.ipage = action.ipage;
      return obj;
      
    case "CHANGE_NAME":
      obj.name = action.name;
      return obj;
      
    case "CHANGE_DATE":
      obj.date = action.date;
      return obj;
      
    case "CHANGE_EMAIL":
      obj.email = action.email;
      return obj;
      
    case "CHANGE_USERNAME":
      obj.username = action.username;
      return obj;
      
    case "CHANGE_PASSWORD":
      obj.password = action.password;
      return obj;
      
    case "CHANGE_RPASSWORD":
      obj.rpassword = action.rpassword;
      return obj;
    
    default:
      return state;
  }
}