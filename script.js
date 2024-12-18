//creamos variables
let latitud = '';
let longitud = '';
const apikey = "f17c12b6195a949f2f8ea7408141cfa4";
const apikey2 = '7cb84f0ad047435f9d802656240412';
const url = "https://api.weatherstack.com/current?access_key=" + apikey + "&query=";

let resp = '';
let resp2 = '';
let resp3 = '';
let origen = '';
let origen1 = '';
let origen2 = '';
let data = '';
let data2 = '';
let data3 = '';
let locations = '';
let locations2 = '';
let locations4 = '';
let current = '';
let current2 = '';
let current3 = '';
let current4 = '';
let country = '';
let region = '';
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
const btnobtener = document.querySelector('#btnObtener');
//let btnobtener2 = document.getElementById('btnObtener');
const btnactualizar = document.querySelector('#btnActualizar');
const mainform = document.querySelector('#MainForm');
let descFinal = '';
let descFinal1 = '';
let descFinal2 = '';
let descFinal3 = '';
let descFinal4 = '';
let descFinal5 = '';
let descFinalx = [];
let isday = '';
let fechas = [];
const apiweb = document.querySelector('#ApiWeb');
const apilocal = document.querySelector('#ApiLocal');
const dia1 = document.querySelector('#Dia1');
const dia2 = document.querySelector('#Dia2');
const dia3 = document.querySelector('#Dia3');
const dia4 = document.querySelector('#Dia4');
const dia5 = document.querySelector('#Dia5');
const tempd1 = document.querySelector('#Temp-D1');
const tempd2 = document.querySelector('#Temp-D2');
const tempd3 = document.querySelector('#Temp-D3');
const tempd4 = document.querySelector('#Temp-D4');
const tempd5 = document.querySelector('#Temp-D5');
const icond1 = document.querySelector('#Icon-D1');
const icond2 = document.querySelector('#Icon-D2');
const icond3 = document.querySelector('#Icon-D3');
const icond4 = document.querySelector('#Icon-D4');
const icond5 = document.querySelector('#Icon-D5');

const allicon = document.querySelectorAll('img.IconForecast');
const allday = document.querySelectorAll('p.DayForecast');
const alltemp = document.querySelectorAll('#AllForecast .day p.temp');
let toto = '';
let days = [];

//definimos constante plataforma
const plataforma = navigator.userAgent;

//creamos el evento para ordenar las ciudades alfabeticamente
//una vez que seleccionamos una provincia, el listado de ciudades se ordena alfabeticamente
provincia.addEventListener("change", OrdenaCiudades);
apilocal.addEventListener("change", OrdenaCiudades);
//creamos el evento para cuando sellecionamos una ciudad,
//automaticamente obtiene los datos
ciudades.addEventListener("change", obtener);

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
  try {
      latitud = crd.latitude;
      //latitud = '-39.217';
      //longitud = '-70.950';
      longitud = crd.longitude;
  }
  finally {
      obtener2(latitud, longitud);
  }
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

let HourTime = '';
let Horas = '';
let Minutos = '';
let isDayTime = '';
//cuando termina de cargar la pagina, obtenemos ubicacion
window.onload = function() {
    try {
      document.querySelector('#provincia').selectedIndex = 0;
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
    finally {
      let DiaActual = 0;
      days = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
      const date = new Date();

      let day = days[date.getDay()];
      DiaActual = days.indexOf(day);
      var iterator = days.values();

      HourTime = date.toLocaleString('es-ES', { hour: 'numeric', minute: 'numeric', hour24: true });
      Horas = date.toLocaleString('es-ES', { hour: 'numeric', hour24: true });
      Minutos = date.toLocaleString('es-ES', { minute: 'numeric', hour24: true });

      if (HourTime.includes('AM')) {
        HourTime = HourTime.replace('AM', '');
      } else if (HourTime.includes('PM')) {
        HourTime = HourTime.replace('PM', '');
      }

      isDayTime = Horas >= 6 && Horas < 20;

      if (DiaActual == 1) {
        iterator.next();
        iterator.next();
        dia1.textContent = iterator.next().value.slice(0,3);
        dia2.textContent = iterator.next().value.slice(0,3);
        dia3.textContent = iterator.next().value.slice(0,3);
        dia4.textContent = iterator.next().value.slice(0,3);
        dia5.textContent = iterator.next().value.slice(0,3);
      } else if (DiaActual == 2) {
        iterator.next();
        iterator.next();
        iterator.next();
        dia1.textContent = iterator.next().value.slice(0,3);
        dia2.textContent = iterator.next().value.slice(0,3);
        dia3.textContent = iterator.next().value.slice(0,3);
        dia4.textContent = iterator.next().value.slice(0,3);
        dia5.textContent = days[0].slice(0,3);
      } else if (DiaActual == 3) {
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();
        dia1.textContent = iterator.next().value.slice(0,3);
        dia2.textContent = iterator.next().value.slice(0,3);
        dia3.textContent = iterator.next().value.slice(0,3);
        dia4.textContent = days[0].slice(0,3);
        dia5.textContent = days[1].slice(0,3);
      } else if (DiaActual == 4) {
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();
        dia1.textContent = iterator.next().value.slice(0,3);
        dia2.textContent = iterator.next().value.slice(0,3);
        dia3.textContent = days[0].slice(0,3);
        dia4.textContent = days[1].slice(0,3);
        dia5.textContent = days[2].slice(0,3);
      } else if (DiaActual == 5) {
        iterator.next().value;
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();
        iterator.next();
        dia1.textContent = iterator.next().value.slice(0,3);
        dia2.textContent = days[0].slice(0,3);
        dia3.textContent = days[1].slice(0,3);
        dia4.textContent = days[2].slice(0,3);
        dia5.textContent = days[3].slice(0,3);
      } else if (DiaActual == 6) {
        dia1.textContent = days[0].slice(0,3);
        dia2.textContent = days[1].slice(0,3);
        dia3.textContent = days[2].slice(0,3);
        dia4.textContent = days[3].slice(0,3);
        dia5.textContent = days[4].slice(0,3);
      } else if (DiaActual == 0) {
        dia1.textContent = days[1].slice(0,3);
        dia2.textContent = days[2].slice(0,3);
        dia3.textContent = days[3].slice(0,3);
        dia4.textContent = days[4].slice(0,3);
        dia5.textContent = days[5].slice(0,3);
      }
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
      $("#ciudades").empty().append(my_options);
    }
    finally {
      if (apiweb.checked) {
        document.querySelector("#ciudades").selectedIndex = 0;
      } else if (apilocal.checked) {
        document.querySelector("#ciudades").selectedIndex = 1;
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
// Obtener los elementos del DOM
//const provinciasSelect = document.getElementById("provincias");
//const provinciasSelect = document.getElementById("provincias");
const ciudadesSelect = document.getElementById("ciudades");

const despejado = 'Imagenes/despejado.svg';
const sol = 'Imagenes/sol.svg';
const nochedespejada = 'Imagenes/noche.svg';
const nubladoparcial = 'Imagenes/nublado-parcial.svg';
const nochenubladoparcial = 'Imagenes/nublado-parcial-noche.svg';
const nublado = 'Imagenes/nublado.svg';
const nochenublada = 'Imagenes/nublado-noche.svg';
const lluviahelada = 'Imagenes/lluvia-helada.svg';
const nochelluviahelada = 'Imagenes/lluvia-helada-noche.svg';
const llovizna = 'Imagenes/llovizna.svg';
const nochellovizna = 'Imagenes/llovizna-noche.svg';
const lluviadispersa = 'Imagenes/lluvia-dispersa.svg';
const nochelluviadispersa = 'Imagenes/lluvia-dispersa-noche.svg';
const lluvialigera = 'Imagenes/lluvia-ligera.svg';
const nochelluvialigera = 'Imagenes/lluvia-ligera-noche.svg';
const neblinoso = 'Imagenes/neblinoso.svg';
const nocheneblinoso = 'Imagenes/neblinoso-noche.svg';
const neblina = 'Imagenes/neblina.svg';
const nocheneblina = 'Imagenes/neblina-noche.svg';
const nievemoderada = 'Imagenes/nieve-moderada.svg';
const nochenievemoderada = 'Imagenes/nieve-moderada-noche.svg';
const nieveheavy = 'Imagenes/nieve-heavy.svg';
const nochenieveheavy = 'Imagenes/nieve-heavy-noche.svg';
const nieveliviana = 'Imagenes/nieve-liviana.svg';
const nochenieveliviana = 'Imagenes/nieve-liviana-noche.svg';
const tormenta = 'Imagenes/tormenta.svg';
const tormentas = 'Imagenes/tormentas-2.svg';
const nochetormenta = 'Imagenes/tormenta-noche.svg';
const formaciontormenta = 'Imagenes/formacion-tormenta.svg';
//const nievemoderada2 = 'Imagenes/nieve-moderada-2.gif';

let salesol = '';
let puestasol = '';
let presi = '';
let final = '';
let final1 = '';
let narr = '';
let maxfinal = '';
let minfinal = '';
let tempC = '';

//creamos funcion que actualiza datos
function Actualiza() {
  if (ciudad.textContent.includes('Lat')) {
    obtener2(latitud, longitud);
  } else {
    obtener();
  }
};

//creamos la funcion para obtener los datos del clima
async function obtener() {
  var sinacento = ciudadesSelect.value;
  const url1 = 'https://api.worldweatheronline.com/premium/v1/weather.ashx?key=' + apikey2 + '&q=' + sinacento.normalize("NFD").replace(/[\u0300-\u036f]/g, "") + ',' + torta.value + '&format=json&num_of_days=6&mca=no&fx=yes&includelocation=no&showlocaltime=yes&lang=es';
  try {
    if (apiweb.checked) {
      origen = url + sinacento.normalize("NFD").replace(/[\u0300-\u036f]/g, "") + ', ' + torta.value + ', Argentina';
      data2 = await obtenerDatosApi(url1);
      locations2 = await data2["data"];
      current2 = await locations2["current_condition"][0];
      current3 = await locations2["weather"];
      console.log(data2);
    } else if (apilocal.checked) {
      document.querySelector("#ciudades").selectedIndex = 1;
      origen = 'https://api.weather.com/v2/pws/observations/current?stationId=IALUMI7&format=json&units=e&apiKey=a781055ea4224f7b81055ea4224f7b78';
      origen1 = 'https://api.weather.com/v2/pws/dailysummary/7day?stationId=IALUMI7&format=json&units=m&apiKey=a781055ea4224f7b81055ea4224f7b78';
      origen2 = 'https://api.weather.com/v3/wx/forecast/daily/5day?geocode=-38.88,-71.19&format=json&units=m&language=es-AR&apiKey=a781055ea4224f7b81055ea4224f7b78';
      const options = {
        headers:{
          'Accept-Encoding' : 'gzip'
        }
      };
      resp = await fetch(origen, options);
      data = await resp.json();
      resp2 = await fetch(origen1, options);
      data2 = await resp2.json();
      resp3 = await fetch(origen2, options);
      data3 = await resp3.json();
      console.log(data2);
      console.log(data3);
      locations = await data["observations"][0];
      current = await locations["imperial"]["temp"];
      locations2 = data2["summaries"];
      current2 = locations2[0]["metric"].tempAvg;
      locations4 = await data3['dayOfWeek'];
      current3 = await data3['calendarDayTemperatureMax'];
      descFinal = await data3['narrative'];
    }
  }
  finally {
    if (apiweb.checked) {
      weather.style.display = 'block';
      ciudad.textContent = locations2["request"][0].query;
      temp.textContent = current2.temp_C + '°C';
      temp.title = 'Sensación Térmica: ' + current2.FeelsLikeC + '°C';
      description.textContent = current2["weatherDesc"][0].value;
      descFinal = description.textContent.trim();

      try {
        descFinalx = [];
      }
      finally {
        for (let c = 1; c < current3.length; c++) {
          descFinalx.push(current3[c].hourly[4]["weatherDesc"][0].value.trim());
        }
      }

      try {
        fechas = [];
      }
      finally {
        for (let c = 1; c < current3.length; c++) {
          fechas.push(current3[c].date);
        }
      }

      salesol = current3[0]["astronomy"][0].sunrise;
      puestasol = current3[0]["astronomy"][0].sunset;

      if (salesol.includes('AM')) {
        salesol = salesol.replace('AM', '');
      } else if (salesol.includes('PM')) {
        salesol = salesol.replace('PM', '');
      }

      if (puestasol.includes('AM')) {
        puestasol = puestasol.replace('AM', '');
      } else if (puestasol.includes('PM')) {
        puestasol = puestasol.replace('PM', '');
      }

      const horasPuestaSol = convertirAMinutos(puestasol, 'puestasol');
      //const horasSaleSol = convertirAMinutos(salesol, 'salesol');

      if (Horas > horasPuestaSol || Horas == 0 || Horas < 6) {
        isday = 'no';
      } else {
        isday = 'si';
      }

      humid.textContent = 'Humedad: ' + current2.humidity + ' %';
      pressure.textContent = 'Presión: ' + current2.pressure + ' mb';
      precip.textContent = 'Precipitación: ' + current2.precipMM + ' mm';
      wind.textContent = 'Viento: ' + current2.windspeedKmph + ' kmph';
      winddir.textContent = 'Direcc Viento: ' + current2.winddir16Point;

      for (let f = 1; f < current3.length; f++) {
        alltemp[f-1].textContent = current3[f].maxtempC + '°C';
        alltemp[f-1].title = 'Se esperan temperaturas máximas de ' + current3[f].maxtempC + '°C y minimas de ' + current3[f].mintempC + '°C';
      }

      IconosWeb();
      IconosWebExt();

    } else if (apilocal.checked) {
      weather.style.display = 'block';
      ciudad.textContent = locations.neighborhood + ', ' + torta.value + ', ' + locations.country;
      tempC = (current - 32) / 1.8;
      temp.textContent = tempC.toFixed(1) + '°C';
      presi = locations["imperial"].pressure;
      final = '';
      maxfinal = descFinal;
      minfinal = descFinal;
      if (maxfinal[0].includes('Máxima')) {
        final = descFinal[0].lastIndexOf('Máx');
      }
      if (minfinal[0].includes('Mínima')) {
        final = descFinal[0].lastIndexOf('Mín');
      }
      description.textContent = descFinal[0].slice(0,final - 2);
      descFinal = description.textContent;

      try {
        descFinalx = [];
      }
      finally {
        for (let c = 1; c < data3['narrative'].length; c++) {
          narr = data3['narrative'];
          maxfinal = narr[c];
          minfinal = narr[c];
          if (maxfinal.includes('Máxima')) {
            final = narr[c].lastIndexOf('Máx');
          }
          if (minfinal.includes('Mínima')) {
            final = narr[c].lastIndexOf('Mín');
          }
          final1 = narr[c].slice(0, final -2);
          descFinalx.push(final1);
        }
      }

      try {
        fechas = [];
      }
      finally {
        for (let c = 1; c < data3['validTimeLocal'].length; c++) {
          fechas.push(data3['validTimeLocal'][c]);
        }
      }
      if (Horas >= 6 && Horas < 21) {
        isday = 'si';
      } else {
        isday = 'no';
      }
      humid.textContent = 'Humedad: ' + locations.humidity + ' %';
      pressure.textContent = 'Presión: ' + (presi * 33.8637526).toFixed(2) + ' mb';
      precip.textContent = 'Precipitación: ' + locations["imperial"].precipTotal + ' mm';
      wind.textContent = 'Viento: ' + locations["imperial"].windSpeed + ' kmph';

      let narr1 = '';
      for (let f = 1; f < current3.length; f++) {
        let tempfinal = current3[f];
        narr1 = narr[f].split('.')[1].replace(' C', '°C').trimStart();
        alltemp[f-1].textContent = tempfinal + '°C';
        alltemp[f -1].title = narr1.replace(' C', '°C');
      }
      IconosLocal();
      IconosLocalExt();
    }
  }
}

//creamos la funcion para obtener los datos del clima posicion actual
async function obtener2(lat, long) {
  origen = url + lat + ',' + long;
  const url1 = 'https://api.worldweatheronline.com/premium/v1/weather.ashx?key=' + apikey2 + '&q=' + lat + ',' + long + '&format=json&num_of_days=6&mca=no&fx=yes&includelocation=no&showlocaltime=yes&lang=es';
  try {
    data2 = await obtenerDatosApi(url1);
    locations2 = await data2["data"];
    current2 = await locations2["current_condition"][0];
    current3 = await locations2["weather"];
  }
  finally {
    weather.style.display = 'block';
    ciudad.textContent = locations2["request"][0].query;
    temp.textContent = current2.temp_C + '°C';
    temp.title = 'Sensación Térmica: ' + current2.FeelsLikeC + '°C';
    description.textContent = current2["weatherDesc"][0].value;
    descFinal = description.textContent.trim();
    humid.textContent = 'Humedad: ' + current2.humidity + ' %';
    pressure.textContent = 'Presión: ' + current2.pressure + ' mb';
    precip.textContent = 'Precipitación: ' + current2.precipMM + ' mm';
    wind.textContent = 'Viento: ' + current2.windspeedKmph + ' kmph';
    winddir.textContent = 'Direcc Viento: ' + current2.winddir16Point;

    try {
      descFinalx = [];
    }
    finally {
      for (let c = 1; c < current3.length; c++) {
        descFinalx.push(current3[c].hourly[4]["weatherDesc"][0].value.trim());
      }
    }

    for (let f = 1; f < current3.length; f++) {
      alltemp[f-1].textContent = current3[f].maxtempC + '°C';
      alltemp[f-1].title = 'Se esperan temperaturas máximas de ' + current3[f].maxtempC + '°C y minimas de ' + current3[f].mintempC + '°C';
    }

    IconosWeb();
    IconosWebExt();

    salesol = current3[0]["astronomy"][0].sunrise;
    if (salesol.includes('AM')) {
      salesol = salesol.replace('AM', '').replace('0', '');
    } else if (salesol.includes('PM')) {
      salesol = salesol.replace('PM', '').replace('0', '');
    }

    const minutosHora1 = convertirAMinutos(HourTime);
    const minutosHora2 = convertirAMinutos(salesol);

    if (minutosHora1 >= minutosHora2) {
      isday = 'si';
    } else if (minutosHora1 < minutosHora2) {
      isday = 'no';
    }
  }
}

// Obtener datos de API
async function obtenerDatosApi(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error al obtener datos de ${url}`);
  return response.json();
}

function IconosWebExt() {
  descFinalx.forEach((item, index) => {
    for (x = 0; x < allicon.length; x++) {
      if (item == 'Clear' || item == 'Sunny') {
        toto = sol;
      } else if (item == 'Cloudy' || item == 'Overcast') {
        toto = nublado;
      } else if (item == 'Partly Cloudy' || item == 'Partly cloudy') {
        toto = nubladoparcial;
      } else if (item == 'Patchy rain nearby') {
        toto = lluviadispersa;
      } else if (item == 'Light drizzle') {
        toto = llovizna;
      } else if (item == 'Patchy light drizzle' || item == 'Light rain') {
        toto = lluviadispersa;
      } else if (item == 'Light rain shower') {
        toto = lluvialigera;
      } else if (item == 'Moderate rain') {
        toto = lluvialigera;
      } else if (item == 'Moderate snow') {
        toto = nievemoderada;
      } else if (item == 'Light snow') {
        toto = nieveliviana;
      } else if (item == 'Moderate or heavy snow showers') {
        toto = nievemoderada;
      } else if (item == 'Heavy snow') {
        toto = nieveheavy;
      } else if (item == 'Freezing fog') {
        toto = neblinoso;
      } else if (item == 'Mist') {
        toto = neblina;
      }
    }
    allicon[index].src = toto;
  })
}

function IconosLocalExt() {
  descFinalx.forEach((item, index) => {
    for (x = 0; x < allicon.length; x++) {
      if (item == 'Cielo mayormente despejado') {
        toto = sol;
      } else if (item == 'Formación de tormentas eléctricas por la tarde' || item == 'Formación de tormentas por la tarde') {
        toto = formaciontormenta;
      } else if (item == 'Cielo parcialmente cubierto') {
        toto = nubladoparcial;
      } else if (item == 'Tormentas eléctricas' || item == 'Tormentas') {
        toto = tormenta;
      } else if (item == 'Nubes matinales que se disiparán por la tarde' || item == 'Nuboso') {
        toto = nublado;
      } else if (item == 'Chubascos matinales') {
        toto = lluvialigera;
      } else if (item == 'Cielo prácticamente cubierto') {
        toto = nublado;
      }
    }
    allicon[index].src = toto;
  })
}

function IconosWeb() {
  if (descFinal == 'Clear') {
    if (isday == 'si') {
      icon.src = sol;
      //icon.style.backgroundImage = 'url(' + despejado + ')';
      //icon.style.backgroundPosition = -74 + 'px';
      //icon.style.backgroundSize = 'cover';
      //icon.style.backgroundRepeat = 'no-repeat';
    } else {
      icon.src = nochedespejada;
      //try {
        //icon.src = '';
        //document.getElementById('icon').style.clear;
      //}
      //finally {
        //icon.style.backgroundImage = 'url(' + tormentas + ')';
      //}
      //document.getElementById('icon').style.backgroundImage = 'url(' + tormentas + ')';
      //icon.src = tormentas;
      //icon.style.backgroundPosition = -74 + 'px';
      //icon.style.backgroundSize = 'cover';
      //icon.style.backgroundRepeat = 'no-repeat';
    }
    description.textContent = 'Despejado';
  } else if (descFinal == 'Sunny') {
    icon.src = sol;
    description.textContent = 'Soleado';
  } else if (descFinal == 'Partly Cloudy' || descFinal == 'Partly cloudy') {
    if (isday == 'si') {
      icon.src = nubladoparcial;
    } else {
      icon.src = nochenubladoparcial;
    }
    description.textContent = 'Parcialmente nublado';
  } else if (descFinal == 'Patchy rain nearby') {
    if (isday == 'si') {
      icon.src = lluviadispersa;
    } else {
      icon.src = nochelluviadispersa;
    }
    description.textContent = 'Lluvia dispersa cerca';
  } else if (descFinal == 'Patchy light drizzle') {
    if (isday == 'si') {
      icon.src = lluviadispersa;
    } else {
      icon.src = nochelluviadispersa;
    }
    description.textContent = 'Llovizna ligera dispersa';
  } else if (descFinal == 'Light drizzle') {
    if (isday == 'si') {
      icon.src = llovizna;
    } else {
      icon.src = nochellovizna;
    }
    description.textContent = 'Llovizna';
  } else if (descFinal == 'Light rain') {
    if (isday == 'si') {
      icon.src = lluviadispersa;
    } else {
      icon.src = nochelluviadispersa;
    }
    description.textContent = 'Llovizna ligera';
  } else if (descFinal == 'Light rain shower' || descFinal == 'Moderate rain') {
    if (isday == 'si') {
      icon.src = lluvialigera;
    } else {
      icon.src = nochelluvialigera;
    }
    description.textContent = 'Lluvia ligera';
  } else if (descFinal == 'Moderate snow') {
    if (isday == 'si') {
      icon.src = nievemoderada;
    } else {
      icon.src = nochenievemoderada;
    }
    description.textContent = 'Nieve moderada';
  } else if (descFinal == 'Light snow' || descFinal == 'Patchy light snow') {
    if (isday == 'si') {
      icon.src = nieveliviana;
    } else {
      icon.src = nochenieveliviana;
    }
    description.textContent = 'Nieve ligera';
  } else if (descFinal == 'Moderate or heavy snow showers') {
    if (isday == 'si') {
      icon.src = nievemoderada;
    } else {
      icon.src = nochenievemoderada;
    }
    description.textContent = 'Chubascos de nieve moderados o fuertes';
  } else if (descFinal == 'Heavy snow') {
    if (isday == 'si') {
      icon.src = nieveheavy;
    } else {
      icon.src = nochenieveheavy;
    }
    description.textContent = 'Mucha nieve';
  } else if (descFinal == 'Overcast' || descFinal == 'Cloudy') {
    if (isday == 'si') {
      icon.src = nublado;
    } else {
      icon.src = nochenublada;
    }
    description.textContent = 'Nublado';
  } else if (descFinal == 'Freezing fog') {
    if (isday == 'si') {
      icon.src = neblinoso;
    } else {
      icon.src = nocheneblinoso;
    }
    description.textContent = 'Niebla helada';
  } else if (descFinal == 'Mist') {
    if (isday == 'si') {
      icon.src = neblina;
    } else {
      icon.src = nocheneblina;
    }
    description.textContent = 'Neblina';
  } else if (descFinal == 'Light freezing rain') {
    if (isday == 'si') {
      icon.src = lluviahelada;
    } else {
      icon.src = nochelluviahelada;
    }
    description.textContent = 'Lluvia ligera y helada';
  }
  icon.alt = description.textContent;
}

function IconosLocal() {
  if (descFinal == 'Cielo mayormente despejado') {
    if (isday == 'si') {
      icon.src = sol;
    } else {
      icon.src = nochedespejada;
    }
    description.textContent = 'Despejado';
  } else if (descFinal == 'Cielo parcialmente cubierto') {
    if (isday == 'si') {
      icon.src = nubladoparcial;
    } else {
      icon.src = nochenublada;
    }
    description.textContent = 'Parcialmente nublado';
  } else if (descFinal == 'Cielo prácticamente cubierto') {
    if (isday == 'si') {
      icon.src = nublado;
    } else {
      icon.src = nochenublada;
    }
    description.textContent = 'Cielo prácticamente cubierto';
  } else if (descFinal == 'Nuboso') {
    if (isday == 'si') {
      icon.src = nublado;
    } else {
      icon.src = nochenublada;
    }
    description.textContent = 'Nuboso';
  } else if (descFinal == 'Formación de tormentas eléctricas por la tarde') {
    icon.src = formaciontormenta;
  } else if (descFinal == 'Tormentas eléctricas') {
    if (isday == 'si') {
      icon.src = tormenta;
    } else {
      icon.src = nochetormenta;
    }
  } else if (descFinal == 'Nubes matinales que se disiparán por la tarde') {
    if (isday == 'si') {
      icon.src = nublado;
    } else {
      icon.src = nochenublada;
    }
    description.textContent = 'Nubes matinales que se disiparán por la tarde';
  } else if (descFinal == 'Chubascos matinales') {
    if (isday == 'si') {
      icon.src = lluvialigera;
    } else {
      icon.src = nochelluvialigera;
    }
  }
  icon.alt = description.textContent;
}

function convertirAMinutos(hora, elsol) {
  const [horas, minutos] = hora.split(':').map(Number);
  if (elsol == 'salesol') {
    return horas * 60 + minutos;
  } else if (elsol == 'puestasol') {
    return horas + 12;
  }
}

for (let i = 0; i < allicon.length; i++) {
  if (plataforma.includes('Win')) {
    allicon[i].addEventListener("mouseover", function() {
      if (apiweb.checked) {
        TitulosIcon();
      } else if (apilocal.checked){
        TitulosIconLocal();
      }
    });
  } else if (plataforma.includes('Android')) {
    allicon[i].addEventListener("click", function() {
      if (apiweb.checked) {
        TitulosIcon();
      } else if (apilocal.checked){
        TitulosIconLocal();
      }
    });
  }
};

function TitulosIcon() {
  descFinalx.forEach((item, index) => {
    for (x = 0; x < allicon.length; x++) {
      if (item == 'Clear') {
        toto = 'Despejado';
      } else if (item == 'Sunny') {
        toto = 'Soleado';
      } else if (item == 'Cloudy' || item == 'Overcast') {
        toto = 'Nublado';
      } else if (item == 'Partly Cloudy' || item == 'Partly cloudy') {
        toto = 'Parcialmente nublado';
      } else if (item == 'Patchy rain nearby') {
        toto = 'Lluvia moderada a intervalos';
      } else if (item == 'Patchy light drizzle' || item == 'Light rain') {
        toto = 'Llovizna ligera dispersa';
      } else if (item == 'Light drizzle') {
        toto = 'Llovizna';
      } else if (item == 'Moderate snow') {
        toto = 'Nieve moderada';
      } else if (item == 'Light snow') {
        toto = 'Nieve ligera';
      } else if (item == 'Moderate or heavy snow showers') {
        toto = 'Chubascos de nieve moderados o fuertes';
      } else if (item == 'Heavy snow') {
        toto = 'Mucha nieve';
      } else if (item == 'Freezing fog') {
        toto = 'Niebla helada';
      } else if (item == 'Mist') {
        toto = 'Neblina';
      } else if (item == 'Moderate rain') {
        toto = 'Lluvia moderada';
      } else if (item == 'Light rain shower') {
        toto = 'Ligeras precipitaciones';
      }
    }
    allicon[index].title = toto;
    allicon[index].alt = toto;
  })
}

function TitulosIconLocal() {
  descFinalx.forEach((item, index) => {
    allicon[index].title = item;
    allicon[index].alt = item;
  })
}

for (let i = 0; i < allday.length; i++) {
  allday[i].addEventListener("mouseover", function() {
    if (apiweb.checked) {
      TitulosFechas();
    } else if (apilocal.checked) {
      TitulosFechas2();
    }
  });
};

let dia = '';
let fff = '';

function TitulosFechas() {
  try {
    fechas = [];
  }
  finally {
    for (let c = 1; c < current3.length; c++) {
      fechas.push(current3[c].date);
    }
  }

  fechas.forEach((item, index) => {
    for (x = 0; x < allday.length; x++) {
      dia = allday[index].textContent;
    }
    for (let c = 0; c < days.length; c++) {
      fff = days[c];
      if (fff.includes(dia)) {
        allday[index].title = days[c] + ' ' + item;
      }
    }
  })
}

function TitulosFechas2() {
  try {
    fechas = [];
  }
  finally {
    for (let c = 1; c < data3['validTimeLocal'].length; c++) {
      let fechainicial = data3['validTimeLocal'][c];
      let final = fechainicial.indexOf('T');
      let fechafinal = fechainicial.slice(0, final);
      fechas.push(fechafinal);
    }
  }

  fechas.forEach((item, index) => {
    for (x = 0; x < allday.length; x++) {
      dia = allday[index].textContent;
    }
    for (let c = 0; c < days.length; c++) {
      fff = days[c];
      if (fff.includes(dia)) {
        allday[index].title = days[c] + ' ' + item;
      }
    }
  })
}