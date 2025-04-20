


const animalCategories = [
    // Mammals
  "lion", "tiger", "elephant", "giraffe", "zebra",
  "wolf", "fox", "bear", "panda", "kangaroo",
  "koala", "gorilla", "chimpanzee", "orangutan", "hippopotamus",
  "polar bear", "cheetah", "leopard", "hyena",
  "camel", "buffalo", "bison", "deer", "moose",
  "dolphin", "whale", "shark", "octopus", "seal",

  // Birds
  "eagle", "hawk", "falcon", "owl", "parrot",
  "penguin", "peacock", "flamingo", "swan", "ostrich",
  "vulture", "pigeon", "crow", "raven", "woodpecker",

  // Reptiles & Amphibians
  "crocodile", "alligator", "snake", "python", "cobra",
  "turtle", "tortoise", "frog", "toad", "salamander",
  "iguana", "chameleon", "komodo dragon", "gecko",

  // Fish & Aquatic
  "clownfish", "goldfish", "salmon", "tuna", "swordfish",
  "jellyfish", "starfish", "stingray", "eel", "piranha",
  "seahorse", "lobster", "crab", "shrimp", "fish",

  // Insects & Arthropods
  "butterfly", "bee", "ant", "spider", "scorpion",
   "dragonfly", "mosquito", "cockroach", "grasshopper",

  // Domestic Animals
  "dog", "cat", "horse", "sheep",
  "goat", "pig", "rabbit", "hamster", "guinea pig",

  // Mythical/Extinct
  "dragon", "unicorn", "dinosaur", "mammoth", "sabertooth" , "animal"
];

console.log(animalCategories.length); 

let reload = document.getElementById("reload");
reload.addEventListener("click" , newList);
let animalList = document.getElementsByClassName("example-btn");

function newList(){
    for(let i = 0 ; i < animalList.length-1 ; i++){
        let x = Math.floor(Math.random() * animalCategories.length);
        animalList[i].value = animalCategories[x];
        animalList[i].innerText = "👀" + animalCategories[x];
    }
}
let inanimal = document.getElementById("inanimal");
let btnanimal = document.getElementById("btnanimal");

let h2animal = document.getElementById('h2animal');
let imganimal = document.getElementById('imganimal');
let panimal = document.getElementById("panimal");

function chooseAnimal(event){
    inanimal.value = event.value;
}






btnanimal.addEventListener("click", getWIki);


async function getWIki() {
    let word = inanimal.value;
    if (!word) return;

    let found = false;

    word = word.toLowerCase();

    for (const animalCat of animalCategories) {
        if (word == animalCat) {
            found = true;
        }
    }
    if (found == false) {
        h2animal.innerText = "Please Enter Animal Name :)";
        imganimal.src = "";
        imganimal.alt = "";
        panimal.innerHTML = "";
        return;
    }

    const baseUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*';
    const props = [
        'extracts',
        'images',
        'pageimages',
        'categories'
    ];

    const url = `${baseUrl}&prop=${props.join('|')}&titles=${encodeURIComponent(word)}&pithumbsize=300&exintro=true`;

    try {
        const data = await fetchAPI(url);


        if (!data?.query?.pages) {
            panimal.innerText = "No information found";
            return;
        }

        const page = Object.values(data.query.pages)[0];

        if (page.pageid < 0 || page.missing || !page.categories) {
            panimal.innerText = "No article found for this topic";
            return;
        }





        h2animal.innerText = page.title;


        if (page.thumbnail) {
            imganimal.src = page.thumbnail.source;
            imganimal.alt = page.title;
            imganimal.style.display = 'block';
        } else {
            imganimal.style.display = 'none';
        }


        panimal.innerHTML = page.extract || 'No extract available';



    } catch (error) {
        console.error("Error fetching data:", error);
        panimal.innerText = "Error loading Wikipedia data";
    }
}

async function fetchAPI(url, options = {}) {
    try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error("API fetch failed:", error);
        return null;
    }
}











