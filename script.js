var apiKey = "1695a85bf822350fc6b4ed134da665b7";
var currentWeather = $("#currentWeather");
var fivedayForcast = $("#fivedayForcast");
var cityName = $("#cityName");
var currentDay = moment().format("MMMM Do YYYY");
console.log(currentDay);
var cityArray = [];

//function for entering the city for search
$("#submitBtn").click(function (event) {
    event.preventDefault();
    var cityName1 = cityName.val().trim();
    console.log(cityName1);

    if (cityName1) {
        getWeather(cityName1);
        getweatherForcast(cityName1);

        listItems(cityName1);
    } else {
        alert("Please Enter A City");
    }
    $("form")[0].reset();
});

//function to update list in previous search section when a new city is searched.
function listItems(cityName1) {
    console.log(cityArray, "cityArray");
    city = cityName1.toUpperCase();
    if (!cityArray.includes(city)) {
        var cityNew = $("<li>").addClass("list-group-item").text(city);
        $(".list").append(cityNew);
    }
}
//funcion to get current weather of a city from open weatherapp ;update city name to local storage
function getWeather(cityName1) {
    console.log(cityName1);
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName1 + "&appid=" + apiKey;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            displayWeather(data);
            var city = cityName1.toUpperCase();
            cityArray = JSON.parse(localStorage.getItem("cityname")) || [];

            if (data.cod == 200 && !cityArray.includes(city)) {
                cityArray = JSON.parse(localStorage.getItem("cityname")) || [];
                cityArray.push(city);
                localStorage.setItem("cityname", JSON.stringify(cityArray));
            }
        })

        .catch(function (error) {
            console.error(error);
        });
}
//function to display current city weather
function displayWeather(data) {
    clearExistingData();

    $("#date").append(currentDay);
    $("#currentCity").append(data.name);
    var iconC = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    //console.log(iconC);
    $("#iconC").attr("src", iconC);
    var temp = data.main.temp;
    var tempC = Math.floor(temp - 273.15);
    console.log(tempC);
    $("#temp").append(tempC + "&deg;C");
    var windspeed = data.wind.speed;
    $("#wind").append(windspeed + "MPH");
    var humidity = data.main.humidity;
    $("#humd").append(humidity + "%");
    uvIndex(data.coord.lon, data.coord.lat);
}
//clear existing data
function clearExistingData() {
    cityName.textContent = " ";
    $("#currentCity").text("");
    $("#date").text(" ");
    $("#iconC").text("");
    $("#temp").text("");
    $("#speed").text(" ");
    $("#humd").text(" ");
    $("#uvcolor").text(" ");
    $("#wind").text("");

    $(".date1").text("");
    $("#wind1").text("");
    $("#humd1").text("");
    $("#temp1").text("");
    $(".icon1").text(" ");

    $(".date2").text("");
    $("#wind2").text("");
    $("#humd2").text("");
    $("#temp2").text("");
    $(".icon2").text(" ");

    $(".date3").text("");
    $("#wind3").text("");
    $("#humd3").text("");
    $("#temp3").text("");
    $(".icon3").text(" ");

    $(".date4").text("");
    $("#wind4").text("");
    $("#humd4").text("");
    $("#temp4").text("");
    $(".icon4").text(" ");

    $(".date5").text("");
    $("#wind5").text("");
    $("#humd5").text("");
    $("#temp5").text("");
    $(".icon5").text(" ");
}

//function to get uv index and apply colour index as background
function uvIndex(lon, lat) {
    console.log(lon, lat);
    var requestUrlUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(requestUrlUV)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var Uv = data.value;
            console.log(Uv);
            if (Uv >= 0 && Uv <= 2) {
                $("#uvcolor").css("background-color", "green").css("color", "white");
            } else if (Uv >= 3 && Uv <= 5) {
                $("#uvcolor").css("background-color", "yellow").css("color", "black");
            } else if (Uv >= 6 && Uv <= 7) {
                $("#uvcolor").css("background-color", "orange").css("color", "black");
            } else if (Uv >= 8 && Uv <= 10) {
                $("#uvcolor").css("background-color", "red").css("color", "white");
            }

            $("#uvcolor").append(Uv);
        })
        .catch(function (error) {
            console.error(error);
        });
}
//function to get weather forcast of 5 days
function getweatherForcast(cityName1) {
    clearExistingData();
    var requestUrlforcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName1 + "&appid=" + apiKey;
    fetch(requestUrlforcast)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var day = data.list[8];
            var date = moment(day.dt_txt).format("ddd, MMM D");
            console.log(date, "date");
            var temp = day.main.temp;
            var tempC = Math.floor(temp - 273.15);
            console.log(tempC);
            var humd = day.main.humidity;
            console.log(humd);
            var windspeed = day.wind.speed;
            console.log(windspeed);
            var icon = "https://openweathermap.org/img/wn/" + day.weather[0].icon + ".png";
            console.log(icon);
            $(".date1").append(date);
            $("#wind1").append(windspeed + "MPH");
            $("#humd1").append(humd + "%");
            $("#temp1").append(tempC + "&deg;C");
            $(".icon1").attr("src", icon);

            var day2 = data.list[16];
            var date = moment(day2.dt_txt).format("ddd, MMM D");
            console.log(date, "date");
            var temp = day2.main.temp;
            var tempC = Math.floor(temp - 273.15);
            console.log(tempC);
            var humd = day2.main.humidity;
            console.log(humd);
            var windspeed = day2.wind.speed;
            console.log(windspeed);
            var icon = "https://openweathermap.org/img/wn/" + day2.weather[0].icon + ".png";
            console.log(icon);
            $(".date2").append(date);
            $("#wind2").append(windspeed + "MPH");
            $("#humd2").append(humd + "%");
            $("#temp2").append(tempC + "&deg;C");
            $(".icon2").attr("src", icon);

            var day3 = data.list[24];
            var date = moment(day3.dt_txt).format("ddd, MMM D");
            console.log(date, "date");
            var temp = day3.main.temp;
            var tempC = Math.floor(temp - 273.15);
            console.log(tempC);
            var humd = day3.main.humidity;
            console.log(humd);
            var windspeed = day3.wind.speed;
            console.log(windspeed);
            var icon = "https://openweathermap.org/img/wn/" + day3.weather[0].icon + ".png";
            console.log(icon);
            $(".date3").append(date);
            $("#wind3").append(windspeed + "MPH");
            $("#humd3").append(humd + "%");
            $("#temp3").append(tempC + "&deg;C");
            $(".icon3").attr("src", icon);

            var day4 = data.list[32];
            var date = moment(day4.dt_txt).format("ddd, MMM D");
            console.log(date, "date");
            var temp = day4.main.temp;
            var tempC = Math.floor(temp - 273.15);
            console.log(tempC);
            var humd = day4.main.humidity;
            console.log(humd);
            var windspeed = day4.wind.speed;
            console.log(windspeed);
            var icon = "https://openweathermap.org/img/wn/" + day4.weather[0].icon + ".png";
            console.log(icon);
            $(".date4").append(date);
            $("#wind4").append(windspeed + "MPH");
            $("#humd4").append(humd + "%");
            $("#temp4").append(tempC + "&deg;C");
            $(".icon4").attr("src", icon);

            var day5 = data.list[39];
            var date = moment(day5.dt_txt).format("ddd, MMM D");
            console.log(date, "date");
            var temp = day5.main.temp;
            var tempC = Math.floor(temp - 273.15);
            console.log(tempC);
            var humd = day5.main.humidity;
            console.log(humd);
            var windspeed = day5.wind.speed;
            console.log(windspeed);
            var icon = "https://openweathermap.org/img/wn/" + day5.weather[0].icon + ".png";
            console.log(icon);
            $(".date5").append(date);
            $("#wind5").append(windspeed + "MPH");
            $("#humd5").append(humd + "%");
            $("#temp5").append(tempC + "&deg;C");
            $(".icon5").attr("src", icon);

            // $("#fivedayForcast").empty();
            // for (var i = 0; i < 40; i = i + 8)
            // var day = data.list[i];
            // var forcast = document.createElement("div");
            // forcast.classList = "card bg-primary text-light m-2";
            // var date = moment(day.dt_txt).format("ddd, MMM D");
            // console.log(date, "date");
            // var date1 = document.createElement("p");
            // date1.textContent = date;
            // date1.classList = "card-header text-center";
            // forcast.appendChild(date1);
            // fivedayForcast.appendChild(forcast);
            // var card = $("<div>").addClass("col-md-2 card ");
            // var cardBody = $("<div>").addClass("card-body ");
            // var date = moment(day.dt_txt).format("ddd, MMM D");
            // console.log(date, "date");
            // $("<p>").addClass("card-text").text(date);
            // var temp = day.main.temp;
            // var tempC = Math.floor(temp - 273.15) + "&deg;C";
            // console.log(tempC);
            // $("<p>").addClass("card-subtitle mb-2 text-muted").text(tempC);
            // var humd = day.main.humidity + "%";
            // console.log(humd);
            // $("<p>").addClass("card-subtitle mb-2 text-muted").text(humd);
            // var windspeed = day.wind.speed + "MPH";
            // console.log(windspeed);
            // $("<p>").addClass("card-subtitle mb-2 text-muted").text(windspeed);
            // var icon = "http://openweathermap.org/img/wn/" + day.weather[0].icon + ".png";
            // console.log(icon);
            // // $("<img>").attr("card-img-top", (src = icon));
            // card.append(cardBody.append(date, tempC, humd, windspeed));
            // $("#fivedayForcast").append(card);
            //  }
        })
        .catch(function (error) {
            console.error(error);
        });
}
//function to load previously searched city name from local storage if any
function invokePastSearch() {
    var previouscities = JSON.parse(localStorage.getItem("cityname")) || [];

    for (i = 0; i < previouscities.length; i++) {
        var city = $("<li>").addClass("list-group-item").text(previouscities[i]);
        $(".list").append(city);
    }
    var cityName1 = "sydney"; //loads sydney weather when the page gets load.
    getWeather(cityName1);
    getweatherForcast(cityName1);
}

//function to search a city from previous list
function searchfromlist(event) {
    var nameselect = event.target;
    if (event.target.matches("li")) {
        cityName1 = nameselect.textContent;
        getWeather(cityName1);
        getweatherForcast(cityName1);
    }
}
//function to clear local storage /previous search list
function clearStorage() {
    localStorage.clear();
    document.location.reload();
}
//event handlers
$(".list").on("click", searchfromlist);
$(window).on("load", invokePastSearch);
$("#clearBtn").on("click", clearStorage);
