document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault()

    let input = document.querySelector('#searchInput').value
    
    if(input !== '') {
        clearInfo()
        showWarning('Carregando...')

        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&units=metric&lang=pt_br&appid=d06cdb298fafc83c520d5ab677fc477e`)
        let json = await results.json()

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {
            clearInfo()
            showWarning('Não encontramos esta localização.')
        }
    } else {
        clearInfo()
    }
})

function showInfo(objeto) {
    showWarning('')

    document.querySelector('.titulo').innerHTML = `${objeto.name}, ${objeto.country}`
    document.querySelector('.tempInfo').innerHTML = `${objeto.temp} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${objeto.windSpeed} <span>km/h</span>`
    document.querySelector('.temp img').src = `http://openweathermap.org/img/wn/${objeto.tempIcon}@2x.png`
    document.querySelector('.ventoPonto').style.transform = `rotate(${objeto.windAngle-90}deg)`
    document.querySelector('.resultado').style.display = 'block'
}

function clearInfo() {
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg
}