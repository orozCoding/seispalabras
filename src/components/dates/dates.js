const today = new Date();

const getLastVisit = () => {
  return new Date(JSON.parse(localStorage.getItem('lastCheck')));
}

const storageDate = () => {
  localStorage.setItem('lastCheck', JSON.stringify(today));
}

const checkSameDay = () => {
  if (today === getLastVisit()) {
    return true;
  }
  return false;
};

const checkNewDay = () => {
  if(!getLastVisit()){
    return true;
  }
  
  if (today.getDate() !== getLastVisit().getDate()) {
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