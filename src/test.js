import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
    collection,
    getDocs,
    getFirestore,
    orderBy,
    query
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js"
import {getDatabase} from "https://www.gstatic.com/firebasejs/10.8.1//firebase-database.js";
import {getStorage} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCBu3wHn3adlXcnWDqIvGuQk18KcM5G9ag",
    authDomain: "appclubes-18dd5.firebaseapp.com",
    databaseURL: "https://appclubes-18dd5-default-rtdb.firebaseio.com",
    projectId: "appclubes-18dd5",
    storageBucket: "appclubes-18dd5.appspot.com",
    messagingSenderId: "425275349671",
    appId: "1:425275349671:web:3b33c5414d3fc0abb75982",
    measurementId: "G-9YER0C3VC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)

export const realtime = getDatabase(app)

export const storage = getStorage()

async function clubes() {

    const q = query(collection(firestore, "CLUBE"), orderBy("clubeNome"));

    return await getDocs(q)

}