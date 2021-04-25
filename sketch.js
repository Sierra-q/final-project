let dayString;
let data = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 1; i <= 30; i++) {
    //for (let i = 21; i <= 21; i++) {
    if (i < 10) {
      dayString = "0" + i.toString();
    } else {
      dayString = i.toString();
    }
    data = loadJSON("shanghai-2021-04-" + dayString + ".json");
    let hourData = Array.from(Object.values(data));
    console.log({ data });
    // console.log(dayString);
  }
}
function draw() {
  background(200);
  // let dayHumidity = data[0].humidity;
}
