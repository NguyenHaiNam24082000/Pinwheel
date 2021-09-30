import {auth} from '../firebase';
import {signInWithPopup,getAdditionalUserInfo } from "firebase/auth";

const socialMediaAuth = (provider) => {
    return signInWithPopup(auth, provider)
    .then((result) => {
      const additionalUserInfo = getAdditionalUserInfo(result);
      return {additionalUserInfo,result};
    }).catch((error) => {
      return error;
    });
}

export default socialMediaAuth;
