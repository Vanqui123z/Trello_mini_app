
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.apiKey!,
  authDomain: "mini-trello-app-acde9.firebaseapp.com",
  projectId: "mini-trello-app-acde9",
  storageBucket: "mini-trello-app-acde9.firebasestorage.app",
  messagingSenderId: process.env.messagingSenderId!,
  appId:  process.env.appId!,
  measurementId:  process.env.measurementId!,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


(async () => {
  try {
    const docRef = doc(db, "Boards", "boardId"); 
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      console.log("✅ Firestore OK:");
    } else {
      console.log("⚠️ Firestore OK nhưng document không tồn tại");
    }
  } catch (err) {
    console.error("❌ Firestore lỗi:", err);
  }
})();

export default db;
