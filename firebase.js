import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDiAyMdDj8wyladE3-HxA1FEcZ4pSi_eyw',
  authDomain: 'whatsapp-2-fb5d1.firebaseapp.com',
  projectId: 'whatsapp-2-fb5d1',
  storageBucket: 'whatsapp-2-fb5d1.appspot.com',
  messagingSenderId: '236234564539',
  appId: '1:236234564539:web:c558dacd1d576e6dafda9e',
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
