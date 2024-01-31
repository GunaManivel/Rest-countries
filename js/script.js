const API = "https://restcountries.com/v3.1/all";

// Fetch countries data
fetch(API)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((country) => {
      createCountryCard(country);
    });
  })
  .catch((error) => {
    console.error("Error fetching countries data:", error);
  });

// Function to create a country card
function createCountryCard(country) {
  const { name, flags, cioc, capital, region, population, latlng } = country;

  const countryCard = document.createElement("div");
  countryCard.classList.add(
    "col-sm-6",
    "col-md-4",
    "col-lg-4",
    "col-xl-4",
    "pad"
  );

  countryCard.innerHTML += `
         <div class="card h-100 ">
            <div class="card-header">
              <h1 id="title" class="text-center">
                ${name.common}
              </h1>
    </div>
          
            <div class="card-body text-center">
            <div class="card-text">
            <img src="${flags.png}" class="card-img-top" alt="${name.common}'s Flag image"></br><br>
              <p><span>Population :</span> ${population}</p>
              <p><span>Capital :</span> ${capital[0]}</p>
              <p><span>Region :</span> ${region}</p>
              <p><span>Country Code :</span> ${cioc}</p>
          
            </div>
            </div>
            <div class="card-footer row text-muted d-flex justify-content-between align-items-center">
            <a href="#" class="btn btn-primary text-center" data-lat="${latlng[0]}" data-lng="${latlng[1]}" data-name="${name.common}">Click for Weather</a></br>
              <div class="weather-info " id="${name.common}"></div>
              
            </div>
          </div>
          
      
    `;

  document.querySelector(".row").appendChild(countryCard);
}

// Event delegation to handle weather button clicks
document.querySelector(".container").addEventListener("click", (event) => {
  event.preventDefault();
  const target = event.target;

  if (target.classList.contains("btn-primary")) {
    const lat = target.getAttribute("data-lat");
    const lng = target.getAttribute("data-lng");
    const name = target.getAttribute("data-name");

    fetchWeather(lat, lng, name);
  }
});

// Fetch weather data
function fetchWeather(lat, lng, name) {
  const WAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=06e423ec0af839c485470951f60c3f6b`;

  fetch(WAPI)
    .then((response) => response.json())
    .then((data) => {
      const weatherInfo = `
            </br>
            <p>Current Humidity is : ${data.main.humidity} g/kg</p>
              <p>Current Pressure is : ${data.main.pressure} atm</p>
              <p>Current Temperature is : ${data.main.temp} F</p>
            `;

      document.getElementById(name).innerHTML = weatherInfo;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}
