export function ChangePage(page, title){
  return {
    type:"CHANGE_PAGE",
    page:page,
    title:title
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