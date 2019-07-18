
function search() {
    document.getElementById("location-submit").addEventListener("click", function(e) {
         e.preventDefault()
         let input = document.getElementById("location").value
         getJSON(input)
    })
}

async function getJSON(arg) {
    const BASE_URL = 'https://weather-app-rails.herokuapp.com'
     let res = await fetch(BASE_URL + `/location/${arg}`)
     let json = await res.json();
      fetchLocation(json)
    }   

function fetchLocation(arg) {
    let location = arg.results[0].geometry.location;
    let lat = location.lat
    let long = location.lng
    returnWeather(lat, long)
}

async function returnWeather(lat, long) {
   baseUrl = 'https://weather-app-rails.herokuapp.com'
   let res = await fetch(baseUrl + `/weather?loc=${lat}_${long}`)
   let json = await res.json()
   let temp = json.currently.apparentTemperature
   let summary = json.daily.summary
   setWeather(temp, summary)
}

function setWeather(arg1, arg2) {
    target = document.getElementById('weather-display')
    h2 = document.createElement('h2')
    h2.className = "temp"
    h2.innerText = "Current temperature: " + arg1
    p = document.createElement('p')
    p.className = "weather-summary"
    p.innerText = "Outlook: " + arg2
    target.appendChild(h2)
    target.appendChild(p)
}

search()