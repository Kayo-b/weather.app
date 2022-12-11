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
        let elemName = document.getElementById("name")
        let elemTemp = document.getElementById("temp")
        let elemTempFeel = document.getElementById("tempFeel")
        let elemMin = document.getElementById("minTemp")
        let elemMax = document.getElementById("maxTemp")
        elemName.innerText = object.name
        elemTemp.innerText = object.temp
        elemTempFeel.innerText = object.feels_like
        elemMin.innerText = object.temp_min
        elemMax.innerText = object.temp_max
    }
}

const weater = new Weather();
weater.classFunctions();

