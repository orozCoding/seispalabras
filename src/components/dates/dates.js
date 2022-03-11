import { DateTime } from "luxon";

const date = DateTime.now().toObject();

const getLastVisit = () => {
  return JSON.parse(localStorage.getItem('lastCheck'));
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
  
  if ((date.year > getLastVisit().year)
    || (date.month > getLastVisit().month && date.year >= getLastVisit().year)
    || (date.day > getLastVisit().day && date.month >= getLastVisit().month && date.year >= getLastVisit().year)) {
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