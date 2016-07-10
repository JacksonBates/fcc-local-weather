function getPos() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var localLat = position.coords.latitude;
    var localLon = position.coords.longitude;
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + localLat + "&lon=" + localLon + "&APPID=77aec1ab4dbea437d871ce89db104e8d", function(json) {
    var tempKel = json.main.temp; 
    // substract 273.15 to convert to Celcius
    var tempCel = Math.floor(tempKel - 273.15);
    tempCel = tempCel.toString();
    tempCel = tempCel + "\xB0C";
    var tempFar = Math.floor((tempKel * 9/5) - 459.67);
      tempFar = tempFar.toString();
      tempFar = tempFar + "\xB0F";
      var tempUnit = "C";
    var description = json.weather[0].description;
    var icon = json.weather[0].icon;
    // Write values to HTML page
    $(".city").text(json.name);
    $(".temp").text(tempCel);
    $(".description").text(description);
    $(".weather-icon").html("<img class='icon-border center-block' src='http://openweathermap.org/img/w/" + icon + ".png'>");
      // Set Background
      switch (icon) {
        case "01d":
        case "01n":
          $('body').css('background-image', 'url(http://www.photos-public-domain.com/wp-content/uploads/2011/02/bright-sun-in-blue-sky.jpg)');
          break;
        case "02d":
        case "02n":
        case "03d":
        case "03n":
          $('body').css('background-image', 'url(http://canitbesaturdaynow.com/images/fpics/1679/033120bd5d2cfd5c05653a107622e41d.jpg)');
          break;
        case "04d":
        case "04n":
          $('body').css('background-image', 'url(http://img13.deviantart.net/fa39/i/2015/052/6/1/broken_clouds_by_leo_6tos-d8ixdlv.jpg)');
          break;
        case "09d":
        case "09n":
          $('body').css('background-image', 'url(http://blog.ctnews.com/weather/files/2014/06/isss.jpg)');
          break;
        case "11d":
        case "11n":
          $('body').css('background-image', 'url(https://upload.wikimedia.org/wikipedia/commons/1/19/Thunderstorm_in_sydney_2000x1500.png)');
          break;
        case "13d":
        case "13n":
          $('body').css('background-image', 'url(https://upload.wikimedia.org/wikipedia/commons/4/4a/Snow_on_the_mountains_of_Southern_California.jpg)');
          break;
        case "50d":
        case "50n":
          $('body').css('background-image', 'url(http://weknowyourdreamz.com/images/fog/fog-08.jpg)');
          break;
      }
      // Toggle units
      $("#degree-switch").on("click", function () { 
        if (tempUnit === "C") {
          $(".temp").text(tempFar);
          tempUnit = "F";
        } else {
          $(".temp").text(tempCel);
          tempUnit = "C";
        }
      })
  })  
  })
}

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(position, options) {
  var crd = position.coords;
  var localLat = crd.latitude;
  var localLon = crd.longitude;
}

getPos();

/*$(document).ready(function () {
  var localLat = navigator.geolocation.getCurrentPosition(function(position){
    position.coords.latitude;
  })
  console.log(localLat);
  var localLon = navigator.geolocation.getCurrentPosition(function(position){
    position.coords.latitude;
  })
  $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + localLat + "&lon=" + localLon, function(json) {
    console.log(JSON.stringify(json));
  }) 
});
*/