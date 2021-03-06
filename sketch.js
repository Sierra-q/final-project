let dayString;
let data = [];
let dayHumiditys = [];
let avg;
let total;
let dataHumidity = [];
let page = 1;
let dayIndex;
// initiation
let slider0;
let slider1;
let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
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
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  //background('SlateBlue');
  //slider
  slider0 = new Slider(250, 48, 66, 53, 62, 3);
  slider0.position(width / 15, 2 * height / 3);
  slider1 = new Slider(250, 0, 30, 6, 24, 1);
  slider1.position(width / 15, height / 2.5);
  for (let m = 0; m <= 29; m++) {
    // avg humidify for day #1
    for (let n = 0; n <= 71; n++) {
      dayHumiditys.push(data[m][n].humidity);
    }
    //console.info(dayHumiditys);
    let avg = average(dayHumiditys);
    dataHumidity.push(avg);
    // console.info(dataHumidity);
  }
  //   dataHumidity.push(data[m].humidity);
  // }
  // console.info(dataHumidity);
  // for (i = 0; i < dayHumiditys.length; i++) {
  // dataHumidity = average(dayHumiditys);
  //console.info(dataHumidity);
}
function draw() {
  if (page === 1) {
    draw1();
  } else if (page === 2) {
    draw2();
  } else if (page === 3) {
    draw3();
  }
}
function mousePressed() {
  if (page === 1) {
    page++;
  }
}
//front page
function draw1() {
  drawFront();
}
function drawFront() {
  //background(224, 218, 252);
  // background(10, 159, 221);
  background(255, 240, 255)
  fill(224, 218, 252);
  noStroke();
  rect(width / 6, height / 6, width / 1.5, height / 1.5);
  fill('white');
  textSize(100);
  strokeWeight(5);
  stroke('RebeccaPurple');
  textAlign(CENTER);
  textFont("Merienda");
  text("Raining With You", 0, 0.4 * height, width);
  textSize(28);
  text("Shanghai:\n 31?? 13' 27.6996'' N,\n 121?? 28' 9.0120'' E,\n 2020.04.01-2020.04.30", 0, 0.6 * height, width);
  fill('SlateBlue');
  circle(width / 6 + 40, height / 6 + 40, 20);
  circle(5 * width / 6 - 40, height / 6 + 40, 20);
  circle(width / 6 + 40, 5 * height / 6 - 40, 20);
  circle(5 * width / 6 - 40, 5 * height / 6 - 40, 20);
}
// mainpage
function draw2() {
  background(224, 218, 252);
  //fill(240);
  // rect(0, 220, width / 4, height);
  // refreash slider0
  slider0.update();
  slider0.display();
  slider1.update();
  slider1.display();
  textSize(20);
  strokeWeight(0);
  fill('RebeccaPurple');
  text('Shanghai',85,50);
  text('2020.4',85,80);
  // textFont("Georgia");
  text('drag to select days', 210,280);
  text('drag to select humidity', 210, 490)
  //console.log(slider1.end1);
  // for (let m = 0; m <= 29; m++) {
  //   for (let n = 0; n <= 71; n++) {
  //     dataHumidity = data[m][n].humidity;
  // }
  // }
  // console.log(data[m][n]);
  //console.info(dataHumidity);
  //  let dataEveryThreeHour;
  for (let j = 0; j < 30; j++) {
    // let row = j % 5;
    // let column = floor(j / 5);
    let row = floor(j / 6);
    let column = j % 6;
    let x = width / 3 + 150 * column;
    let y = height / 3 - 40 + 100 * row;
    let condition1 = j >= slider1.end1 && j < slider1.end2
    let condition2 = dataHumidity[j] >= slider0.end1 && dataHumidity[j] < slider0.end2;
    if (condition1 && condition2) {
      drawRaindrop(x, y, dataHumidity[j]);
    }
    // drawRaindrop(x, y, dataHumidity);
    textSize(20);
    strokeWeight(4);
    stroke(198, 205, 233);
    text(days[j], x - 5, y + 80);
  }
  fill('white');
  textSize(100);
  strokeWeight(5);
  stroke('RebeccaPurple');
  textAlign(CENTER);
  textFont("Merienda");
  text("Raining With You", 0, 70, width);
}
function drawRaindrop(x, y, dataHumidity) {
  // set fill to a color based on the humidity
  setFillBasedOnHumidity(dataHumidity);
  noStroke();
  for (var i = 2; i < 30; i++) {
    let d = dist(x, y + i * 1.5, mouseX, mouseY);
    if (d <= 15) {
      fill('white');
      // ellipse(x, y + i * 1.5, i, i);
      // 		https://openprocessing.org/sketch/723484
    }
    for (let m = 2; m < 30; m++) {
      ellipse(x, y + m * 1.5, m, m);
    }
    if (d <= 15 && page === 2 && mouseIsPressed) {
      page = 3;
      // x = width / 3 + 150 * column;
      // let y = height / 3 - 40 + 100 * row;
      let row = floor((floor(mouseY) - height / 3 + 40) / 100);
      let column = floor((floor(mouseX) - width / 3) / 150);
      dayIndex = row * 6 + column;
    }
    // if (ptInRaindrop(mouseX,mouseY,x-i,y+i*1.5+i,x+i,y+i*1.5-i)){
    // 		Stroke('black');
    // }
  }
}
// function setFillBasedOnHumidity(dataHumidity) {
//   if (dataHumidity > 60) {
//     fill("#004CBB");
//   }
//   else if (dataHumidity > 50) {
//     fill("#0C55C1");
//   }
//   else if (dataHumidity > 40) {
//     fill("#2C67C9");
//   }
//   else if (dataHumidity > 30) {
//     fill("#4C7DD3");
//   }
//   else if (dataHumidity > 20) {
//     fill("#608CD8");
//   }
//   else if (dataHumidity > 0) {
//     fill("#83A7E1");
//   }
// }
let scaledHumidity;
function setFillBasedOnHumidity(dataHumidity) {
  // fill(c)
  let aColor = colorForHumidity(dataHumidity);
  fill(aColor);
}
// figures out a color based on dataHumidity
function colorForHumidity(dataHumidity) {
  let highColor = color(0, 0, 139);
  let lowColor = color(145, 216, 250);
  colorMode(RGB);
  scaledHumidity = map(dataHumidity, 50, 65, 0, 1);
  let aColor = lerpColor(lowColor, highColor, scaledHumidity);
  return aColor;
}
function calculateArcStartColor(arcIndex) {
  // figures out a color based on dataHumidity
  // fill(c)
  let highColor = color(0, 0, 139);
  //let lowColor = color(135, 206, 250);
  let lowColor = color(135, 206, 250);
  colorMode(RGB);
  // console.info(data)
  scaledHumidity1 = map(data[dayIndex][arcIndex * 8].humidity, 50, 75, 0, 1);
  // scaledHumidity2 = map(data[dayIndex][m+8].humidity, 50, 75, 0, 1);
  let c1 = lerpColor(lowColor, highColor, scaledHumidity1);
  // let c2 = lerpColor(lowColor, highColor, scaledHumidity2);
  return c1;
}
function calculateArcStopColor(arcIndex) {
  // figures out a color based on dataHumidity
  // fill(c)
  let highColor = color(0, 0, 139);
  //let lowColor = color(135, 206, 250);
  let lowColor = color(135, 206, 250);
  colorMode(RGB);
  // console.info(data)
  scaledHumidity2 = map(data[dayIndex][arcIndex * 8 + 8].humidity, 50, 75, 0, 1);
  // scaledHumidity2 = map(data[dayIndex][m+8].humidity, 50, 75, 0, 1);
  let c2 = lerpColor(lowColor, highColor, scaledHumidity2);
  // let c2 = lerpColor(lowColor, highColor, scaledHumidity2);
  return c2;
}
//second page
function draw3() {
  background(224, 218, 252);
  textSize(20);
  strokeWeight(0);
  fill('RebeccaPurple');
  text('Shanghai',85,50);
  text('2020.4',85,80);
  drawArcs();
  // gradient1();
  gradient2();
  button();
}
// console.info("data[dayIndex] =")
//   console.info(data[dayIndex])
//   console.info("data[dayIndex][0] =")
//   console.info(data[dayIndex][0])
//   console.info("data[dayIndex][0].humidity =")
//   console.info(data[dayIndex][0].humidity)
//   console.info("data[dayIndex][8].humidity =")
//   console.info(data[dayIndex][8].humidity)
function drawArcs(data) {
  // scaledHumidity = map(data, 50, 65, 0, 1);
  arc1();
  arc2();
  arc3();
  arc4();
  arc5();
  arc6();
  arc7();
  arc8();

  // for (let i = 0; i < 8; i++) {
  //   gradientTemperatureArc(i);
  // }
}
// function gradient1() {
// let whiteColor = color(255, 255, 255);
// let blueColor = color("RebeccaPurple");
// textSize(15);
// stroke("black")
// text("12am",10,10);
// calculateColorBasedOnHumidity();
function arc1() {
  let c1 = calculateArcStartColor(0);
  let c2 = calculateArcStopColor(0);
  for (let i = PI + PI / 8; i > PI; i -= 0.01) {
    let s = map(i, PI, PI + PI / 8, 0, 1);
    let c = lerpColor(c1, c2, s);
    noStroke();
    fill(c);
    arc(width / 2, height * 2 / 3, 800, 600, PI, i);
    textSize(20);
    stroke("black");
    strokeWeight(2);
    text("00:00", width / 2 - 450, height * 2 / 3);
  }
}
function arc2() {
  let c1 = calculateArcStartColor(1);
  let c2 = calculateArcStopColor(1);
  for (let i = PI + PI / 4; i > PI + PI / 8; i -= 0.01) {
    let s = map(i, PI + PI / 8, PI + PI / 4, 0, 1);
    let c = lerpColor(c1, c2, s);
    noStroke();
    fill(c);
    arc(width / 2, height * 2 / 3, 800, 600, PI + PI / 8, i);
    // textSize(20);
    // stroke("black");
    // strokeWeight(2);
    // text("3am",width/2-410,height*2/3- 150);
  }
}
function arc3() {
  let c1 = calculateArcStartColor(2);
  let c2 = calculateArcStopColor(2);
  for (let i = PI + PI / 8 * 3; i > PI + PI / 4; i -= 0.01) {
    let s = map(i, PI + PI / 4, PI + PI / 8 * 3, 0, 1);
    let c = lerpColor(c1, c2, s);
    noStroke();
    fill(c);
    arc(width / 2, height * 2 / 3, 800, 600, PI + PI / 4, i);
    // textSize(20);
    // stroke("black");
    // strokeWeight(2);
    // text("6am",width/2-300,height*2/3-250);
  }
}
function arc4() {
  let c1 = calculateArcStartColor(3);
  let c2 = calculateArcStopColor(3);
  for (let i = PI + PI / 2; i > PI + PI / 8 * 3; i -= 0.01) {
    let s = map(i, PI + PI / 8 * 3, PI + PI / 2, 0, 1);
    let c = lerpColor(c1, c2, s);
    noStroke();
    fill(c);
    arc(width / 2, height * 2 / 3, 800, 600, PI + PI / 8 * 3, i);
  }
}
function arc5() {
  let c1 = calculateArcStartColor(4);
  let c2 = calculateArcStopColor(4);
  for (let i = PI + PI / 8 * 5; i > PI + PI / 2; i -= 0.01) {
    let s = map(i, PI + PI / 2, PI + PI / 8 * 5, 0, 1);
    let c = lerpColor(c1, c2, s);
    noStroke();
    fill(c);
    arc(width / 2, height * 2 / 3, 800, 600, PI + PI / 2, i);
    stroke("black");
    strokeWeight(2);
    text("12:00", width / 2 - 10, height * 2 / 3 - 320);
  }
}
function arc6() {
  let c1 = calculateArcStartColor(5);
  let c2 = calculateArcStopColor(5);
  for (let i = PI + PI / 8 * 6; i > PI + PI / 8 * 5; i -= 0.01) {
    let s = map(i, PI + PI / 8 * 5, PI + PI / 8 * 6, 0, 1);
    let c = lerpColor(c1, c2, s);
    noStroke();
    fill(c);
    arc(width / 2, height * 2 / 3, 800, 600, PI + PI / 8 * 5, i);
  }
}
function arc7() {
  let c1 = calculateArcStartColor(6);
  let c2 = calculateArcStopColor(6);
  for (let i = PI + PI / 8 * 7; i > PI + PI / 8 * 6; i -= 0.01) {
    let s = map(i, PI + PI / 8 * 6, PI + PI / 8 * 7, 0, 1);
    let c = lerpColor(c1, c2, s);
    noStroke();
    fill(c);
    arc(width / 2, height * 2 / 3, 800, 600, PI + PI / 8 * 6, i);
  }
}
function arc8() {
  let c1 = calculateArcStartColor(7);
  let c2 = calculateArcStopColor(7);
  for (let i = TWO_PI; i > PI + PI / 8 * 7; i -= 0.01) {
    let s = map(i, PI + PI / 8 * 7, TWO_PI, 0, 1);
    let c = lerpColor(c1, c2, s);
    noStroke();
    fill(c);
    arc(width / 2, height * 2 / 3, 800, 600, PI + PI / 8 * 7, i);
    textSize(20);
    stroke("black");
    strokeWeight(2);
    text("24:00", width / 2 + 440, height * 2 / 3);
  }
}
function gradient2() {
  push();
  // translate(x, y);
  for (let i = width / 2 - 250; i < width / 2 + 250; i++) {
    let s = map(i, width / 2 - 250, width / 2 + 250, 0, 1)
    let c = lerpColor(color(145, 216, 250), color(0, 0, 139), s);
    stroke(c);
    // line(i, height-90, i, height-120);
    rect(i - 10, height - 120, 90, 30, 10);
    fill(c);
  }
  pop();
  for (let i = 48; i <= 66; i += 3) {
    text(i, width / 2 - 1850 + i * 33, height - 60);
  }
}
function button() {
  fill("#83A7E1");
  rect(width - 160, 60, 100, 40, 10);
  fill("white");
  text("BACK", width - 110, 87);
  let d = dist(width - 110, 65, mouseX, mouseY);
  if (d <= 54 && mouseIsPressed) {
    page = 2;
  }
}
function average(dayHumiditys) {
  avg = sum(dayHumiditys) / dayHumiditys.length;
  // console.info(avg);
  return avg;
}
function sum(dayHumiditys) {
  let total = 0;
  for (let i = 0; i < dayHumiditys.length; i++) {
    total += dayHumiditys[i];
    //  total += data[i][0].humidity;
  }
  return total;
  // console.info(total);
}
// let scaledHumidity = [];
// let colors = [];
// let newColors;
// function fillRaindropColor() {
//   let highColor = color(0, 0, 139);
//   let lowColor = color(135, 206, 250);
//   colorMode(RGB);
//   for (i = 0; i < dataHumidity.length; i++) {
//     // console.log(dataHumidity[i]);
//     scaledHumidity[i] = map(dataHumidity[i], 50, 65, 0, 1);
//     // console.log(scaledHumidity[i]);
//     colors[i] = lerpColor(highColor, lowColor, scaledHumidity[i]);
//     console.log(colors[i]);
//     function returnColorArray() {
//       for (let j = 0; j < colors.length; j++) {
//         let c = [];
//         c.push(colors);
//         return c;
//       }
//     }
//     let newColors = returnColorArray();
//     console.log(newColors);
//   }
// }
