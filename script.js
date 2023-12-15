const res = fetch("https://restcountries.com/v3.1/all");
res
  .then((data) => data.json())
  .then((data1) => {
    for (var i = 0; i < data1.length; i++) {
      console.log(data1[i]);
      var con = document.querySelector(".row");
      con.innerHTML += `
         <div class="col">
           <div class="card">
             <div class="card-header">${data1[i].name.common}</div>
             <img src="${data1[i].flags.png}" class="card-img-top" alt="country-flag">
            
             <p class="card-text"><b><i>Capital: ${data1[i].capital}</i></b></p>
             <p class="card-text"><b><i>Region: ${data1[i].region}</b></p>
             <p class="card-text"><b><i>latlng: ${data1[i].latlng}</b></p>
             <p class="card-text"><b><i>Country Code: ${data1[i].cca3}</i></b></p>
             <button class="btn btn-primary" onclick="getWeatherData('${data1[i].name.common}', ${i})">Click for Weather</button>
             <div class="weather" id="weatherInfo${i}"></div>
           </div>
        </div>`;
    }
  });

function getWeatherData(restCountryName, index) {
  var apiKey = "eebfc7ad50c4a39e555028ff4aee7c38";
  var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${restCountryName}&appid=${apiKey}`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((weatherData) => {
      var weatherCountryName = weatherData.name;

      if (weatherCountryName === restCountryName) {
        document.getElementById(
          `weatherInfo${index}`
        ).innerHTML = `Weather in ${weatherData.name}: ${weatherData.main.temp_min} min:deg&c && ${weatherData.main.temp_max} max:deg&c`;
      } else {
        document.getElementById(`weatherInfo${index}`).innerHTML =
          "Country names do not match.";
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      document.getElementById(`weatherInfo${index}`).innerHTML =
        "Error fetching weather data.";
    });
}
