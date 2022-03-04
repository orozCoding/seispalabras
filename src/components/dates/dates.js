import { DateTime } from "luxon";

const date = DateTime.now().toLocaleString();

const getLastVisit = () => {
  return JSON.parse(localStorage.getItem('lastVisit'));
}

const storageDate = () => {
  localStorage.setItem('lastVisit', JSON.stringify(date));
}

const checkSameDay = () => {
  if (date === getLastVisit()) {
    return true;
  }
  return false;
};

const checkNewDay = () => {
  if (date > getLastVisit()) {
    return true;
  }
  return false;
};

const storageNewDay = () => {
  if(!getLastVisit() || checkNewDay()){
    storageDate();
  }
}

export { 
  storageDate,
  checkSameDay,
  checkNewDay,
  storageNewDay
 };