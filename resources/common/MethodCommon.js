import {INFO_USER} from './parameters'
export const MethodCommon = {
    saveCookies,
    getCookies,
    saveLocalStorage,
    getLocalStorage,
    check_authenticate,
    clearCookie,
    clearLocalStorage,
};
// save cookies
function saveCookies(cname, cvalue){
    document.cookie = `${cname}=${cvalue};`;
}
//get value cookie
function getCookies(cname){
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
//save to local storage
function saveLocalStorage(name,value){
    localStorage.setItem(name, JSON.stringify(value));
}
//get value from local storage
function getLocalStorage(name_localstorage){
  var result = localStorage.getItem(name_localstorage);
  result = JSON.parse(result)
  return result
}
//check authenticate in by localStorage
function check_authenticate(){
    let data_user =getLocalStorage(INFO_USER)
    let result = false
    if(data_user !== null){
      return  true
    }
    return result 
}

// remove cookie
function clearCookie(cname){
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
// remove local storage
function clearLocalStorage(name){
  localStorage.removeItem(name);
}