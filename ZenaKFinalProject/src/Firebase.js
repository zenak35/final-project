import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyAlZyxbarH_xXIlbkoG7aqR-XOnefHn29E",
    authDomain: "zenak-finalprojectjs.firebaseapp.com",
    databaseURL: "https://zenak-finalprojectjs.firebaseio.com",
    projectId: "zenak-finalprojectjs",
    storageBucket: "zenak-finalprojectjs.appspot.com",
    messagingSenderId: "237401264612"
};

firebase.initializeApp(config);

const fb = {
    auth: firebase.auth(),
    database: firebase.database()
}

export default fb;