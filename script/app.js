import {html} from './domElements.js';

function createCard(country){
    return `
    <div class="col mb-4">
        <div class="card">
            <img src="${country.flags.png}" class="card-img-top" alt="${country.name.official} Image">
            <div class="card-body">
            <h5 class="card-title">${country.name.official}</h5>
            <p class="card-text">${country.name.official} is country with population of ${country.population} with the Area of ${country.area} square killometers.</p>
            </div>
            <div class="card-footer">
            <small class="text-muted">Open on <a href="https://en.wikipedia.org/wiki/${createWikiLink(country.name.official)}" target="_blank">Wikipedia</a></small>
            </div>
            <div class="card-footer">
            <small class="text-muted">Open on <a href="${country.maps.googleMaps}" target="_blank">Google Maps</a></small>
            </div>
        </div>
    </div>`
}

function createWikiLink(name){
    return name.split(" ").join("_");
}

function spinerLoader(state){
    if(state){
        html.spiner.style.display = "block";
    } else {
        html.spiner.style.display = "none";
    }
}

html.searchBtn.addEventListener("click", function(){
    spinerLoader(true);
    fetch(`https://restcountries.com/v3.1/name/${html.searchInput.value}`)
    .then(data => data.json())
    .then(function(result){
        spinerLoader(false);
        html.cardContainer.innerHTML = "";
        html.notification.innerHTML = "";
            try {
                for(let country of result){
                    html.cardContainer.innerHTML += createCard(country);
                }
                
            } catch (error) {
                html.notification.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    You have entered wrong country name, try again! 
                </div>`
            }
    })
})

html.resetBtn.addEventListener("click", function(){
    html.cardContainer.innerHTML = "";
    html.searchInput.innerHTML = "";
    html.searchInput.value = "";
    html.notification.innerHTML = "";
    spinerLoader(false);
})


html.searchInput.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        spinerLoader(true);
        fetch(`https://restcountries.com/v3.1/name/${html.searchInput.value}`)
        .then(data => data.json())
        .then(function(result){
        spinerLoader(false)
        html.cardContainer.innerHTML = "";
        html.notification.innerHTML = "";
            try {
                for(let country of result){
                    html.cardContainer.innerHTML += createCard(country);
                }
            } catch (error) {
                html.notification.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    You have entered wrong country name, try again! 
                </div>`
            }
    })}
})

html.btnCurrency.addEventListener("click", function(){
    html.cardContainer.innerHTML = "";
    html.notification.innerHTML = "";

    fetch("https://restcountries.com/v3.1/currency/EUR")
    .then(data => data.json())
    .then(function(result){
        result.forEach(element => {
            html.cardContainer.innerHTML += createCard(element);
        });
    })

});

html.btnEnglish.addEventListener("click", function(){
    html.cardContainer.innerHTML = "";
    html.notification.innerHTML = "";
    
    fetch("https://restcountries.com/v3.1/lang/English")
    .then(data => data.json())
    .then(function(result){
        result.forEach(element => {
            html.cardContainer.innerHTML += createCard(element);
        });
    })

});


html.btnMacedonia.addEventListener("click", function(){
    html.cardContainer.innerHTML = "";
    html.notification.innerHTML = "";

    fetch("https://restcountries.com/v3.1/lang/mkd")
    .then(data => data.json())
    .then(function(result){
        result.forEach(element => {
            html.cardContainer.innerHTML += createCard(element);
        });
    })
});


