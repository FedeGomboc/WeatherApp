const input = document.querySelector("#input");
const nombreCiudad = document.querySelector("#nombreCiudad");
const temperature = document.querySelector("#temperature");
const conditions = document.querySelector("#conditions")
const preferencia = document.querySelector("#preferencia");

async function getWeather(location, unitGroup) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=${location}&&aggregateHours=24&unitGroup=${unitGroup}&shortColumnNames=false&contentType=json&key=FS8NZWN54QZSFXB6CXHWGU8GX`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  console.log(weatherData);

  nombreCiudad.textContent = weatherData.locations[`${input.value}`].address;

  if (unitGroup === "us") {
    temperature.textContent = "Temperature: " + weatherData.locations[`${input.value}`].currentConditions.temp + " °F";
  }
  else if (unitGroup === "metric"){
    temperature.textContent = "Temperature: " + weatherData.locations[`${input.value}`].currentConditions.temp + " °C";
  }

  conditions.textContent = "Condition: " + weatherData.locations[`${input.value}`].values[0].conditions;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkInput() {
  let unitGroup = preferencia.value;
  if (input.value !== "") {
    input.value = capitalizeFirstLetter(input.value);
    getWeather(input.value, unitGroup);
  }
}
