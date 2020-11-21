import firebase from 'firebase/app';
import  "firebase/firestore";
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDFsIWhLt7PzwQLyJJIKq-TQmdKm5_8XGA",
    projectId: "testauthnext",
    databaseURL: "https://testauthnext.firebaseio.com",
    authDomain: "testauthnext.firebaseapp.com",
    // OPTIONAL
    storageBucket: "testauthnext.appspot.com",
    messagingSenderId: "177260373532"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
//firebase.firestore().enablePersistence();


export const auth = firebase.auth();
export const firestore = firebase.firestore();

/** To sign up using google
 * Link for developer documentation (https://firebase.google.com/docs/auth/web/google-signin)
 */

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  promt: "select_account",
});

// Check if user exists if not create a user
export const createUserProfileDocument =async (userAuth:any) => {
  if(!userAuth) return;

 const userReference =  firestore.doc(`users/${userAuth.uid}`);
 const snapShot =  await userReference.get();
 if(!snapShot.exists) {
   const {displayName, email} = userAuth;
   const createdAt = new Date();
   try {
     await userReference.set({
       displayName,
       email,
       createdAt
     })
   } catch (error) {
      console.log(error)
   }
 }
 return userReference;
}
export const signInWithGoogle = () => auth.signInWithPopup(provider);