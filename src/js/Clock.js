// Variables and Constants

let time = new Date();

const start = Date.now();

let id = setInterval(animate, 10);

// Class

const clocks = [];

class speedClock {
  
  constructor(hours, offset, parentId) {
    
    // Vars
    
    this.update = true;
    
    this.time = new Date();
    
    this.mult = 24 / hours;
    this.offset = offset;
    
    // Add HTML
    
    this.parent = document.getElementById(parentId);
    
    this.face = document.createElement('div');
    this.face.className = 'face';
    this.parent.appendChild(this.face);
    
    this.hourHand = document.createElement('div');
    this.hourHand.className = 'hour';
    this.parent.appendChild(this.hourHand);
    
    this.minuteHand = document.createElement('div');
    this.minuteHand.className = 'minute';
    this.parent.appendChild(this.minuteHand);
    
    this.secondHand = document.createElement('div');
    this.secondHand.className = 'second';
    this.parent.appendChild(this.secondHand);
    
    this.pin = document.createElement('div');
    this.pin.className = 'pin';
    this.parent.appendChild(this.pin);
    
    this.digitalFace = document.createElement('div');
    this.digitalFace.className = 'digital';
    this.digitalFace.innerHTML = '##:##:## XX';
    this.parent.appendChild(this.digitalFace);
    
    generateFace(15, 0.5, this.face);
    
    // Push
    
    clocks.push(this);
    
  }
  
  analog(time) {
    
    let second = time.getSeconds();
    let minute = time.getMinutes() + (second / 60);
    let hour = time.getHours() + (minute / 60);
    
    let secondDeg = (second * 6) - 90
    let minuteDeg = (minute * 6) - 90
    let hourDeg = (hour * 30) - 90
    
    this.secondHand.style.transform = 'rotate(' + secondDeg + 'deg)';
    this.minuteHand.style.transform = 'rotate(' + minuteDeg + 'deg)';
    this.hourHand.style.transform = 'rotate(' + hourDeg + 'deg)';
    
  }
  
  digital(time) {
    
    let digital = document.getElementById("digital");
    let hour = time.getHours() % 12;
    if(hour == 0) hour = 12;
    if(hour < 10) hour = "0" + hour;
    
    let meridiem = "AM";
    if(time.getHours() >= 12) meridiem = "PM";
    
    let minute = time.getMinutes();
    if(minute < 10) minute = "0" + minute;
    
    let second = time.getSeconds();
    if(second < 10) second = "0" + second;
    
    this.digitalFace.innerHTML = hour + ":" + minute + ":" + second + " " + meridiem;
    
  }
  
  animate() {
    
    if(this.update) {
      this.time.setTime((new Date().getTime() * this.mult) + this.offset);
    }
    
    this.analog(this.time);
    this.digital(this.time);
    
  }
  
}

// Functions

function generateFace(radius, offset, face){
  
  let left = face.style.left;
  let right = face.style.right;
  
  for(let i = 0; i < 60; i++){
    
    let posX = ((Math.cos((Math.PI / 30) * (i - 3) ) + 1) * (radius)) + offset;
    let posY = ((Math.sin((Math.PI / 30) * (i - 3) ) + 1) * (radius)) + offset;
    
    let char = '&#x25AA';
    
    if((i + 12) % 5 == 0) char = ((i + 12) / 5) % 12;
    if(char == 0) char = 12;
    
    let tick = document.createElement('div');
    tick.style = 'position: absolute; left:' + left + '; top: ' + top + '; transform: translate(' + posX + 'em,' + posY + 'em);'
    tick.innerHTML = char;
    face.appendChild(tick);
    
  }
  
}

function analog(){
  
  let second = time.getSeconds();
  let minute = time.getMinutes() + (second / 60);
  let hour = time.getHours() + (minute / 60);
  
  let secondHand = document.getElementById("second");
  let minuteHand = document.getElementById("minute");
  let hourHand = document.getElementById("hour");
  
  let secondDeg = (second * 6) - 90
  let minuteDeg = (minute * 6) - 90
  let hourDeg = (hour * 30) - 90
  
  secondHand.style.transform = 'rotate(' + secondDeg + 'deg)';
  minuteHand.style.transform = 'rotate(' + minuteDeg + 'deg)';
  hourHand.style.transform = 'rotate(' + hourDeg + 'deg)';
  
}

function digital(){
  
  let digital = document.getElementById("digital");
  
  let hour = time.getHours() % 12;
  if(hour == 0) hour = 12;
  if(hour < 10) hour = "0" + hour;
  
  let meridiem = "AM";
  if(time.getHours() >= 12) meridiem = "PM";
  
  let mHour = time.getHours();
  if(mHour < 10) mHour = "0" + mHour;
  
  let minute = time.getMinutes();
  if(minute < 10) minute = "0" + minute;
  
  let second = time.getSeconds();
  if(second < 10) second = "0" + second;
  
  digital.innerHTML = hour + ":" + minute + ":" + second + " " + meridiem;
  
}

function animate(){
  
  for(let i = 0; i < clocks.length; i ++) {
    
    clocks[i].animate();
    
  }
  
}
