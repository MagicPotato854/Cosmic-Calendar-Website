
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

// Create Planet Objects
// Planets
Mercury = new Planet("Mercury", 2_111.28, 4_223.28);
Venus = new Planet("Venus", 5_392.8, 2_802);
Earth = new Planet("Earth", 8_765.82335025, 24);
Mars = new Planet("Mars", 16_487.4118608, 24.65979);
Jupiter = new Planet("Jupiter", 103_982.16, 10.55);
Saturn = new Planet("Saturn", 258_240.845, 9.933);
Uranus = new Planet("Uranus", 736_449.6, 17.233);
Neptune = new Planet("Neptune", 1_444_530.151, 16.1);

// Dwarf Planets
Pluto = new Planet("Pluto", 2_183_561.195452403, 153.36);
Makemake = new Planet("Makemake", 2_685_975.641845082, 22.8266);

// Moons
Moon = new Planet("Moon", 8765.813, 708.734);
Europa = new Planet("Europa", 103_982.16, 85.2);
Titan = new Planet("Titan", 103_982.16, 382.8);
// Asteroids
Ceres = new Planet("Ceres", 40_398.19866, 9.07417);
Vesta = new Planet("Vesta", 31_809.9733898, 5.34212766);
Pallas = new Planet("Pallas", 40_418.0056554, 7.8132214);

const planets = [
  // Planets
  Mercury,
  Venus,
  Earth,
  Mars,
  Jupiter,
  Saturn,
  Uranus,
  Neptune,

  // Dwarf Planets
  Pluto,
  Makemake,

  // Moons
  Moon,
  Europa,
  Titan,
  
  // Asteroids
  Ceres,
  Vesta,
  Pallas,
];