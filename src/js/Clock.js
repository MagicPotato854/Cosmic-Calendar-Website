// Variables and Constants

let time = new Date();

const start = Date.now();

let id = setInterval(animate, 10);

// Classes

const clocks = [];

class clock {
  
  constructor(hours, offset, parentId, trim /*Speed vs Trim*/) {
    
    // Vars
    
    this.update = true;
    
    this.time = new Date();
    
    this.mult = 24 / hours;
    if(trim) this.mult = 1;
    
    this.offset = offset
    
    this.hourMult = 1;
    if(!trim) this.hourMult = 24 / hours;
    
    // Add HTML
    
    this.parent = document.getElementById(parentId);
    
    this.face = document.createElement('div');
    this.face.className = 'face';
    this.parent.appendChild(this.face);
    
    this.hourHand = document.createElement('div');
    this.hourHand.className = 'hour';
    this.parent.appendChild(this.hourHand);
    
    this.hourHandPoint = document.createElement('div');
    this.hourHandPoint.className = 'point';
    this.hourHand.appendChild(this.hourHandPoint);
    
    this.minuteHand = document.createElement('div');
    this.minuteHand.className = 'minute';
    this.parent.appendChild(this.minuteHand);
    
    this.minuteHandPoint = document.createElement('div');
    this.minuteHandPoint.className = 'point';
    this.minuteHand.appendChild(this.minuteHandPoint);
    
    this.secondHand = document.createElement('div');
    this.secondHand.className = 'second';
    this.parent.appendChild(this.secondHand);
    
    this.secondHandPoint = document.createElement('div');
    this.secondHandPoint.className = 'point';
    this.secondHand.appendChild(this.secondHandPoint);
    this.secondHandPoint.style.backgroundColor = '#FF0000'
    
    this.pin = document.createElement('div');
    this.pin.className = 'pin';
    this.parent.appendChild(this.pin);
    
    this.digitalFace = document.createElement('div');
    this.digitalFace.className = 'digital';
    this.digitalFace.innerText = '##:##:## XX';
    this.parent.appendChild(this.digitalFace);
    
    if(trim) {
      generateFace(15, 0, 12, 'em', this.face, 5);
      generateFace(12, 3, hours, 'em', this.face, 1);
    }
    
    else generateFace(15, 0, 12, 'em', this.face);
    
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
      // Will be replaced with a translator function:
      this.time.setTime((new Date().getTime() * this.mult) + this.offset);
    }
    
    this.analog(this.time);
    this.digital(this.time);
    
  }
  
}

// Functions

function generateFace(radius, offset, hours, unit, face, mult = 1){
  
  while(hours > 24) {
    hours = hours / 24;
    mult = mult * 24;
  }
  
  for(let i = 0; i < 5 * hours; i++){
    
    let ang = ((i / (5 * hours) ) * (2 * Math.PI)) - (Math.PI / 2);
    
    let posX = (Math.cos(ang) + 1) * (radius)
    let posY = (Math.sin(ang) + 1) * (radius)
    
    let char = '&#x25AA';
    
    if(i % 5 < 0.01) char = ((i / 5) % hours) * mult;
    if(i == 0) {
      if(char - Math.round(char) > 0.01) char = 0;
      else char = Math.round(hours * mult);
    }
    
    let tick = document.createElement('div');
    tick.style = 'position: absolute; width: 2em; height: 2em; text-align: center; line-height: 2em; left:' + (posX + offset) + unit + '; top:' + (posY + offset) + unit + ';';
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

function animate(){
  
  for(let i = 0; i < clocks.length; i ++) {
    
    clocks[i].animate();
    
  }
  
}
