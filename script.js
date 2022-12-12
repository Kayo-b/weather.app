class Weather {

    classFunctions() {
        this.eventListener();
    }

    async fetchApi(input) {
        try {
            const fetchApi = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+`${input}`+"&units=metric&APPID=3cd7fa05866ecd11acba2a99357be13c",
            {mod: 'cors'});
            const returnJson = await fetchApi.json();
            if(fetchApi.status != 200) {
                throw ("Error " + returnJson.message);
            }
            this.selectDataFromJson(returnJson)
        } catch (error) {
            console.log(error);
        }
    }

    eventListener() {
        let inputButton = document.getElementById("searchButton");
        inputButton.addEventListener("click", () => {
            let input = document.getElementById("search").value;
            this.fetchApi(input);
        });
    }

    //create obj with results
    selectDataFromJson(json) {
        let newObject = Object.assign(json.main, json.weather[0]);
        newObject.name = json.name;
        this.displayData(newObject);
    }

    //display content
    displayData(object) {
        let elemName = document.getElementById("name");
        let elemTemp = document.getElementById("temp");
        let elemTempFeel = document.getElementById("tempFeel");
        let elemMin = document.getElementById("minTemp");
        let elemMax = document.getElementById("maxTemp");
        let elemHumid = document.getElementById("humid");
        let contentResult = document.getElementById("content-result");
        let weatherResult = document.getElementById("weatherTitle");
        let weatherIcon = document.getElementById("weather")
        contentResult.style.display = "flex"
        weatherResult.innerText = object.description
        weatherIcon.src = `http://openweathermap.org/img/wn/${object.icon}@2x.png`
        console.log(weatherIcon)
        elemName.innerText = object.name;
        elemTemp.innerText = object.temp + `°C`;
        elemTempFeel.innerText = object.feels_like + `°C`;
        elemMin.innerText = object.temp_min + `°C`;
        elemMax.innerText = object.temp_max + `°C`;
        elemHumid.innerText = object.humidity + `RH`;
    }
}

const weater = new Weather();
weater.classFunctions();

