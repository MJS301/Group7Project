'use strict';

// 0.17 is the average for petrol and diesels
const CAR_KG_PER_KM = 0.17;
// 0.05 per passenger
const PTRANSPORT_KG_PER_KM = 0.05;

// 0.182 and 0.131 are the gas and electric values according to https://carbonrecycling.co.uk/guides/conversion-factors-2026
const GAS_KG_PER_KWH = 0.182;
const ELECTRIC_KG_PER_KWH = 0.131;

// average of medium gas (860 kWh/month) and medium electric (216 kWh/month) use
const OTHER_HEATING_KG = ((860 * GAS_KG_PER_KWH + 216 * ELECTRIC_KG_PER_KWH) / 2) * 12;

// simplified estimate of UK average based on the categories
const AVERAGE_UK_CO2 = 6800

let form = document.getElementById("questionnaireForm");

// run calculation when form is submitted
form.addEventListener("submit", emissionCalcUpdate);

// shows or hides section depending on delivery method selected
document.getElementById("gas").addEventListener("change", showGas)
document.getElementById("electricity").addEventListener("change", showElectricity)
document.getElementById("other").addEventListener("change", hideHeatingSections)

function getCheckedValue(radioBtnName) {
  // returns value of radio button checked
  let radioBtns = document.getElementsByName(radioBtnName);
  for (let i = 0; i < radioBtns.length; i++) {
    if (radioBtns[i].checked == true) {
      return radioBtns[i].value;
    }
  }
  // returns null if nothing is selected
  return null
}

// show gas section in Carbon_Emission_Calculator.html
function showGas(){
  const gas = document.getElementById("gasHeating");
  const electricity = document.getElementById("electricHeating"); 
  gas.style.display = "block";
  electricity.style.display = "none";
}

// shows electricity section in Carbon_Emission_Calculator.html
function showElectricity(){
  const gas = document.getElementById("gasHeating");
  const electricity = document.getElementById("electricHeating"); 
  gas.style.display = "none";
  electricity.style.display = "block";
}

// hides both gas and electric sections when other is selected
function hideHeatingSections(){
  const gas = document.getElementById("gasHeating");
  const electricity = document.getElementById("electricHeating"); 
  gas.style.display = "none";
  electricity.style.display = "none";
}

function emissionCalcUpdate(evt) {
  // stops page from being reloaded when form is submitted
  evt.preventDefault();

  // getting user inputs
  let car = getCheckedValue("car_travel");
  let transport = getCheckedValue("public_transport");
  let plane = getCheckedValue("plane_travel");
  let heating = getCheckedValue("heating_type");
  let usage = getCheckedValue("energy_usage");
  let diet = getCheckedValue("diet");
  let clothes = getCheckedValue("clothes");
  let recycle = getCheckedValue("recycle");
  let result = document.getElementById("calcResult");

  // clears the previous results
  result.innerHTML = "";

  // calling the emissionCalculator function and passing parameters
  emissionCalculator(car, transport, plane, heating, usage, diet, clothes, recycle, result);
}

// Transport
function calculateTransport(car, transport, plane) {
  // Calc for car and public 
  let total = (Number(car) * CAR_KG_PER_KM * 52) + (Number(transport) * PTRANSPORT_KG_PER_KM * 52)

  if (plane === "1/2") {
    total += 300;
  } else if (plane === "3") {
    total += 750;
  } else if (plane == "longHaul"){
    total += 1800;
  }
  return total;
}

// Home energy
function calculateEnergy(heating, usage){
  let kwh = 0;

  if (heating === "Gas") {
    if (usage === "Low") {
      kwh = 500;
    } else if (usage === "Medium") {
      kwh = 860;
    } else if (usage === "High") {
      kwh = 1250;
    }
    return kwh * 12 * GAS_KG_PER_KWH;
  } else if (heating === "Electricity") {
    if (usage === "Low") {
      kwh = 133;
    } else if (usage === "Medium") {
      kwh = 216;
    } else if (usage === "High") {
      kwh = 326;
    }
    return kwh * 12 * ELECTRIC_KG_PER_KWH;
  } else if (heating === "Other") {
    // since there is no other choices, uses average of gas and electric
    return OTHER_HEATING_KG;
  }
  // when nothing is selected
  return 0;
}

//food
function calculateFood(diet) {
  if (diet === "Vegan") {
    return 1000;
  } else if (diet === "Veg") {
    return 1300;
  } else if (diet === "SomeMeat") {
    return 1800;
  } else if (diet === "Meat") {
    return 2500;
  }
  return 0;
}

// Lifestyle - clothes and recycling
function calculateLifestyle(clothes, recycle) {
  let total = 0;
  
  if (clothes === "Rarely") {
    total = 200;
  } else if (clothes === "Sometimes") {
    total = 500;
  } else if (clothes === "Often") {
    total = 1000;
  }

  if (recycle === "Sometimes") {
    total += 100;
  } else if (recycle === "Never") {
    total += 250;
  }
  return total;
}

function emissionCalculator(car, transport, plane, heating, usage, diet, clothes, recycle, result) {

  // finding out each section of the calculation
  let transportTotal = calculateTransport(car, transport, plane);
  let energyTotal = calculateEnergy(heating, usage);
  let foodTotal = calculateFood(diet);
  let lifestyleTotal = calculateLifestyle(clothes, recycle);
  let total = transportTotal + energyTotal + foodTotal + lifestyleTotal;

  // initialising elements and assigning tags
  let resultContainer = document.createElement("section");
  resultContainer.classList.add("result_container");

  let resultHeading = document.createElement("h2");
  resultHeading.textContent = "Carbon Footprint:";
  resultHeading.classList.add("result_heading");

  let emissionTotalDisplay = document.createElement("p");
  emissionTotalDisplay.textContent = "Estimated Total: " + total.toFixed(0) + " kg CO2 per year";
  emissionTotalDisplay.classList.add("total");

  // comparison with UK average
  let comparisonDisplay = document.createElement("p");
  let diff = total - AVERAGE_UK_CO2;
  let percent = Math.abs(diff / AVERAGE_UK_CO2 * 100).toFixed(0);

  // displaying message if user is above or below UK average
  if (diff > 0) {
    comparisonDisplay.textContent = "That's " + percent + "% above the UK average of " + AVERAGE_UK_CO2 + " kg per year.";
  } else {
    comparisonDisplay.textContent = "That's " + percent + "% below the UK average of " + AVERAGE_UK_CO2 + " kg per year.";
  }
  comparisonDisplay.classList.add("result_details");

  let transportDisplay = document.createElement("p");
  transportDisplay.textContent = "Transport: " + transportTotal.toFixed(0) + " kg CO2 per Year";
  transportDisplay.classList.add("result_details");

  let energyDisplay = document.createElement("p");
  energyDisplay.textContent = "Home energy: " + energyTotal.toFixed(0) + " kg CO2 per year";
  energyDisplay.classList.add("result_details");

  let foodDisplay = document.createElement("p");
  foodDisplay.textContent = "Food: " + foodTotal.toFixed(0) + " kg CO2 per year";
  foodDisplay.classList.add("result_details");

  let lifestyleDisplay = document.createElement("p");
  lifestyleDisplay.textContent = "Lifestyle: " + lifestyleTotal.toFixed(0) + " kg CO2 per year";
  lifestyleDisplay.classList.add("result_details");

  // appending attributes to result container
  resultContainer.appendChild(resultHeading);
  resultContainer.appendChild(emissionTotalDisplay);
  resultContainer.appendChild(comparisonDisplay);
  resultContainer.appendChild(transportDisplay);
  resultContainer.appendChild(energyDisplay);
  resultContainer.appendChild(foodDisplay);
  resultContainer.appendChild(lifestyleDisplay);

  // appending the container to the calcResult section
  result.appendChild(resultContainer);

  // displaying the result section
  result.style.display = "block";
}