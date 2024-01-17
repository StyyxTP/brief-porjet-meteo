let meteo = document.getElementById('meteo')
let deg = document.getElementById('degre');
let ville = document.getElementById('nomville');
let humidite = document.getElementById('humidite');
let vent = document.getElementById('vent');


const listeSoleil = [113];
const listeNuage = [116, 119, 122];
const listePluie = [176, 293, 296, 299, 302, 305, 308, 311, 353, 356, 359, 362, 365];
const listeBrouillard = [143, 248, 260, 263, 266, 281];
const listeNeige = [179, 182, 185, 227, 230, 284, 314, 317, 320, 323, 326, 329, 332, 335, 338, 350, 368, 371, 374, 377];
const listeTonnerre = [200, 386, 389, 392, 395];

var access_key;
var city;
var url = document.URL;
console.log(url)
fetch('assets/json/conf.json')
    .then(response=>response.json())
    .then(info=>{
        city = info.nomVille;
        access_key = info.keyApi;
    
    fetch(`http://api.weatherstack.com/current?access_key=${access_key}&query=${city}`)
        .then(res => res.json())
        .then(data => {
            deg.innerHTML =  data.current.temperature + " °C";
            ville.innerHTML =  data.location.name;
            humidite.innerHTML =  "Humidité : " + data.current.humidity  + " %";
            vent.innerHTML = "Vent : " + data.current.wind_speed + " km/h";
            
            function parcourirListe(liste){
                for(var i = liste.length - 1; i>=0; i--){
                    if (liste[i] === data.current.weather_code){
                        return true
                    }    
                }
            };
            
            if (parcourirListe(listeSoleil)===true){
                meteo.src="assets/images/soleil.png"
            } else if(parcourirListe(listeTonnerre)===true){
                meteo.src="assets/images/tonnerre.png"
            } else if(parcourirListe(listePluie)===true){
                meteo.src="assets/images/pluie.png";
            } else if(parcourirListe(listeNuage)===true){
                meteo.src="assets/images/nuage.png";
            } else if(parcourirListe(listeNeige)===true){
                meteo.src="assets/images/neige.png";
            } else if (parcourirListe(listeBrouillard)===true){
                meteo.src="assets/images/brouillard.png";
            }
    });
});
