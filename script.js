"use strict";

// The model of all features
const features = {
  bow: false,
  bow1: false,
  led: false,
  wings: false
};

window.addEventListener("DOMContentLoaded", start);

let elementToPaint; 

async function start() {
  console.log("start");

  //Fetch svg
  let response = await fetch ("vans-01.svg"); 
  let mySvgData = await response.text(); 
  document.querySelector("#vans_basic").innerHTML = mySvgData; 

  // register toggle-clicks
  document.querySelectorAll(".option").forEach(option => option.addEventListener("click", toggleOption));

  startManipulatingTheSvg();
}

function startManipulatingTheSvg() {

  // document.addEventListener("click", clll);
  // function clll(event) {
  //   console.log(event.target);
  // }

  document.querySelectorAll(".g_to_interact_with").forEach((eachG) => {
  console.log(eachG);
  
  eachG.addEventListener("click", theClick);
  eachG.addEventListener("mouseover", theMouseover);
  eachG.addEventListener("mouseout", theMouseout);
  });
  
   document.querySelectorAll(".color_btn").forEach((each_btn) => {
  each_btn.addEventListener("click", colorClick);
  });
  }
  
  console.log("test1"); 
  
  function theClick() {
    console.log("hallo"); 
  elementToPaint = this;
  this.style.fill = "grey";
  }
  
  function theMouseover() {
    console.log("hallo"); 
  this.style.stroke = "blue";
  }
  
  function theMouseout() {
    console.log("hallo"); 
  this.style.stroke = "none";
  }
  
  function colorClick() {
    console.log("test"); 
  if (elementToPaint != undefined) {
  elementToPaint.style.fill = this.getAttribute("fill");
  }
  }

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;
  

  // TODO: Toggle feature in "model"
  features[feature] = !features[feature]; 


  // If feature is (now) turned on:
  

 
  // - create FLIP-animation to animate featureElement from img in target, to
  //   its intended position. Do it with normal animation or transition class!

  // Else - if the feature (became) turned off:
  // - find the existing featureElement in #selected ul
  // - create FLIP-animation to animate featureElement to img in target
  // - when animation is complete, remove featureElement from the DOM


  
  if (features[feature] === true) {
    //Select target and add chosen class
    target.classList.add("chosen"); 

    //Remove the hide class 
    document.querySelector(`[data-feature="${feature}"`).classList.remove("hide"); 

     //Create new featureElement and add it to the list
    const newfeatureElement = createFeatureElement(feature); 
    document.querySelector("#selected ul").appendChild(newfeatureElement); 
    // feature added

    //FLIP
    const start = target.getBoundingClientRect();
    const end = newfeatureElement.getBoundingClientRect();

    const diffx = start.x - end.x + "px";
    const diffy = start.y - end.y + "px";

    newfeatureElement.style.setProperty("--diffx", diffx);
    newfeatureElement.style.setProperty("--diffy", diffy);

    //Animation feature in
    newfeatureElement.classList = "animate-feature-in";         
      }
    
   else {
    target.classList.remove("chosen"); 
    const theFeatureElement = document.querySelector(`#selected [data-feature="${feature}"]`);

    const end = theFeatureElement.getBoundingClientRect();
    const start = target.getBoundingClientRect();

    const diffx = start.x - end.x + "px";
    const diffy = start.y - end.y + "px";

    theFeatureElement.style.setProperty("--diffx", diffx);
    theFeatureElement.style.setProperty("--diffy", diffy);

    theFeatureElement.offsetHeight; 

    //Animation feature out
    theFeatureElement.classList = "animate-feature-out"; 


    //when animation is complete, remove featureElement from the DOM
    theFeatureElement.addEventListener("animationend", function() {
    theFeatureElement.remove(); 
    //Chose the feature element and hide it
    document.querySelector(`[data-feature=${feature}`).classList.add("hide");
    console.log(`Feature ${feature} is turned off!`);
}); 
   }
  }




// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
  //Create an li element and add feature img into it
  const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `images/feature_${feature}.png`;
  img.alt = capitalize(feature);

  //Add the li element
  li.append(img);

  return li;
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}