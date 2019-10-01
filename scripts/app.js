const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon');
const forecast = new Forecast();

const updateUI = (data) => {
  // Destructuring
  const { cityDets, weather } = data;
  console.log(weather)
  // Update details
  details.innerHTML = `
  <h5 class="my-3">${cityDets.EnglishName}</h5>
  <div class="my-3">${weather.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>
  `;

  // update the night/day & icon images
  if (weather.IsDayTime) {
    time.src = "img/day.svg"
  } else {
    time.src = "img/night.svg"
  }

  icon.src = `img/icons/${weather.WeatherIcon}.svg`


  // remove the d-none if present
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
}


cityForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // Update ui with the new city
  forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  // set local storage
  localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
  forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err))
}