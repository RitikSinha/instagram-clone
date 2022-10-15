import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-85ItlW_OuErzvTJ8yXXMhPV45hgmfys",
  authDomain: "instagram-clone-caf59.firebaseapp.com",
  projectId: "instagram-clone-caf59",
  storageBucket: "instagram-clone-caf59.appspot.com",
  messagingSenderId: "417409333062",
  appId: "1:417409333062:web:0ed0c1d03f5acee80c1747",
};

const app = initializeApp(firebaseConfig);

export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("instagram-clone"),
  isTokenAutoRefreshEnabled: true,
});

export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
