// ============================================================
// CargoShare – Firebase Config + Demo Mode
// ============================================================
// INSTRUCTIONS: Replace with your Firebase project credentials.
// The app works in DEMO MODE (localStorage) without credentials.
// ============================================================

const FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

// ─── Demo Mode ───────────────────────────────────────────────
// Set to true to use localStorage instead of Firebase
const DEMO_MODE = true;

// ─── Firebase Init ───────────────────────────────────────────
let db   = null;
let auth = null;

function initFirebase() {
  if (DEMO_MODE) {
    console.info('[CargoShare] Running in DEMO MODE – data stored in localStorage.');
    return;
  }
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    db   = firebase.firestore();
    auth = firebase.auth();
    console.info('[CargoShare] Firebase initialized.');
  } catch (e) {
    console.warn('[CargoShare] Firebase init failed – falling back to DEMO MODE.', e);
  }
}

// Call on script load
initFirebase();
