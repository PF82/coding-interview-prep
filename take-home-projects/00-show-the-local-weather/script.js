// add an event listener to fire the load event which occurs when the whole page has loaded
window.addEventListener('load', () => {
    // declare longitude and latitude variables / defining coordinates
    let lon;
    let lat;

    // access to user's geolocation
    if (navigator.geolocation) { // if this exists
        navigator.geolocation.getCurrentPosition((position) => { // then do this (find the exact position)
            console.log(position) // inserted for reference only
            // storing longitude and latitude in variables
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            // openweathermap API used as opposed to freecodecamp weather API
            const apiKey = "229123719331231a3ae10f87dcb22d0d";

            // use fetch method to get JSON (format for storing and transporting data from a server to a web page)
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)

                // represent HTTP response, using json() method extract the JSON body content from the Response object
                .then((response) => {
                    if (!response.ok) {
                        alert("No weather found");
                        throw new Error("No weather found");
                    }
                    return response.json();
                })

                // access weather data from openweathermap
                .then((data) => {

                    // destructure assignment to extract values from objects (JSON / data)
                    const { name, dt } = data;
                    const { country, sunrise, sunset } = data.sys;
                    const { description, icon, id } = data.weather[0];
                    const { temp, humidity } = data.main;

                    /* allow user to flip between imperial and metric units of measure */
                    var countryUnits = 'metric';
                    var button = document.querySelector(".button");

                    function toggleUnits() {
                        // check if currently set to imperial or metric
                        if (countryUnits === 'metric') {
                            // convert celsius to fahrenheit
                            document.querySelector(".temp").innerHTML = `${((temp.toFixed(0)) * 9 / 5) + 32}°F`;
                            countryUnits = 'imperial';
                            button.innerHTML = 'Metric Units';
                        }
                        else {
                            // convert fahrenheit to celsius
                            document.querySelector(".temp").innerHTML = `${temp.toFixed(1)}°C`;
                            countryUnits = 'metric';
                            button.innerHTML = 'Imperial Units';
                        }
                    }
                    // add onclick event to 'change units' button
                    document.querySelector(".button").onclick = function () {
                        toggleUnits();
                    };

                    // change background image to match current weather conditions
                    function backgroundImageChange(id) {
                        if (id >= 200 && id <= 232) {
                            document.body.style.backgroundImage = "url('./img/thunderstorm.jpg')";
                        } else if (id >= 300 && id <= 321 || id >= 520 && id <= 531) {
                            document.body.style.backgroundImage = "url('./img/shower-rain.jpg')";
                        } else if (id >= 500 && id <= 504) {
                            document.body.style.backgroundImage = "url('./img/rain.jpg')";
                        } else if (id >= 600 && id <= 622 || id == 511) {
                            document.body.style.backgroundImage = "url('./img/snow.jpg')";
                        } else if (id >= 701 && id <= 781) {
                            document.body.style.backgroundImage = "url('./img/fog.jpg')";
                        } else if (id == 800) {
                            document.body.style.backgroundImage = "url('./img/clear-sky.jpg')";
                        } else if (id == 801) {
                            document.body.style.backgroundImage = "url('./img/few-clouds.jpg')";
                        } else if (id == 802) {
                            document.body.style.backgroundImage = "url('./img/scattered-clouds.jpg')";
                        } else {
                            document.body.style.backgroundImage = "url('./img/broken-clouds.jpg')";
                        }
                    }

                    // change small image to match either day mode or night mode
                    // and change text inside small image to match either day mode or night mode
                    var currentTime = new Date(dt * 1000);
                    var sunriseTime = new Date(sunrise * 1000);
                    var sunsetTime = new Date(sunset * 1000);

                    function dayAndNightImages(currentTime) {
                        if (currentTime > sunriseTime && currentTime < sunsetTime) {
                            document.querySelector(".image").setAttribute('src', './img/day-1.jpg');
                            document.querySelector('.msg').innerHTML = 'GOOD DAY';
                        } else {
                            document.querySelector(".image").setAttribute('src', './img/night.jpg');
                            document.querySelector('.msg').innerHTML = 'GOOD NIGHT';
                        }
                    }

                    // interact with DOM to show JSON (data from the server to the HTML element)
                    document.querySelector(".location").innerHTML = `${name}`;
                    document.querySelector(".country").innerHTML = `${country}`;
                    document.querySelector(".temp").innerHTML = `${temp.toFixed(1)}°C`;
                    document.querySelector(".desc").innerHTML = `${description}`;
                    document.querySelector(".icon").setAttribute("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
                    document.getElementById("sunrise").innerHTML = window.moment(sunrise * 1000).format('HH:mm');
                    document.getElementById("sunset").innerHTML = window.moment(sunset * 1000).format('HH:mm');
                    document.getElementById("humidity").innerHTML = `${humidity} %`;
                    var bi = document.getElementById('background-image');
                    bi.style.backgroundImage = backgroundImageChange(id);
                    var i = document.querySelector('.image');
                    i.style.setAttribute = dayAndNightImages(currentTime);

                    //console.log(JSON.stringify(data)) // inserted for reference only
                    console.log(data); // inserted for reference only
                });
        });
    } else {
        document.getElementById("heading").innerHTML = "Geolocation is not supported by this browser";
    }
});