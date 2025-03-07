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
let map;
let mapEvent;
const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

class App {
  _map;
  _mapEvent;
  constructor() {
    this._getPosition()
    form.addEventListener('submit', this._newWorkout.bind(this)) 
    inputType.addEventListener('change', this._toggleField)
  }
  _loadMap(position) {
      const {latitude} = position.coords
      const {longitude} = position.coords
      const cords = [latitude, longitude]
      this._map = L.map('map').setView(cords, 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this._map);
    this._map.on('click', this._showForm.bind(this))
  }
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function() {
        alert('Ошибка')
      })
    }
  }
  _showForm(mapE) {
    this._mapEvent = mapE
      form.classList.remove('hidden')
      inputDistance.focus()
  }
  _newWorkout(e) {
      e.preventDefault()
      inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value  = ''
      const {lat, lng} = this._mapEvent.latlng
        L.marker([lat,lng]).addTo(this._map)
        .bindPopup(L.popup({className: 'mark-popup', closeOnClick: false, autoClose: false})).setPopupContent('gg')
        .openPopup();
  }
  _toggleField() { 
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
  }
}
const app = new App()
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