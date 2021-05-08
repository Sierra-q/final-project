let dayString;
let data = [];
let dataHumiditys = [];

// initiation
let slider0;
let slider1;

let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
//>>>>>>> 6d14e9bdce15e05cf454f78590ce4622cc5be592

//avg of data humidity
let sum = 0;

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
  slider0 = new Slider(300, 0, 100, 20, 80);
  slider0.position(width / 12, height / 3);

  slider1 = new Slider(300, 0, 30, 6, 24);
  slider1.position(width / 12, 2 * height / 3);
}

function draw() {
  background(224, 218, 252);

  // refreash slider0
  slider0.update();
  slider0.display();
  slider1.update();
  slider1.display();
  //console.log(slider1.end1);

  for (let m = 0; m <= 29; m++) {
    for (let n = 0; n <= 71; n++) {
      dataHumidity = data[m][n].humidity;
    }
    // console.log(data[m][n]);
    //console.info(dataHumidity);
  }


  // for (let n = 0; n <= 71; n++) {
  //   let dataHumiditys[n] = data[1][n].Humidity
  //   sum += dataHumidity[n];
  //   let average = sum / 71;
  //   print("average:", average);
  //   let dataHumidity = data[1][n].humidity;
  // }


  for (let j = 0; j < 30; j++) {
    // let row = j % 5;
    // let column = floor(j / 5);
    let row = floor(j / 6);
    let column = j % 6;
    let x = width / 3 + 150 * column;
    let y = height / 3 - 20 + 100 * row;

    if (j < slider1.end1 || j > slider1.end2) {
      // drawRaindrop(x, y, 0);
    } else {
      drawRaindrop(x, y, dataHumidity);
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
  if (dataHumidity > 60) {
    fill("#004CBB");
  }
  else if (dataHumidity > 50) {
    fill("#0C55C1");
  }
  else if (dataHumidity > 40) {
    fill("#2C67C9");
  }
  else if (dataHumidity > 30) {
    fill("#4C7DD3");
  }
  else if (dataHumidity > 20) {
    fill("#608CD8");
  }
  else if (dataHumidity > 0) {

    fill("#83A7E1");
  }
  noStroke();


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
