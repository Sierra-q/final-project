let dayString;
let data = [];
let dataHumidity;

function preload() {
  for (let i = 1; i <= 30; i++) {
    //for (let i = 21; i <= 21; i++) {
    if (i < 10) {
      dayString = "0" + i.toString();
    } else {
      dayString = i.toString();
    }
    data.push(loadJSON("shanghai-2021-04-" + dayString + ".json"));
    let hourData = Array.from(Object.values(data));
    console.log(data);


    let obj = { x: 10, y: 20 }
    console.info(obj.x)
    console.info(obj["x"])

    // console.info( data.10 )
    console.info(data[0])
    // console.log(hourData);
    // noLoop();
    // console.log(dayString);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(225);
}

function draw() {
  background(200);
  for (let m = 0; m <= 29; m++) {
    for (let n = 0; n <= 71; n++) {
      let dataHumidity = data[m][n].humidity;
    }
  }
  for (let j = 0; j < 30; j++) {
    let row = j % 5;
    let column = floor(j / 5);
    let x = 350 + 140 * column;
    let y = 160 + 90 * row;
    drawRaindrop(x, y, dataHumidity);

    // data.get(0)
    // data[0]


    // rainTable.get(m, "inches")*10
    // inches是他这里的降水量

  }
}

function drawRaindrop(x, y, dayHumidity) {
  if (dayHumidity > 60) {
    fill("#004CBB");
  }
  else if (dayHumidity > 50) {
    fill("#0C55C1");
  }
  else if (dayHumidity > 40) {
    fill("#2C67C9");
  }
  else if (dayHumidity > 30) {
    fill("#4C7DD3");
  }
  else if (dayHumidity > 20) {
    fill("#608CD8");
  }
  else if (dayHumidity > 10) {

    fill("#83A7E1");
  }
  noStroke();



  for (var j = 2; j < 30; j++) {
    let d = dist(x, y + i * 1.5, mouseX, mouseY);
		if (d <= 20) {
			fill('white');
		// ellipse(x, y + i * 1.5, i, i);
		// 		https://openprocessing.org/sketch/723484
  }

  // <-  

  for (let m = 2; m < 30; m++) {
    ellipse(x, y + m * 1.5, m, m);
  }

  // if (ptInRaindrop(mouseX,mouseY,x-i,y+i*1.5+i,x+i,y+i*1.5-i)){
  // 		Stroke('black');
  // }
}

// function ptInRaindrop(x, y, left, top, right, bottom) {
// 	return isBetween(x, left, right) && isBetween(y, top, bottom);
// }

// function isBetween(x, start, stop) {
// 	return (start < x && x < stop);
// }


//let dayHumidity = dayString[m].data[n].humidity;
      //let dayHumidity = data[n].weather_state_name;
      // console.info(`about to read data[${m}][${n}]`)
      // console.info(data[0])
      // console.log[data[0][]]
