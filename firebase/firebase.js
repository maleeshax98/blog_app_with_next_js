import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvjUv1m_AMTaqlWoIN37aiVrkPrFx1QFI",
  authDomain: "blog-31f4f.firebaseapp.com",
  projectId: "blog-31f4f",
  storageBucket: "blog-31f4f.appspot.com",
  messagingSenderId: "825402954957",
  appId: "1:825402954957:web:50376c79829f1dbdd3c584"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);