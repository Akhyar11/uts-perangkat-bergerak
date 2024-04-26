import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import env from "@/env.json";

if (!firebase.apps.length) {
  firebase.initializeApp(env);
}

const db = firebase.firestore();
export { db };
