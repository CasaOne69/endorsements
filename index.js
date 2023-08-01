import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//Firebase connections
const appSettings = {
    databaseURL: "https://endorsements-b475e-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings) 
const database = getDatabase(app) 
const endorsementsInDB = ref(database, "endorsement/text")
const toInDB = ref(database, "endorsement/to")
const fromInDB = ref(database, "endorsement/from")

//Elements from dom
const endorseEl = document.getElementById("endoreElbox")
const fromEl = document.getElementById("from-name")
const toEl = document.getElementById("to-el")
const publishBtn = document.getElementById("publish-endorsement")
const toReturnEl = document.getElementById("main-end-el")
const theWholeLot = document.getElementById("thewholelot")

//function to fetch input values and push to DB
publishBtn.addEventListener ("click", function (){
    let endorsementTXT = `${endorseEl.value}`
    let endorsementTo = `To ${toEl.value}`
    let endorsementFrom = `From ${fromEl.value}`
    push(fromInDB, endorsementFrom)
    push(toInDB, endorsementTo) 
    push(endorsementsInDB, endorsementTXT) 
   
    //function to retrive the TO items from the DB
    onValue(toInDB, function(snapshot){
        let toFetchedFromDb = Object.values(snapshot.val())
        clearprevious()
        for (let i = 0; i < toFetchedFromDb.length; i++) {

        appendItemToListEl(toFetchedFromDb[i])
    })
    //function to retrive the FROM items from the DB
    onValue(fromInDB, function(snapshot){
        let fromFetchedFromDb = Object.values(snapshot.val())
        clearprevious()
        for (let i = 0; i < fromFetchedFromDb.length; i++) {

        appendItemToListEl(fromFetchedFromDb[i])
          })

function appendItemToListEl(itemValue) {
    theWholeLot.innerHTML += `<li>${itemValue}</li>`
}
//fucntion to clear what is already on page, to avoid duplication
function clearprevious() {
    theWholeLot.innerHTML = ""  
}