import {auth} from '../firebase';
import {signInWithPopup,getAdditionalUserInfo,createUserWithEmailAndPassword } from "firebase/auth";

const socialMediaAuth = (provider) => {
    return signInWithPopup(auth, provider)
    .then((result) => {
      const additionalUserInfo = getAdditionalUserInfo(result);
      return {additionalUserInfo,result};
    }).catch((error) => {
      return error;
    });
}

const registerAuth=(email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const additionalUserInfo = getAdditionalUserInfo(result);
      return {additionalUserInfo,result};
    }).catch((error) => {
      return error;
    });
}

export {socialMediaAuth,registerAuth};
