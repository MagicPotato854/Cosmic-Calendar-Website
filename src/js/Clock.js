// Variables and Constants

let time = new Date();

const start = Date.now();

let id = setInterval(animate, 10);

// Classes

const clocks = [];

class clock {
  
  constructor(planet, parentId, trim = true /*Speed vs Trim*/) {
    
    // Vars
    
    let hours = planet.len_day;
    
    this.planet = planet;
    
    this.update = true;
    
    this.mult = 24 / hours;
    if(trim) this.mult = 1;
    
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
    this.digitalFace.innerText = '##:##:##';
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
    
    let ttlSec = Math.floor(time[2] * 3600);
    
    let second = ttlSec % 60;
    let minute = (ttlSec / 60) % 60;
    let hour = (ttlSec / 3600);
    
    let secondDeg = (second * 6) - 90;
    let minuteDeg = (minute * 6) - 90;
    let hourDeg = (hour * 30) - 90;
    
    if(this.trim) hourDeg = ((hour / this.planet.len_day) * 360) - 90;
    
    print(this.trim);
    
    // Math for hours
    
    this.secondHand.style.transform = 'rotate(' + secondDeg + 'deg)';
    this.minuteHand.style.transform = 'rotate(' + minuteDeg + 'deg)';
    this.hourHand.style.transform = 'rotate(' + hourDeg + 'deg)';
    
  }
  
  digital(time) {
    
    let ttlSec = Math.floor(time[2] * 3600);
    
    let hour = Math.floor(ttlSec / 3600);
    
    let minute = Math.floor((ttlSec / 60) % 60);
    if(minute < 10) minute = "0" + minute;
    
    let second = ttlSec % 60;
    if(second < 10) second = "0" + second;
    
    this.digitalFace.innerHTML = hour + ":" + minute + ":" + second;
    
  }
  
  animate() {
    
    if(!this.update) return
    
    // Hours since epoch
    let hours = new Date().getTime() / 1000 / 3600 + 17_259_900 - 18.9962336123;
    
    // Time list
    let time = this.planet.convert_in(hours);
    
    this.analog(time);
    this.digital(time);
    
  }
  
}

// Planets

class Planet {
  constructor(name, len_year, len_day) {
    this.name = name;
    this.len_year = len_year;
    this.len_day = len_day;
    this.days_in_year = len_year / len_day;
    this.day_digits = Math.floor(len_day).toString().length;
  }

  convert_in(totalHours) {
    let years = Math.floor(totalHours / this.len_year);
    let remainingHours = totalHours - years * this.len_year;
    let days = Math.floor(remainingHours / this.len_day);
    let finalHours = remainingHours - days * this.len_day;
    return [years, days, finalHours];
  }

  convert_to_hours(local_time) {
    return (
      local_time[0] * this.len_year +
      local_time[1] * this.len_day +
      local_time[2]
    );
  }

  convert_to_planet(time, planet) {
    return planet.convert_in(this.convert_to_hours(time));
  }

  print_time(hours) {
    let local_time = this.convert_in(hours);
    let hour = Math.floor(local_time[2]);
    let minute = Math.floor((local_time[2] % 1) * 60);

    return `${this.name}'s Date: Year ${1 + Math.floor(local_time[0])}, day ${
      1 + Math.floor(local_time[1])
    }, ${hour.toString().padStart(this.day_digits, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  }
}

Mercury = new Planet("Mercury", 2_111.28, 4_223.28);
Venus = new Planet("Venus", 5_392.8, 2_802);
Earth = new Planet("Earth", 8_765.82335025, 24);
Mars = new Planet("Mars", 16_487.4118608, 24.65979);
Jupiter = new Planet("Jupiter", 103_982.16, 10.55);
Saturn = new Planet("Saturn", 258_240.845, 9.933);
Neptune = new Planet("Neptune", 1_444_530.151, 16.1);
Uranus = new Planet("Uranus", 736_449.6, 17.233);

// Functions

function generateFace(radius, offset, hours, unit, face, mult = 1) {
  
  while(hours > 12) {
    hours = hours / 12;
    mult = mult * 12;
  }
  
  for(let i = 0; i < 5 * hours; i++){
    
    let ang = ((i / (5 * hours) ) * (2 * Math.PI)) - (Math.PI / 2);
    
    let posX = (Math.cos(ang) + 1) * (radius)
    let posY = (Math.sin(ang) + 1) * (radius)
    
    let char = '&#x25AA'; // Default dot
    
    if(i % 5 < 0.01) char = ((i / 5) % hours) * mult; // Set to hour every 5 ticks
    if(i == 0) {
      if(char - Math.round(char) > 0.01) char = 0;
      else char = Math.round(hours * mult * 100) / 100; // Last/Total hours
    }
    
    trueAng = ang + (Math.PI) / 2
    
    if(trueAng > Math.PI * 2 - 0.2) { // Too close to first tick
      // Change back to (smaller) tick
      char = '&#x25AA'
    }
    
    if(trueAng < Math.PI * 2 - 0.1) { // Not too close to first tick
      // Ad Tick Elem
      let tick = document.createElement('div');
      tick.style = 'position: absolute; width: 2em; height: 2em; text-align: center; line-height: 2em; left:' + (posX + offset) + unit + '; top:' + (posY + offset) + unit + ';';
      tick.innerHTML = char;
      face.appendChild(tick);
    }
      
  }
  
}

function analog() {
  
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

function animate() {
  
  for(let i = 0; i < clocks.length; i ++) {
    
    clocks[i].animate();
    
  }
  
}
