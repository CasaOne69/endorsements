import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//Firebase connections
const appSettings = {
    databaseURL: "https://endorsements-b475e-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings) 
const database = getDatabase(app) 
const everything = ref(database, "endorsement")

//Elements from dom
const endorseEl = document.getElementById("endoreElbox")
const fromEl = document.getElementById("from-name")
const toEl = document.getElementById("to-el")
const publishBtn = document.getElementById("publish-endorsement")
const ulEl = document.getElementById("ul-el")
const counterEl = document.getElementById("counter-el")

//variable for the counter
let clicks = 0
let hasClicked = false

//function to fetch input values, turn it in to an obbject and push to DB
publishBtn.addEventListener("click", function () {
    let endorsementTXT = `${endorseEl.value}`;
    let endorsementTo = `To ${toEl.value}`;
    let endorsementFrom = `From ${fromEl.value}`;
    let dataToPush = {
        text: endorsementTXT,
        to: endorsementTo,
        from: endorsementFrom,
    }
            push(everything, dataToPush)

    //function to retrieve the TO items from the DB
    onValue(everything, function (snapshot) {
       // clearprevious();
        let toFetchedFromDb = Object.values(snapshot.val());

        for (let i = 0; i < toFetchedFromDb.length; i++) {
            let currentItem = toFetchedFromDb[i]
            
            ulEl.innerHTML += `<li>
            <p class="toandfrom">${currentItem.to}</p>
            <p class="thetext">${currentItem.text}</p>
            <p class="toandfrom">${currentItem.from}</p>
            <p><img src="/assets/heartico.png" class="heartico"><p class="heart-count">${clicks}</p></p>
            </li>`;
        }
    

    });

});

//function to clear what is already on the page, to avoid duplication
function clearprevious() {
    ulEl.innerHTML = "";
}

//counter function
counterEl.addEventListener("click", function(){
    
        if(!hasClicked)
        {
           clicks += 1;
           counterEl.innerHTML = clicks
           hasClicked = true
        }




})

