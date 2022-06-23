import { DateTime } from "luxon";

const date = new Date();

const getLastVisit = () => {
  return new Date(JSON.parse(localStorage.getItem('lastCheck')));
}

const storageDate = () => {
  localStorage.setItem('lastCheck', JSON.stringify(date));
}

const checkSameDay = () => {
  if (date === getLastVisit()) {
    return true;
  }
  return false;
};

const checkNewDay = () => {
  if(!getLastVisit()){
    return true;
  }
  
  if (date.getDate() !== getLastVisit().getDate()) {
    return true;
  }
  return false;
};

const storageNewDay = () => {
  if (!getLastVisit() || checkNewDay()) {
    storageDate();
  }
}

export {
  storageDate,
  checkSameDay,
  checkNewDay,
  storageNewDay
};