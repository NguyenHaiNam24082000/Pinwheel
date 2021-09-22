import {auth} from '../firebase';
import {signInWithPopup } from "firebase/auth";

const socialMediaAuth = (provider) => {
    return signInWithPopup(auth, provider)
    .then((result) => {
    //   const credential = provider.credentialFromResult(result);
    //   const token = credential.accessToken;
      return result.user;
    }).catch((error) => {
      return error;
    });
}

export default socialMediaAuth;
