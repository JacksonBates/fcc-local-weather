$(document).ready(function() {
  $.getJSON('https://ipinfo.io', function(data){ 
    
    //Get position for weather api url 
    var locationString = data.loc;
    var locationArray = locationString.split(",");
    var localLat = locationArray[0];
    var localLon = locationArray[1];
    var weatherApiURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' +
        localLat + '&lon=' + localLon + '&APPID=77aec1ab4dbea437d871ce89db104e8d';
    $.getJSON(weatherApiURL, function(json) {
      
      //Set up temp string variables
      var tempKel = json.main.temp;
      var tempCel = Math.floor(tempKel - 273.15);
      tempCel = tempCel.toString();
      tempCel = tempCel + "\xB0c";
      var tempFar = Math.floor((tempKel * 9/5) - 459.67);
      tempFar = tempFar.toString();
      tempFar = tempFar + "\xB0f";

      //Set unit state
      var tempUnit = "C";
      
      //Get weather information
      var description = json.weather[0].description;
      description = description.replace(/./,description[0].toUpperCase());
      var icon = json.weather[0].icon;
      console.log(icon);

      // Write values to HTML page
      $(".city").text(json.name);
      $(".temp").text(tempCel);
      $(".description").text(description);

      // Set icon
      switch (icon) {
        case "01d":
        case "01n":
          $(".weather-icon-flex").html("<img class='weather-icon' src='svg/sun.svg'>");
          break;
        case "02d":
        case "02n":
        case "03d":
        case "03n":
          $(".weather-icon-flex").html("<img class='weather-icon' src='svg/scattered-cloud.svg'>");
          break;
        case "04d":
        case "04n":
          $(".weather-icon-flex").html("<img class='weather-icon' src='svg/cloud.svg'>");
          break;
        case "09d":
        case "09n":
          $(".weather-icon-flex").html("<img class='weather-icon' src='svg/shower.svg'>");
          break;          
        case "10d":
        case "10n":
          $(".weather-icon-flex").html("<img class='weather-icon' src='svg/rain.svg'>");
          break;
        case "11d":
        case "11n":
          $(".weather-icon-flex").html("<img class='weather-icon' src='svg/thunderstorm.svg'>");
          break;
        case "13d":
        case "13n":
          $(".weather-icon-flex").html("<img class='weather-icon' src='svg/snow.svg'>");
          break;
        case "50d":
        case "50n":
          $(".weather-icon-flex").html("<img class='weather-icon' src='svg/fog.svg'>");
          break;
      };
      
      // Toggle units
      $(".temp").on("click", function () { 
        if (tempUnit === "C") {
          $(".temp").text(tempFar);
          tempUnit = "F";
        } else {
          $(".temp").text(tempCel);
          tempUnit = "C";
        };
      }); // <-- end of onclick for degree switch
    }); // <-- End of weather api call  
  }); // <-- End of ip api call
}); // <-- End of Document.ready call