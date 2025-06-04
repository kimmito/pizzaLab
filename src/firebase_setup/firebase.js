import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, off } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCGz5IygdttR-xHs9658p7NHtH1rDozFgE",
  authDomain: "pizzalab-21d41.firebaseapp.com",
  databaseURL: "https://pizzalab-21d41-default-rtdb.firebaseio.com",
  projectId: "pizzalab-21d41",
  storageBucket: "pizzalab-21d41.firebasestorage.app",
  messagingSenderId: "467931821102",
  appId: "1:467931821102:web:880a684af7466836871bbf"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, onValue, off };
