import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDTNanQvJP3KQZkx9gps1XEcx5SmGYE8U",
  authDomain: "prozentrechner-2e85c.firebaseapp.com",
  projectId: "prozentrechner-2e85c",
  storageBucket: "prozentrechner-2e85c.firebasestorage.app",
  messagingSenderId: "752338980804",
  appId: "1:752338980804:web:08c60dc89ff8f7e2591e91",
  measurementId: "G-3QDZFK89XH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;
