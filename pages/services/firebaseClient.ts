import firebaseClient from 'firebase/app';
import 'firebase/auth';

if (typeof window !== 'undefined' && !firebaseClient.apps.length) {
  const CLIENT_CONFIG = {
    apiKey: "AIzaSyDFsIWhLt7PzwQLyJJIKq-TQmdKm5_8XGA",
    projectId: "testauthnext",
    databaseURL: "https://testauthnext.firebaseio.com",
    authDomain: "testauthnext.firebaseapp.com",
    // OPTIONAL
    storageBucket: "testauthnext.appspot.com",
    messagingSenderId: "177260373532"
  };

  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  (window as any).firebase = firebaseClient;
}

export { firebaseClient };
