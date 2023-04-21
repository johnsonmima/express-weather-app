const btn = document.getElementById("fetchWeatherBtn");
const msg = document.getElementById("msg");
const defaultContent = document.getElementById("content");
const resultContent = document.getElementById("resultContent");

// get day
const displayDay = (val) => {
  switch (val) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Sunday";
  }
};

// months
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// get weather icon
const getWeatherIcon = (id) => {
  switch (id) {
    case 200 < 232:
      return "<i id='iconIDColor' class='bi bi-cloud-lightning-fill tex-center'style='font-size:5rem;' ></i>";
    case 300 < 321:
      return "<i id='iconIDColor' class='bi bi-cloud-drizzle-fill tex-center'style='font-size:5rem;' ></i>";
    case 500 < 531:
      return "<i id='iconIDColor' class='bi bi-cloud-rain-heavy-fill tex-center'style='font-size:5rem;' ></i>";
    case 600 < 622:
      return "<i id='iconIDColor' class='bi bi-cloud-snow-fill tex-center'style='font-size:5rem;' ></i>";
    case 701 < 781:
      return "<i id='iconIDColor' class='bi bi-cloud-fog-fill tex-center'style='font-size:5rem;' ></i>";
    case 800:
      return "<i id='iconIDColor' class='bi bi-sun-fill tex-center'style='font-size:5rem;' ></i>";
    case 801 < 804:
      return "<i id='iconIDColor' class='bi bi-cloud-lightning-fill tex-center'style='font-size:5rem;' ></i>";
    default:
      return "<i id='iconIDColor' class='bi bi-cloud-fill tex-center'style='font-size:5rem;' ></i>";
  }
};

// get weather Icon color
const getWeatherIconColor = (id) => {
  switch (id) {
    case 200 < 232:
      return "#FFB84C";
    case 300 < 321:
      return "#3A98B9";
    case 500 < 531:
      return "#2F58CD";
    case 600 < 622:
      return "#B4E4FF";
    case 701 < 781:
      return "#ECF2FF";
    case 800:
      return "#FFEA20";
    case 801 < 804:
      return "#FFB84C";
    default:
      return "#97DEFF";
  }
};

// update UI
const updateUI = (name, { id, main, description }, temp) => {
  const dateObj = new Date();

  defaultContent.style.display = "none";
  resultContent.style.display = "block";

  // get elements
  const dateID = document.getElementById("dateID");
  const timeID = document.getElementById("timeID");
  const locationID = document.getElementById("locationID");
  const tempID = document.getElementById("tempID");
  const iconID = document.getElementById("iconID");

  // date
  dateID.innerText =
    displayDay(dateObj.getDay()) +
    ", " +
    dateObj.getDate().toLocaleString() +
    " " +
    month[dateObj.getMonth()];
  //time
  timeID.innerText = dateObj.toLocaleTimeString();

  // location
  locationID.innerText = name;

  // icon
  iconID.innerHTML = getWeatherIcon(id);
  // set icon color
  const iconIDColor = document.getElementById("iconIDColor");
  iconIDColor.style.color = getWeatherIconColor(id);

  // temp
  tempID.innerText = temp + "°C";
};

// on locationSuccess
const locationSuccess = async (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const altitude = position.coords.altitude;
  const accuracy = position.coords.accuracy;
  const altitudeAccuracy = position.coords.altitudeAccuracy;
  const heading = position.coords.height;
  const speed = position.coords.speed;
  const timestamp = position.timestamp;

  const url = "/currentWeather?lat=" + latitude + "&lon=" + longitude;

  try {
    const result = await fetch(url);
    const jsonData = await result.json();
    const name = jsonData.name;
    const currentWeather = jsonData.weather[0];
    const { temp } = jsonData.main;

    updateUI(name, currentWeather, temp);

    msg.style.color = "black";
    btn.innerText = "Get current weather";
  } catch (error) {
    msg.innerText = "Unable to get current Weather!!";
    msg.style.color = "red";
  }
};

// on error
const locationError = (error) => {
  const code = error.code;
  const message = error.message;
  msg.innerText = message + "!!";
  msg.style.color = "red";
};

const fetchLocation = () => {
  navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
};

// on click
btn.addEventListener("click", () => {
  btn.innerText = "loading ...";
  fetchLocation();
});

// fetch location on load
fetchLocation();
