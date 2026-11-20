

const form = document.querySelector("#search_inputForm");
const input_search = document.querySelector("#search_city");



form.addEventListener("submit", function(event){
    event.preventDefault();
    city_value = input_search.value.trim();
    console.log(city_value);

    if(city_value === ""){
        alert("enter city name");
        return;
    }

    getData(city_value);
});

async function getData(city) {

    try {
        const myURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const response = await fetch(myURL);

        if(!response.ok){
            console.log("Failed to find city");
        }

        const data = await response.json();
        let longitude = data.results[0].longitude;
        let latitude = data.results[0].latitude;

        const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&timezone=auto`;

        const response2 = await fetch(weatherURL);

        if(!response2.ok){
            console.log('no data found');
        }

        const weatherData = await response2.json();
        console.log(weatherData);
        console.log(weatherData.current);
        console.log(weatherData.current.temperature_2m);

        let temp = document.getElementsByClassName("headerTemp");
        let humid = document.getElementsByClassName("humid");
        let windSp = document.getElementsByClassName("wind");
        let locName = document.getElementsByClassName("location_name");

        for(let i=0;i<humid.length;i++){
            humid[i].textContent = weatherData.current.relative_humidity_2m;
        }

        for(let j=0;j<windSp.length;j++){
            windSp[j].textContent = weatherData.current.relative_humidity_2m;
        }

        for(let a=0;a<locName.length;a++){
            locName[a].textContent = `${city_value}`;
        }

        for(let k=0;k<temp.length;k++){
            temp[k].textContent = weatherData.current.temperature_2m;
        }

    }

    catch(error){
        console.log(error.message);
        console.log(error.stack);
    }



    
}
