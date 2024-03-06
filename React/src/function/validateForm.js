export const validateEmail = (email) =>{
    var regex = /^(?:[a-z][a-z0-9_.]{0,31}@[a-z0-9]{2,}(?:.[a-z0-9]{2,4}){1,2})?$/gm;
    return regex.test(email);
}
export const validateUsername = (username) =>{
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/gm;
    return regex.test(username);
}
export const validatePhone = (phone) =>{
  var regex = /^(?:(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3}))?$/;
  return regex.test(phone);
}
export const validatePassword = (password) =>{
  var regex = /^(?:(?=.*[!@#$%^&(),.?":{}|<>]?)(?=.*[A-Z]?)(?=.*\d?).{7,})?$/gm;
  return regex.test(password);
} 
export const validateAddress = (address) =>{
  var regex = /^(\d+\/?)*\d*,\s[A-Za-zÀ-ỹ0-9\s,-]{1,100},\s[A-Za-zÀ-ỹ0-9\s,-]{1,100},\s[A-Za-zÀ-ỹ0-9\s,-]{1,100},[A-Za-zÀ-ỹ\s,-]{1,100}$/gm;
  return regex.test(address);
}
export const validateNumberHouse = (numberHouse) =>{
  var regex = /^\d+(?:\/\d+)*$/gm;
  return regex.test(numberHouse);
}