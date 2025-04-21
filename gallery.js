import { HfInference } from 'https://cdn.jsdelivr.net/npm/@huggingface/inference@2.6.1/+esm';

console.log("SCRIPT LOADED!"); 
const hf = new HfInference("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");

let inDetect = document.getElementById("inDetect");
let h3Detect = document.getElementById("h3Detect");


var nameAnimal = "";
var scoreAnimal = "";


console.log("HfInference is:", HfInference ? "Loaded" : "Missing");
console.log("Token exists:", hf ? "Yes" : "No");

async function detectAnimal(imgurl) {


     

    try {
      console.log("Fetching image..."); // Debug 1
      const response = await fetch(imgurl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      console.log("Converting to blob..."); // Debug 2
      const imgBlob = await response.blob();
      
      console.log("Calling Hugging Face..."); // Debug 3
      const result = await hf.imageClassification({
        model: "google/vit-base-patch16-224",
        data: imgBlob
      });
      
      console.log("API Response:", result); // Debug 4

      
      nameAnimal = result[0].label;
      scoreAnimal = (result[0].score * 100).toFixed(1);
      h3Detect.innerText =  `Animal: ${nameAnimal} | Score: ${scoreAnimal}`;


      return result;
      
    } catch (error) {
      console.error("Full Error:", error);
      throw error; 
    }

  }

let imgURLDetect = inDetect.value;

let btnDetect = document.getElementById("btnDetect");
btnDetect.addEventListener("click" , async () => {
    const imgURLDetect = inDetect.value.trim();
    if (!imgURLDetect) {
        alert("Please enter a valid image URL!");
        return;
    }
    await detectAnimal(imgURLDetect);
    
});


window.imgClicked = function(element) {
    inDetect.value = element.src;
  };
  

