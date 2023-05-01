// create an array of objects with x and y data. x has value as date and y has value as electricity consumption
// x is in the format of "yyyy-mm-dd" and y is in the format of "kWh"
// the data is from 2022-01-01 to 2022-12-31
// the data is generated randomly
// the data is stored in the variable "data"
// the data is exported to the file "plotpage.js"

function random(min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min) / 10;
}

// for loop to generate daily data for 2022 for each month
// the data is stored in the variable "data"

var data = [];
for (var i = 1; i <= 12; i++) {
  var month = i.toString().padStart(2, "0");
  for (var j = 1; j <= 31; j++) {
    var day = j.toString().padStart(2, "0");
    var date = "2022-" + month + "-" + day;
    var electricity = random(0, 100);
    data.push({ x: date, y: electricity });
  }
}

console.log(data);
