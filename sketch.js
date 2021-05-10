let dayString;
let data = [];
let dayHumiditys = [];
let avg;
let total;
let dataHumidity = [];


// initiation
let slider0;
let slider1;

let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
//>>>>>>> 6d14e9bdce15e05cf454f78590ce4622cc5be592

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
    // console.log(data);


    let obj = { x: 10, y: 20 }
    // console.info(obj.x)
    // console.info(obj["x"])

    // console.info(data[0])
    // console.log(hourData);
    // noLoop();
    // console.log(dayString);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //background('SlateBlue');

  //slider
  slider0 = new Slider(250, 0, 100, 20, 80);
  slider0.position(width / 15, height / 3);

  slider1 = new Slider(250, 0, 30, 6, 24);
  slider1.position(width / 15, 2 * height / 3);


  for (let m = 0; m <= 29; m++) {
    // avg humidify for day #1
    for (let n = 0; n <= 71; n++) {
      dayHumiditys.push(data[m][n].humidity);
    }
    //console.info(dayHumiditys);
    let avg = average(dayHumiditys);
    dataHumidity.push(avg);
    console.info(dataHumidity);
  }

  //   dataHumidity.push(data[m].humidity);
  // }
  // console.info(dataHumidity);
  // for (i = 0; i < dayHumiditys.length; i++) {
  // dataHumidity = average(dayHumiditys);
  //console.info(dataHumidity);


}

function draw() {
  background(224, 218, 252);
  //fill(240);
  // rect(0, 220, width / 4, height);
  // refreash slider0
  slider0.update();
  slider0.display();
  slider1.update();
  slider1.display();
  //console.log(slider1.end1);

  // for (let m = 0; m <= 29; m++) {
  //   for (let n = 0; n <= 71; n++) {
  //     dataHumidity = data[m][n].humidity;
  // }
  // }
  // console.log(data[m][n]);
  //console.info(dataHumidity);


  for (let j = 0; j < 30; j++) {
    // let row = j % 5;
    // let column = floor(j / 5);
    let row = floor(j / 6);
    let column = j % 6;
    let x = width / 3 + 150 * column;
    let y = height / 3 - 40 + 100 * row;

    if (j < slider1.end1 || j > slider1.end2) {
      // drawRaindrop(x, y, 0);
    } else {
      drawRaindrop(x, y, dataHumidity[j]);
    }

    // drawRaindrop(x, y, dataHumidity);
    textSize(20);
    strokeWeight(4);
    stroke(198, 205, 233);
    text(days[j], x - 5, y + 80);

    // data.get(0)
    // data[0]
    //console.info(dataHumidity);

    // rainTable.get(m, "inches")*10
    // inches是他这里的降水量
    fill('white');
    textSize(100);
    strokeWeight(5);
    stroke('RebeccaPurple');
    textAlign(CENTER);
    textFont("Merienda");
    text("Raining With You", 0, 30, width);
  }
}

function drawRaindrop(x, y, dataHumidity) {
  // if (dataHumidity > 60) {
  //   fill("#004CBB");
  // }
  // else if (dataHumidity > 50) {
  //   fill("#0C55C1");
  // }
  // else if (dataHumidity > 40) {
  //   fill("#2C67C9");
  // }
  // else if (dataHumidity > 30) {
  //   fill("#4C7DD3");
  // }
  // else if (dataHumidity > 20) {
  //   fill("#608CD8");
  // }
  // else if (dataHumidity > 0) {

  //   fill("#83A7E1");
  // }
  // noStroke();
  fillRaindropColor();
  fill(c);


  for (var i = 2; i < 30; i++) {
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
}

function average(dayHumiditys) {
  avg = sum(dayHumiditys) / dayHumiditys.length;
  console.info(avg);
  return avg;
}

function sum(dayHumiditys) {
  let total = 0;
  for (let i = 0; i < dayHumiditys.length; i++) {
    total += dayHumiditys[i];
    //  total += data[i][0].humidity;
  }
  return total;
  console.info(total);
}


function fillRaindropColor() {
  let highColor = (0, 0, 139);
  let lowColor = (135, 206, 250);
  scaledHumidity = map(dataHumidity[0], 50, 60, 0, 1);
  let c = lerpColor(highColor, lowColor, scaledHumidity);
  return c;
}
