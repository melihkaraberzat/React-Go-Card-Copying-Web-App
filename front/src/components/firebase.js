import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyCS21Bx2g2qNAwBbYFQjNHCS1Qvyqfu_7w",
  authDomain: "case-study-c173f.firebaseapp.com",
  projectId: "case-study-c173f",
  storageBucket: "case-study-c173f.appspot.com",
  messagingSenderId: "365616033899",
  appId: "1:365616033899:web:5e6505cbc79fd04a19812e"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

