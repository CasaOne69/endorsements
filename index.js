import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



const appSettings = {
    databaseURL: "https://endorsements-b475e-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings) 
const database = getDatabase(app) 
const endorsementsInDB = ref(database, "endorsement")
const fromInDB = ref(database, "from")
//push(endorsementsInDB, "CockSuckers") 
//push(fromInDB, "ArseLickers") 