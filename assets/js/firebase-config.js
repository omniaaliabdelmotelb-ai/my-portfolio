// Firebase Configuration & Initialization for Omnia Portfolio

const firebaseConfig = {
  apiKey: "AIzaSyDY9jRR_uJ25ZqZm0lFdyUkSdCPX49UB5M",
  authDomain: "omnia-protfolio.firebaseapp.com",
  projectId: "omnia-protfolio",
  storageBucket: "omnia-protfolio.firebasestorage.app",
  messagingSenderId: "636358693108",
  appId: "1:636358693108:web:8f7b5b538059a83f194ea1",
  measurementId: "G-9FC412ZRMW"
};

let db = null;
let analytics = null;

if (typeof firebase !== 'undefined') {
    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        if (firebase.analytics) {
            analytics = firebase.analytics();
        }
        if (firebase.firestore) {
            db = firebase.firestore();
        }
    } catch (e) {
        console.warn("Firebase initialization error:", e);
    }
}

// Cloud Database Synchronization Helpers
async function syncFromCloud(docName) {
    if (!db) return null;
    try {
        const docRef = db.collection("portfolio").doc(docName);
        const docSnap = await docRef.get();
        if (docSnap.exists) {
            return docSnap.data().data;
        }
    } catch (e) {
        console.warn(`Firestore read warning for ${docName}:`, e);
    }
    return null;
}

async function syncToCloud(docName, data) {
    if (!db) return false;
    try {
        await db.collection("portfolio").doc(docName).set({
            data: data,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        return true;
    } catch (e) {
        console.warn(`Firestore write warning for ${docName}:`, e);
        return false;
    }
}
