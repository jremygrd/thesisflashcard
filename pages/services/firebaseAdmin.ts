var firebaseAdmin = require("firebase-admin");
var serviceAccount = require("D:/Users/Bureau/testauthnext-firebase-adminsdk-d7ods-c723bec9c5.json");

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: 'https://testauthnext.firebaseio.com'
  });
}

export { firebaseAdmin };
