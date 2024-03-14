const axios = require("axios");

const BASE_PATH = "http://api.openweathermap.org/data/2.5/weather";
const API_KEY = "d74109f00234b382c90330730083ac7c";

const prompt = (message, callback) => {
  const stdin = process.stdin;
  const stdout = process.stdout;

  stdin.resume();
  stdout.write(message);

  stdin.once("data", (data) => {
    callback(data.toString().trim());
  });
};

prompt("Enter a location or a postal code: ", function (location) {
  if (!location) {
    console.log("Please try again");
    process.exit();
  }

  axios
    .get(`${BASE_PATH}?q=${location}&units=metric&appid=${API_KEY}`)
    .then((response) => {
      const weather = response.data;
      const temperature = weather.main.temp;
      const description = weather.weather[0].description;
      const windSpeed = weather.wind.speed;
      const humidity = weather.main.humidity;

      const message = `\nCurrent temperature: ${temperature}°C\nWeather description: ${description}\nWind speed: ${windSpeed} m/s\nHumidity: ${humidity}%`;

      console.log(message);
      process.exit();
    })
    .catch((err) => {
      console.log(`Error: ${err.response.data.message}`);
      process.exit();
    });
});
