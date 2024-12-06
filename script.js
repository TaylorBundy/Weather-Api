// script.js
/*jshint sub:true*/
//creamos variables
let latitud = '';
let longitud = '';
const apikey = "f17c12b6195a949f2f8ea7408141cfa4";
const apikey2 = '7cb84f0ad047435f9d802656240412';
//const url = "https://api.weatherstack.com/current?access_key=" + apikey + "&query=";
//const url = "https://api.weatherstack.com/forecast?access_key=" + apikey + "&query=";
const url = "https://api.weatherstack.com/current?access_key=" + apikey + "&query=";

let resp = '';
let resp2 = '';
let origen = '';
let data = '';
let data2 = '';
let locations = '';
let locations2 = '';
let current = '';
let current2 = '';
let country = '';
let region = '';
//let temp = '';
const weather = document.querySelector('#weather-card');
const ciudad = document.querySelector('#ciudad');
const temp = document.querySelector('#temp');
const description = document.querySelector('#description');
const icon = document.querySelector('#icon');
const pressure = document.querySelector('#pressure');
const precip = document.querySelector('#precip');
const humid = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
const winddir = document.querySelector('#windDir');
const torta = document.querySelector("#xlocalidad");
const provincia = document.querySelector('#provincia');
const ciudades = document.querySelector("#ciudades");
const facebook = document.querySelector('#facebook');
const instagram = document.querySelector('#instagram');
const github = document.querySelector('#github');
//const ciudades2 = document.querySelector("#ciudades").value;
//const contenido = $("#provincia option:selected").text();
const btnobtener = document.querySelector('#btnObtener');
let btnobtener2 = document.getElementById('btnObtener');
const btnlimpiar = document.querySelector('#btnLimpiar');
const btnactualizar = document.querySelector('#btnActualizar');
const mainform = document.querySelector('#MainForm');
let descFinal = '';
let isday = '';
const apiweb = document.querySelector('#ApiWeb');
const apilocal = document.querySelector('#ApiLocal');
//var Animated_GIF = require('gif-transparency');
//module.exports = require('gif-transparency');

//creamos el evento para ordenar las ciudades alfabeticamente
//una vez que seleccionamos una provincia, el listado de ciudades se ordena alfabeticamente
provincia.addEventListener("change", OrdenaCiudades);
apilocal.addEventListener("change", OrdenaCiudades);
//creamos el evento para cuando sellecionamos una ciudad,
//automaticamente obtiene los datos
ciudades.addEventListener("change", obtener);
//ciudades.addEventListener("change",
  //() => {
    //ciudades.addEventListener("change",
    //() => {
      //console.log(ciudades.value);
      //obtener();
      //}
    //)
  //}
//);

//creamos el evento para llamar a la funcion obtener cuando presionamos enter
window.addEventListener("keypress",
  (event) => {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    switch (event.key) {
      case "Enter":
        obtener();
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  },
  true,
);

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;
  //console.log("Tu ubicación actual es:");
  //console.log(`Latitud : ${crd.latitude}`);
  //console.log(`Longitud: ${crd.longitude}`);
  //console.log(`Más o menos ${crd.accuracy} metros.`);
  try {
      //latitud = crd.latitude;
      latitud = '-39.217';
      longitud = '-70.950';
      //longitud = crd.longitude;
      //console.log(latitud + ' - ' + longitud);
  }
  finally {
      obtener2(latitud, longitud);
  }
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

//cuando termina de cargar la pagina, obtenemos ubicacion
window.onload = function() {
    try {
      document.querySelector('#provincia').selectedIndex = 0;
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
    finally {
      //
    }
};

//creamos la funcion para ordenar alfabeticamente la lista de ciudades
function OrdenaCiudades() {
  var my_options = $("#ciudades option");
  my_options.sort(function(a,b) {
      if (a.text > b.text) return 1;
      else if (a.text < b.text) return -1;
      else return 0;
  });
  setTimeout(function() {
    try {
      //$("#ciudades").empty().append(my_options).selectpicker("refresh");
      $("#ciudades").empty().append(my_options);
    }
    finally {
      if (apiweb.checked) {
        document.querySelector("#ciudades").selectedIndex = 0;
      } else if (apilocal.checked) {
        document.querySelector("#ciudades").selectedIndex = 1;
        obtener();
      }
    }
  }, 100);
}

//creamos funcion para poner titulos
function Titulos() {
  if (btnobtener.onmouseover) {
    btnobtener.title = 'Obtener información del clima';
  }
  if (btnactualizar.onmouseover) {
    btnactualizar.title = 'Actualizar información del clima';
  }
  if (btnlimpiar.onmouseover) {
    btnlimpiar.title = 'Limpiar datos de los campos';
  }
  if (provincia.onmouseover) {
    provincia.title = 'Seleccione una provincia de la lista!';
  }
  if (ciudades.onmouseover) {
    ciudades.title = 'Seleccione una ciudad de la lista,\nLuego presiones "ENTER"';
  }
  if (facebook.onmouseover) {
    facebook.title = 'Ir a Facebook de Taylor Bundy';
  }
  if (instagram.onmouseover) {
    instagram.title = 'Ir a Instagram de Taylor Bundy';
  }
  if (github.onmouseover) {
    github.title = 'Ir a los repositorios de GitHub de Taylor Bundy';
  }
}

// Objeto con provincias y sus ciudades
const provinciasCiudades = {
    "Buenos Aires": ["La Plata", "Mar del Plata", "Bahía Blanca", "Tandil", "Necochea"],
    "CABA": ["Buenos Aires", "Balvanera", "Recoleta", "Villa del Parque", "Almagro"],
    "Córdoba": ["Córdoba Capital", "Villa María", "Río Cuarto", "Carlos Paz", "Alta Gracia"],
    "Mendoza": ["Mendoza Capital", "San Rafael", "Godoy Cruz", "Maipú", "Luján de Cuyo"],
    "Misiones": ["Posadas"],
    "Neuquen": ["Neuquen", "San Martín de los Andes", "Villa La Angostura",
        "Plottier", "Centenario", "Cutral Có", "Zapala", "Rincón de los Sauces", "Chos Malal",
        "Junín de los Andes", "Añelo", "El Huecú", "Loncopué", "Picún Leufú", "Piedra del Águila",
        "Villa Pehuenia", "Alumine", "Caviahue-Copahue", "Andacollo", "Las Lajas", "Huinganco",
        "Senillosa", "Vista Alegre", "Mariano Moreno", "Bajada del Agrio", "Villa Traful", "Los Miches",
        "Varvarco", "Manzano Amargo", "Taquimilán", "Las Ovejas", "Tricao Malal", "Barrancas",
        "Buta Ranquil", "Paso Aguerre", "Chorriaca", "Pilo Lil", "El Sauce", "Nahueve",
        "Villa del Puente Picún Leufú", ],
    "Tucumán": ["San Miguel de Tucumán", "Concepción", "Tafí Viejo", "Monteros", "Yerba Buena"]
    // Agrega más provincias y ciudades según sea necesario
};

// Obtener los elementos del DOM
//const provinciasSelect = document.getElementById("provincias");
const provinciasSelect = document.getElementById("provincias");
const ciudadesSelect = document.getElementById("ciudades");

// Función para actualizar el menú de ciudades según la provincia seleccionada
function actualizarCiudades() {
    // Obtener la provincia seleccionada
    const provinciaSeleccionada = provinciasSelect.value;

    // Limpiar las opciones anteriores de ciudades
    ciudadesSelect.innerHTML = '<option value="">Seleccione una ciudad</option>';

    // Habilitar el select de ciudades solo si hay una provincia seleccionada
    if (provinciaSeleccionada) {
        // Obtener las ciudades correspondientes a la provincia seleccionada
        const ciudades = provinciasCiudades[provinciaSeleccionada];

        // Agregar las ciudades al select de ciudades
        ciudades.forEach(ciudad => {
            const option = document.createElement("option");
            option.value = ciudad;
            option.textContent = ciudad;
            ciudadesSelect.appendChild(option);
        });

        // Habilitar el select de ciudades
        ciudadesSelect.disabled = false;
    } else {
        // Si no se selecciona una provincia, deshabilitar el select de ciudades
        ciudadesSelect.disabled = true;
    }
}

// Agregar un listener al select de provincias para detectar cambios
//provinciasSelect.addEventListener("change", actualizarCiudades);

//apilocal.addEventListener("click",
  //() => {
    //document.querySelector("#provincia").selectedIndex = 14;
    //document.querySelector("#ciudades").disabled = false;
  //}
//);

//const querystring = {"query":"New York"};

//creamos la funcion para obtener los datos del clima
async function obtener() {
  //torta.value = torta.textContent;
  //console.log(torta.value);
  var sinacento = ciudadesSelect.value;
  //console.log(sinacento.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
  //origen = url + ciudadesSelect.value + ', ' + torta.value + ', Argentina';
  /* if (apiweb.checked) {
    origen = url + sinacento.normalize("NFD").replace(/[\u0300-\u036f]/g, "") + ', ' + torta.value + ', Argentina';
    var locacion = "location";
    var curent = "current";
  } else if (apilocal.checked) {
    origen = 'https://api.weather.com/v2/pws/observations/current?stationId=IALUMI7&format=json&units=e&apiKey=a781055ea4224f7b81055ea4224f7b78';
    var locacion = "observations";
    var curent = "imperial"["temp"];
    var name = locacion["neighborhood"];
  } */
  //const url1 = 'https://api.worldweatheronline.com/premium/v1/weather.ashx?key=' + apikey2 + '&q=' + sinacento.normalize("NFD").replace(/[\u0300-\u036f]/g, "") + ', ' + torta.value + '&format=json&num_of_days=1&includelocation=yes&showlocaltime=yes&lang=es';
const url1 = 'https://api.worldweatheronline.com/premium/v1/weather.ashx?key=' + apikey2 + '&q=' + sinacento.normalize("NFD").replace(/[\u0300-\u036f]/g, "") + ', ' + torta.value + '&format=json&num_of_days=1&mca=no&fx=no&includelocation=no&showlocaltime=yes&lang=es';
  //const url2 = 'https://api.weather.com/v2/pws/observations/current?stationId=IALUMI7&format=json&units=e&apiKey=a781055ea4224f7b81055ea4224f7b78';
  try {
    if (apiweb.checked) {
      origen = url + sinacento.normalize("NFD").replace(/[\u0300-\u036f]/g, "") + ', ' + torta.value + ', Argentina';
      //var locacion = "location";
      //var curent = "current";
      resp = await fetch(origen);
      data = await resp.json();
      locations = await data["location"];
      current = await data["current"];
      resp2 = await fetch(url1);
      data2 = await resp2.json();
      locations2 = await data2["data"];
      current2 = await locations2["current_condition"][0];
      //console.log(current2);
      //console.log(current2.temp_C);
      //console.log(current2.windspeedKmph);
      //console.log(current2.pressure);
      //console.log(current2.precipMM);
      //console.log(current2.humidity);
      //console.log(current2.FeelsLikeC);
    } else if (apilocal.checked) {
      origen = 'https://api.weather.com/v2/pws/observations/current?stationId=IALUMI7&format=json&units=e&apiKey=a781055ea4224f7b81055ea4224f7b78';
      //var locacion = "observations";
      //var curent = "imperial"["temp"];
      //var name = locacion["neighborhood"];
      resp = await fetch(origen);
      data = await resp.json();
      locations = await data["observations"][0];
      //console.log(locations);
      console.log(data);
      current = await locations["imperial"]["temp"];
      //console.log(current);
    }
    //resp = await fetch(origen);
    
    
    //const resp3 = await fetch(url2);
    
    //data = await resp.json();
    
    //const data2 = await resp2.json();
    //const data3 = await resp3.json();
    //var coco = data3["observations"][0];
    //var tempo = coco["imperial"]["temp"];
    //console.log(data);
    //console.log((tempo -32) / 1.8);
    //data = await resp.text();
    //const result = await resp.text();

    //locations = await data["location"];
    //locations = await data[locacion];

    //current = await data["current"];
    //current = await data[curent];
    

    //console.log(current);
    //console.log(current.weather_descriptions[0]);
    //console.log(ciudades2);
    //console.log(data);
    //console.log(current);
    //console.log(origen);
    //console.log(locations.name);
    //console.log(ciudad.textContent);
  }
  finally {
    if (apiweb.checked) {
      weather.style.display = 'block';
      //ciudad.textContent = locations.name + ', ' + locations.region + ', ' + locations.country;
      ciudad.textContent = locations2["request"][0].query;
      //temp.textContent = current.temperature + '°C';
      temp.textContent = current2.temp_C + '°C';      
      description.textContent = current2["weatherDesc"][0].value;
      descFinal = description.textContent.trim();
      //descFinal = description.textContent;
      //isday = current.is_day;
      humid.textContent = 'Humedad: ' + current2.humidity + ' %';
      pressure.textContent = 'Presión: ' + current2.pressure + ' mb';
      precip.textContent = 'Precipitación: ' + current2.precipMM + ' mm';
      wind.textContent = 'Viento: ' + current2.windspeedKmph + ' kmph';
      winddir.textContent = 'Direcc Viento: ' + current2.winddir16Point;
    } else if (apilocal.checked) {
      weather.style.display = 'block';
      //ciudad.textContent = locations.neighborhood + ', ' + locations.region + ', ' + locations.country;
      ciudad.textContent = locations.neighborhood + ', ' + torta.value + ', ' + locations.country;
      var tempC = (current - 32) / 1.8;
      temp.textContent = tempC.toFixed(1) + '°C';
      var presi = locations["imperial"].pressure;
      //icon.src = current.weather_icons[0];
      //icon.src = 'Imagenes/weather_icon_full_sun.svg';
      //description.textContent = current.weather_descriptions[0];
      descFinal = description.textContent.trim();
      //descFinal = description.textContent;
      isday = current.is_day;
      humid.textContent = 'Humedad: ' + locations.humidity + ' %';
      //pressure.textContent = 'Presión: ' + locations["imperial"].pressure + ' mb';
      pressure.textContent = 'Presión: ' + (presi * 33.8637526).toFixed(2) + ' mb';
      precip.textContent = 'Precipitación: ' + locations["imperial"].precipTotal + ' mm';
      wind.textContent = 'Viento: ' + locations["imperial"].windSpeed + ' kmph';
      //winddir.textContent = 'Direcc Viento: ' + current.wind_dir;
    }
    //console.log(descFinal);
    //if (description.textContent = 'Clear') {
    if (descFinal == 'Clear') {
      if (isday != 'no') {
        icon.src = 'Imagenes/sol.gif';        
      } else {
        icon.src = 'Imagenes/noche.gif';
      }
      description.textContent = 'Despejado';
    } else if (descFinal == 'Sunny') {
      icon.src = 'Imagenes/sol.gif';
      description.textContent = 'Soleado';
    } else if (descFinal == 'Partly Cloudy' || descFinal == 'Partly cloudy') {
      if (isday != 'no') {
        icon.src = 'Imagenes/nublado-parcial.gif';
      } else {
        icon.src = 'Imagenes/noche-nublada.gif';
      }
      description.textContent = 'Parcialmente nublado';
    } else if (descFinal == 'Patchy rain nearby') {
      if (isday != 'no') {
        icon.src = 'Imagenes/lluvia-dispersa.gif';
      } else {
        icon.src = 'Imagenes/llovizna.gif';
      }
      description.textContent = 'Lluvia dispersa cerca';
    } else if (descFinal == 'Patchy light drizzle') {
      icon.src = 'Imagenes/lluvia-dispersa.gif';
      description.textContent = 'Llovizna ligera dispersa';
    } else if (descFinal == 'Light rain') {
      icon.src = 'Imagenes/lluvia-dispersa.gif';
      description.textContent = 'Llovizna ligera';
    } else if (descFinal == 'Moderate snow') {
      icon.src = 'Imagenes/nieve-moderada.gif';
      description.textContent = 'Nieve moderada';
    } else if (descFinal == 'Light snow') {
      icon.src = 'Imagenes/nieve-liviana.gif';
      description.textContent = 'Nieve ligera';
    } else if (descFinal == 'Moderate or heavy snow showers') {
      icon.src = 'Imagenes/nieve-moderada-2.gif';
      description.textContent = 'Chubascos de nieve moderados o fuertes';
    } else if (descFinal == 'Heavy snow') {
      icon.src = 'Imagenes/nieve-heavy.gif';
      description.textContent = 'Mucha nieve';
    } else if (descFinal == 'Overcast' || descFinal == 'Cloudy') {
      icon.src = 'Imagenes/nublado.gif';
      description.textContent = 'Nublado';
    } else if (descFinal == 'Freezing fog') {
      icon.src = 'Imagenes/neblinoso.gif';
      description.textContent = 'Niebla helada';
    }
    //pressure.textContent = 'Presión: ' + current.pressure + ' mb';
    //precip.textContent = 'Precipitación: ' + current.precip + ' mm';
    //wind.textContent = 'Viento: ' + current.wind_speed + ' kmph';
    //winddir.textContent = 'Direcc Viento: ' + current.wind_dir;
    //humid.textContent = 'Humedad: ' + current.humidity + ' %';
  }
}

//creamos la funcion para obtener los datos del clima posicion actual
async function obtener2(lat, long) {
  //origen = url + ciudadesSelect.value + ', ' + provinciasSelect.value + ', Argentina';
  origen = url + lat + ',' + long;
  const url1 = 'https://api.worldweatheronline.com/premium/v1/weather.ashx?key=' + apikey2 + '&q=' + lat + ',' + long + '&format=json&num_of_days=1&mca=no&fx=no&includelocation=no&showlocaltime=yes&lang=es';
  try {
    resp = await fetch(origen);
    data = await resp.json();
    resp2 = await fetch(url1);
    data2 = await resp2.json();
    locations = await data["location"];
    current = await data["current"];
    locations2 = await data2["data"];
    current2 = await locations2["current_condition"][0];
    //console.log(current.weather_descriptions[0]);
    //console.log(resp);
    //console.log(data2);
    //console.log(origen);
    //console.log(locations.name);
    //console.log(ciudad.textContent);
  }
  finally {
    weather.style.display = 'block';
    /* ciudad.textContent = locations.name + ', ' + locations.region + ', ' + locations.country;
    temp.textContent = current.temperature + '°C';
    //icon.src = current.weather_icons[0];
    description.textContent = current.weather_descriptions[0];
    descFinal = description.textContent.trim();
    isday = current.is_day; */

    ciudad.textContent = locations2["request"][0].query;
    //temp.textContent = current.temperature + '°C';
    temp.textContent = current2.temp_C + '°C';      
    description.textContent = current2["weatherDesc"][0].value;
    descFinal = description.textContent.trim();
    //descFinal = description.textContent;
    //isday = current.is_day;
    humid.textContent = 'Humedad: ' + current2.humidity + ' %';
    pressure.textContent = 'Presión: ' + current2.pressure + ' mb';
    precip.textContent = 'Precipitación: ' + current2.precipMM + ' mm';
    wind.textContent = 'Viento: ' + current2.windspeedKmph + ' kmph';
    winddir.textContent = 'Direcc Viento: ' + current2.winddir16Point;

    //console.log(isday);
    if (descFinal == 'Clear') {
      if (isday != 'no') {
        icon.src = 'Imagenes/sol.gif';        
      } else {
        icon.src = 'Imagenes/noche.gif';
      }
      description.textContent = 'Despejado';
    } else if (descFinal == 'Sunny') {
      icon.src = 'Imagenes/sol.gif';
      description.textContent = 'Soleado';
    } else if (descFinal == 'Partly Cloudy' || descFinal == 'Partly cloudy') {
      if (isday != 'no') {
        icon.src = 'Imagenes/nublado-parcial.gif';
      } else {
        icon.src = 'Imagenes/noche-nublada.gif';
      }
      description.textContent = 'Parcialmente nublado';
    } else if (descFinal == 'Patchy rain nearby') {
      if (isday != 'no') {
        icon.src = 'Imagenes/lluvia-dispersa.gif';
      } else {
        icon.src = 'Imagenes/llovizna.gif';
      }
      description.textContent = 'Lluvia dispersa cerca';
    } else if (descFinal == 'Patchy light drizzle') {
      icon.src = 'Imagenes/lluvia-dispersa.gif';
      description.textContent = 'Llovizna ligera dispersa';
    } else if (descFinal == 'Light rain') {
      icon.src = 'Imagenes/lluvia-dispersa.gif';
      description.textContent = 'Llovizna ligera';
    } else if (descFinal == 'Moderate snow') {
      icon.src = 'Imagenes/nieve-moderada.gif';
      description.textContent = 'Nieve moderada';
    } else if (descFinal == 'Light snow') {
      icon.src = 'Imagenes/nieve-liviana.gif';
      description.textContent = 'Nieve ligera';
    } else if (descFinal == 'Moderate or heavy snow showers') {
      icon.src = 'Imagenes/nieve-moderada-2.gif';
      description.textContent = 'Chubascos de nieve moderados o fuertes';
    } else if (descFinal == 'Heavy snow') {
      icon.src = 'Imagenes/nieve-heavy.gif';
      description.textContent = 'Mucha nieve';
    } else if (descFinal == 'Overcast' || descFinal == 'Cloudy') {
      icon.src = 'Imagenes/nublado.gif';
      description.textContent = 'Nublado';
    } else if (descFinal == 'Freezing fog') {
      icon.src = 'Imagenes/neblinoso.gif';
      description.textContent = 'Niebla helada';
    }
    /* pressure.textContent = 'Presión: ' + current.pressure + ' mb';
    precip.textContent = 'Precipitación: ' + current.precip + ' mm';
    wind.textContent = 'Viento: ' + current.wind_speed + ' kmph';
    winddir.textContent = 'Direcc Viento: ' + current.wind_dir;
    humid.textContent = 'Humedad: ' + current.humidity + ' %'; */
  }
}

function valores() {
  //var contenidos = document.getElementById('provincia');
  //var chucha = document.querySelector('#xlocalidad');
  console.log(torta.value);
}