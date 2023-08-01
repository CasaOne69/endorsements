import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//Firebase connections
const appSettings = {
    databaseURL: "https://endorsements-b475e-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings) 
const database = getDatabase(app) 
const endorsementsInDB = ref(database, "endorsement")

//Elements from dom
const endorseEl = document.getElementById("endoreElbox")
const fromEl = document.getElementById("from-name")
const toEl = document.getElementById("to-el")
const publishBtn = document.getElementById("publish-endorsement")

//function to fetch input values and push to DB
publishBtn.addEventListener ("click", function (){
    let fullEndorsement = `To ${toEl.value} ${endorseEl.value} From ${fromEl.value}`
    console.log(fullEndorsement)
    push(endorsementsInDB, fullEndorsement) 
})