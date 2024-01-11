import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push , onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



const appSettings = {
    databaseURL: "https://bread-6d3fe-default-rtdb.europe-west1.firebasedatabase.app/"

}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const movieInDb = ref(database,"movie");
const bookInDb = ref(database,"books");


onValue(movieInDb, function (snapshot) {
    document.querySelector('#shopping-list').innerHTML ="";
    console.log("snapshot");
    // console.log(snapshot.val()); // Use snapshot.val() to get the data
    let movies = Object.entries(snapshot.val());
    movies.forEach((element)=>{
        element.forEach((e)=>{
            addItemToUl(element[1],element[0]);
        })
        
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
    element.addEventListener("click",(e)=>{
        console.log(key)
    })
}
