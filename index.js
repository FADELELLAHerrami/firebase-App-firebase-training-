import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push , onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



const appSettings = {
    databaseURL: "https://bread-6d3fe-default-rtdb.europe-west1.firebasedatabase.app/"

}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const movieInDb = ref(database,"movie");


onValue(movieInDb, function (snapshot) {
    document.querySelector('#shopping-list').innerHTML ="";
    // console.log(snapshot.val()); // Use snapshot.val() to get the data
    let movies = Object.entries(snapshot.val());
    const moviesEntries =  movies.map((element)=> element)
    moviesEntries.forEach((e)=>{
        addItemToUl(e[1],e[0]);
    })
    
});


let button = document.querySelector("#add-button");
let input = document.querySelector("#input-field");

button.addEventListener("click",()=>{
    let inputContent = input.value;
    push(movieInDb, inputContent);
});


// create a function to add an li to ul with id shopping-list
function addItemToUl(content,key){
    let element = document.createElement("li");
    element.textContent=content;
    let ul = document.querySelector('#shopping-list');
    ul.appendChild(element);
    // remove item
    element.addEventListener("click",(e)=>{
        console.log(key)
        let exactLocationFromDb = ref(database, `movie/${key}`);
        remove(exactLocationFromDb);
    })
}
