
const form = document.getElementById("formCity");
const search = document.getElementById("searchBar");

form.addEventListener("submit",function(event){
    event.preventDefault();
    const input = search.value.trim();

    if(input === ""){
        alert("input city");
    }

    getData(input);
});

async function getData(city) {
    try{
        const cityURL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
        const response = await fetch(cityURL);

        const data = await response.json();
        console.log(data.results);

        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;
        console.log(latitude,longitude);

        const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=5&timezone=auto`;
        const fetchWeather = await fetch(weatherURL);
        const weatherData = await fetchWeather.json();
        console.log(weatherData.daily);

        let maxTemp = weatherData.daily.temperature_2m_max;
        let minTemp = weatherData.daily.temperature_2m_min;
        
        
        
        
        let putMaxValue = document.getElementsByClassName("max");
        let putMinValue = document.getElementsByClassName("min");
        let city_name = document.getElementById("loc_name");

        city_name.textContent = data.results[0].name;

        for(let i=0;i<putMaxValue.length;i++){
            putMaxValue[i].textContent = maxTemp[i];
        }

        for(let j=0;j<putMinValue.length;j++){
            putMinValue[j].textContent = minTemp[j]
        }

        let dateInfo = weatherData.daily.time;
        let head = document.getElementsByClassName("displayDate");
        dateInfo.forEach(function(items, index){
            let dates = new Date(items);
            let dateNo = dates.getDate();
            let week = dates.toLocaleDateString("en-US", {weekday : "short"});
            let monthly = dates.toLocaleDateString("en-US", {month : "short"});
            head[index].textContent = `${week}, ${monthly} ${dateNo}`;
        
        });

    }

    catch(error){
        console.log(error.message);
        console.log(error.stack);
    }

        
}
