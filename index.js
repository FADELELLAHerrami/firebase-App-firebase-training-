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
    if( snapshot.exists()){
        let movies = Object.entries(snapshot.val());
        const moviesEntries =  movies.map((element)=> element)
        moviesEntries.forEach((e)=>{
            if(e[1].length !== 0 ) {console.log(e[1].length);addItemToUl(e[1],e[0]);};
        })
    }else{
        document.querySelector('#shopping-list').innerHTML ="<div style = \"margin: auto;\"><p style=\"background-color: #ffff00;\">no item yet</p></div>"
    }
    
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
