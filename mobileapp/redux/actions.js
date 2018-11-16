export function ChangePage(page, title){
  return {
    type:"CHANGE_PAGE",
    page:page
  }
}

export function ChangeIPage(ipage, title){
  return {
    type:"CHANGE_IPAGE",
    ipage:ipage
  }
}

export function ChangeName(name){
  return {
    type:"CHANGE_NAME",
    name:name
  }
}

export function ChangeDate(date){
  return {
    type:"CHANGE_DATE",
    date:date
  }
}

export function ChangeEmail(email){
  return {
    type:"CHANGE_EMAIL",
    email:email
  }
}

export function ChangeUsername(username){
  return {
    type:"CHANGE_USERNAME",
    username:username
  }
}

export function ChangePassword(password){
  return {
    type:"CHANGE_PASSWORD",
    password:password
  }
}

export function ChangeRPassword(rpassword){
  return {
    type:"CHANGE_RPASSWORD",
    rpassword:rpassword
  }
}

export function UpdateExpiry(newExp){
  return {
    type:"UPDATE_EXPIRY",
    newExp:newExp
  }
}

export function UpdateSLName(slname){
  return {
    type:"UPDATE_SLNAME",
    slname:slname
  }
}