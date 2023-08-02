import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, update, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//Firebase connections
const appSettings = {
    databaseURL: "https://endorsements-b475e-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings) 
const database = getDatabase(app) 
const everything = ref(database, "endorsement")



//variable for the counter
let clicks = 0
let hasClicked = false

//Elements from dom
const endorseEl = document.getElementById("endoreElbox")
const fromEl = document.getElementById("from-name")
const toEl = document.getElementById("to-el")
const publishBtn = document.getElementById("publish-endorsement")
const ulEl = document.getElementById("ul-el")
const counterEl = document.getElementById("counter-el")



//function to retrieve the items from the DB and render them to the DOM
onValue(everything, function (snapshot) {
    clearprevious();
    let toFetchedFromDb = Object.values(snapshot.val());
    let IDFromDb = Object.keys(snapshot.val());

    for (let i = 0; i < toFetchedFromDb.length; i++) {
        let currentItem = toFetchedFromDb[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        

        //conversion to create element and not inner.html
        let newEl = document.createElement("li") 
        newEl.innerHTML = `<p class="toandfrom">${currentItem.to}</p>
        <p class="thetext">${currentItem.text}</p>
        <p class="toandfrom">${currentItem.from}</p>
        <p><img src="/assets/heartico.png" class="heartico"><p class="heart-count" id="counter-el" placeholder="0">${currentItem.clicky}</p></p>`
        ulEl.append(newEl)

        //function for like counter
        newEl.addEventListener("click", function(){
            clicks += +1
            let updates = {
                clicky: clicks
            }
          
            let exactLocationOfClickCount = ref(database , `endorsement/${IDFromDb}`)
            update(exactLocationOfClickCount, updates)
        })
        
         
    }
});



//function to fetch input values, turn it into an object, and push to DB
publishBtn.addEventListener("click", function () {
    let endorsementTXT = `${endorseEl.value}`;
    let endorsementTo = `To ${toEl.value}`;
    let endorsementFrom = `From ${fromEl.value}`;
    let clickTotals = clicks
    let dataToPush = {
        text: endorsementTXT,
        to: endorsementTo,
        from: endorsementFrom,
        clicky: clickTotals,
    };
    push(everything, dataToPush);
});


//function to clear what is already on the page, to avoid duplication
function clearprevious() {
    ulEl.innerHTML = "";
}
