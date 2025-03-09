"use strict";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
    this.calcPace();
  }
}
class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
  }
  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.calSpeed();
  }
  calSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Running([-4, 35], 10, 5, 10);
console.log(run1);
class App {
  _workouts = [];
  _map;
  _mapEvent;
  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleField);
  }
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const cords = [latitude, longitude];
    this._map = L.map("map").setView(cords, 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this._map);
    this._map.on("click", this._showForm.bind(this));
  }
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Ошибка");
        }
      );
    }
  }
  _showForm(mapE) {
    this._mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }
  _newWorkout(e) {
    e.preventDefault();
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this._mapEvent.latlng;
    let workout;
    const validInputs = (...inpts) =>
      inpts.every((inp) => Number.isFinite(inp));
    const allPositive = (...inpts) => inpts.every((inp) => inp > 0);
    if (type === "running") {
      const cadence = +inputCadence.value;
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        return alert("Вы ввели неверное значение");
      }
      workout = new Running([lat, lng], distance, duration, cadence);
    }
    if (type === "cycling") {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      ) {
        return alert("Вы ввели неверное значение");
      }
      workout = new Running([lat, lng], distance, duration, cadence);
    }
    this._workouts.push(workout);
    console.log(this._workouts);

    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";
    this.renderWorkMarke(workout);
  }
  renderWorkMarke(workout) {
    L.marker(workout.coords)
      .addTo(this._map)
      .bindPopup(
        L.popup({
          className: "mark-popup",
          closeOnClick: false,
          autoClose: false,
        })
      )
      .setPopupContent("gg")
      .openPopup();
  }
  _toggleField() {
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  }
}
const app = new App();
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function(position) {
//     console.log(position)
//     const {latitude} = position.coords
//     const {longitude} = position.coords
//     const cords = [latitude, longitude]
//     map = L.map('map').setView(cords, 13);
//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);

//   map.on('click', function(mapE) {
//     mapEvent = mapE
//     form.classList.remove('hidden')
//     inputDistance.focus()

//   })
//   }, function() {
//     alert('Ошибка')
//   })
// }
// form.addEventListener('submit', function(e) {
//   e.preventDefault()
//   inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value  = ''
//   const {lat, lng} = mapEvent.latlng
//     L.marker([lat,lng]).addTo(map)
//     .bindPopup(L.popup({className: 'mark-popup', closeOnClick: false, autoClose: false})).setPopupContent('gg')
//     .openPopup();
// })
// inputType.addEventListener('change', function() {
//   inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
//   inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
// })
